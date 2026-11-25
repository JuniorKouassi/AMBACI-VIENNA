// AMBACI VIENNA — consular document pre-submission ("dossiers").
//
// A citizen opens a dossier, uploads the documents required for a service, and the
// consular service checks them (in the administration platform) before the appointment.
// Booking is only possible once the dossier is validated.
//
// Routes (all under /api/dossiers, CORS-open because they are protected by a personal
// token sent in the X-Dossier-Token header, never by cookies):
//   GET    /config            public: services + document lists + limits
//   POST   /                  create a dossier        -> { reference, token }
//   GET    /me                the dossier behind the token
//   POST   /files             upload one file (multipart: doc_key, file)
//   DELETE /files/:id         remove one file
//   POST   /submit            send the dossier for review
//   POST   /recover           e-mail a fresh personal link (reference + e-mail)
//
// Everything is switched off unless the DOSSIERS_ENABLED variable is "true".

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_FILES_PER_DOC = 8;
const MAX_FILES_PER_DOSSIER = 40;
const MAX_BYTES_PER_DOSSIER = 80 * 1024 * 1024;

// Retention (days). Files and personal data are erased after these delays.
const DRAFT_RETENTION_DAYS = 60;        // a dossier that is never completed
const VALIDATED_RETENTION_DAYS = 60;    // validated, appointment not booked yet
const AFTER_APPOINTMENT_DAYS = 30;      // after the appointment

const LANGS = ['fr', 'de', 'en'];

const t = (fr, de, en) => ({ fr, de, en });
const doc = (key, required, label, hint) => ({ key, required, label, hint: hint || null });

const DOC = {
  birth: (hint) => doc('birth', true, t('Acte de naissance', 'Geburtsurkunde', 'Birth certificate'), hint || t('Moins de 3 mois', 'Nicht älter als 3 Monate', 'Less than 3 months old')),
  residence: () => doc('residence', true, t('Justificatif de résidence', 'Meldebestätigung / Wohnsitznachweis', 'Proof of residence'), t('Moins de 3 mois', 'Nicht älter als 3 Monate', 'Less than 3 months old')),
  photo: () => doc('photo', true, t('Photo d’identité', 'Passfoto', 'ID photo'), t('Couleur, fond blanc, visage dégagé', 'Farbe, weißer Hintergrund, Gesicht frei', 'Colour, white background, face uncovered')),
  payment: () => doc('payment', false, t('Preuve de paiement des frais consulaires', 'Zahlungsnachweis der Konsulargebühren', 'Proof of payment of the consular fees'), t('Si vous avez déjà payé en ligne', 'Falls bereits online bezahlt', 'If you have already paid online')),
  paymentRequired: () => doc('payment', true, t('Preuve de paiement des frais consulaires', 'Zahlungsnachweis der Konsulargebühren', 'Proof of payment of the consular fees')),
  form: (label) => doc('form', true, label, t('À télécharger dans la page Téléchargements', 'Auf der Seite „Downloads“ herunterladen', 'Download it from the Downloads page')),
};

// Same documents for: authentification de permis, légalisation de documents pour entreprises, certifier conforme.
const DOCS_PERMIS_LIST = () => [
    doc('consular_card', true, t('Carte consulaire', 'Konsularkarte', 'Consular card')),
    doc('licence_copy', true, t('Copie du permis de conduire (nouvelle formule)', 'Kopie des Führerscheins (neues Format)', 'Copy of the driving licence (new format)')),
    DOC.form(t('Formulaire de demande d’actes consulaires', 'Antragsformular für konsularische Urkunden', 'Consular acts request form')),
    doc('id_nationality', true, t('CNI, certificat de nationalité ou passeport en cours de validité', 'Personalausweis, Staatsangehörigkeitsbescheinigung oder gültiger Reisepass', 'National ID, nationality certificate or valid passport'), t('Certificat de nationalité de moins de 2 ans, authentifié par le Ministère de la Justice', 'Staatsangehörigkeitsbescheinigung nicht älter als 2 Jahre, beglaubigt durch das Justizministerium', 'Nationality certificate less than 2 years old, authenticated by the Ministry of Justice')),
    doc('residence_permit', true, t('Titre de séjour en cours de validité', 'Gültiger Aufenthaltstitel', 'Valid residence permit'), t('Ou preuve des démarches en cours pour l’obtenir', 'Oder Nachweis des laufenden Antrags', 'Or proof that the application is under way')),
    doc('address_proof', true, t('Justificatif de domicile', 'Wohnsitznachweis', 'Proof of address'), t('Facture ou quittance de loyer', 'Rechnung oder Mietquittung', 'Bill or rent receipt')),
    doc('hosting', false, t('Attestation d’hébergement légalisée et pièce d’identité de l’hébergeant(e)', 'Beglaubigte Unterkunftsbestätigung und Ausweis des Gastgebers', 'Legalised accommodation certificate and ID of the host'), t('Si vous habitez chez un tiers', 'Falls Sie bei Dritten wohnen', 'If you live with someone else')),
    doc('payment', true, t('Reçu de paiement des droits de chancellerie', 'Zahlungsbeleg der Kanzleigebühren', 'Receipt for the chancellery fees')),
];

export const SERVICES = {
  passeport_premiere: {
    booking: 'passeport',
    label: t('Passeport — première demande', 'Reisepass – Erstantrag', 'Passport — first application'),
    docs: [
      DOC.birth(),
      doc('nationality', true, t('Certificat de nationalité ivoirienne', 'Ivorische Staatsangehörigkeitsbescheinigung', 'Ivorian nationality certificate')),
      doc('id_or_record', true, t('CNI valide ou extrait de casier judiciaire', 'Gültiger Personalausweis oder Strafregisterauszug', 'Valid national ID or criminal record extract')),
      DOC.photo(),
      DOC.residence(),
      DOC.payment(),
    ],
  },
  passeport_renouvellement: {
    booking: 'passeport',
    label: t('Passeport — renouvellement', 'Reisepass – Verlängerung', 'Passport — renewal'),
    docs: [
      doc('old_passport', true, t('Ancien passeport', 'Bisheriger Reisepass', 'Previous passport'), t('Même expiré : page photo et pages utilisées', 'Auch abgelaufen: Foto-Seite und benutzte Seiten', 'Even if expired: photo page and used pages')),
      DOC.birth(),
      doc('cni', true, t('CNI valide', 'Gültiger Personalausweis', 'Valid national ID')),
      DOC.photo(),
      DOC.residence(),
      DOC.payment(),
    ],
  },
  passeport_urgence: {
    booking: 'passeport',
    label: t('Passeport — urgence (perte ou vol)', 'Reisepass – Notfall (Verlust oder Diebstahl)', 'Passport — emergency (loss or theft)'),
    docs: [
      doc('police_report', true, t('Déclaration de perte ou de vol', 'Verlust- oder Diebstahlsanzeige', 'Loss or theft report'), t('Délivrée par la police', 'Von der Polizei ausgestellt', 'Issued by the police')),
      DOC.birth(t('Original ou copie lisible', 'Original oder gut lesbare Kopie', 'Original or readable copy')),
      doc('urgency', true, t('Justification de l’urgence', 'Nachweis der Dringlichkeit', 'Proof of the emergency'), t('Billet, convocation, document médical…', 'Ticket, Vorladung, ärztliches Dokument …', 'Ticket, summons, medical document…')),
      DOC.photo(),
    ],
  },
  carte_consulaire: {
    booking: 'carte_consulaire',
    label: t('Carte consulaire', 'Konsularkarte', 'Consular card'),
    docs: [
      doc('photo', true, t('Photo passeport', 'Passfoto', 'Passport photo'), t('Couleur, fond blanc', 'Farbe, weißer Hintergrund', 'Colour, white background')),
      doc('passport_copy', true, t('Passeport — 3 premières pages', 'Reisepass – erste 3 Seiten', 'Passport — first 3 pages')),
      doc('id_copy', true, t('Pièce d’identité', 'Ausweisdokument', 'Identity document'), t('CNI ou certificat de nationalité', 'Personalausweis oder Staatsangehörigkeitsbescheinigung', 'National ID or nationality certificate')),
      doc('residence_permit', true, t('Titre de séjour', 'Aufenthaltstitel', 'Residence permit')),
      doc('birth_extract', true, t('Extrait d’acte de naissance', 'Geburtsurkunden-Auszug', 'Birth certificate extract')),
      doc('address_proof', true, t('Preuve d’adresse', 'Adressnachweis', 'Proof of address'), t('Attestation d’hébergement, facture ou pièce d’identité avec adresse', 'Unterkunftsbestätigung, Rechnung oder Ausweis mit Adresse', 'Accommodation certificate, bill or ID showing the address')),
      DOC.payment(),
    ],
  },
  visa: {
    booking: 'visa',
    label: t('Visa d’entrée', 'Einreisevisum', 'Entry visa'),
    docs: [
      doc('passport', true, t('Passeport valide', 'Gültiger Reisepass', 'Valid passport'), t('Valable au moins 6 mois après le séjour', 'Mindestens 6 Monate über den Aufenthalt hinaus gültig', 'Valid at least 6 months beyond the stay')),
      doc('lodging', true, t('Justificatif d’hébergement en Côte d’Ivoire', 'Nachweis der Unterkunft in der Elfenbeinküste', 'Proof of accommodation in Côte d’Ivoire')),
      doc('insurance', true, t('Assurance voyage', 'Reiseversicherung', 'Travel insurance')),
      DOC.photo(),
      DOC.payment(),
    ],
  },

  // ---- Légalisation et certification ----
  legalisation_actes: {
    booking: 'legalisation',
    label: t('Légalisation d’actes ou de signature (particulier)', 'Beglaubigung von Urkunden oder Unterschriften (Privatperson)', 'Legalisation of documents or signature (individual)'),
    docs: [
      DOC.form(t('Formulaire de demande de légalisation', 'Antragsformular für die Beglaubigung', 'Legalisation request form')),
      doc('to_legalise', true, t('Original du document à légaliser', 'Original des zu beglaubigenden Dokuments', 'Original of the document to legalise'), t('Acte portant votre signature, ou certificat de célibat, casier judiciaire, certificat de nationalité, extrait d’acte de naissance, procuration, autorisation parentale, autre acte administratif ivoirien', 'Dokument mit Ihrer Unterschrift oder Ledigkeitsbescheinigung, Führungszeugnis, Staatsangehörigkeitsbescheinigung, Geburtsurkunde, Vollmacht, Elterneinverständnis, andere ivorische Verwaltungsurkunde', 'Document bearing your signature, or certificate of celibacy, criminal record, nationality certificate, birth certificate extract, power of attorney, parental authorisation, other administrative document issued in Côte d’Ivoire')),
      doc('id_principal', true, t('Copie du passeport ou de la pièce d’identité du mandant', 'Kopie des Reisepasses oder Ausweises des Vollmachtgebers', 'Copy of the passport or ID of the principal')),
      doc('id_agent', false, t('Copie du passeport ou de la pièce d’identité du mandataire', 'Kopie des Reisepasses oder Ausweises des Bevollmächtigten', 'Copy of the passport or ID of the agent'), t('Pour une procuration', 'Bei einer Vollmacht', 'For a power of attorney')),
      DOC.paymentRequired(),
    ],
  },
  legalisation_entreprises: {
    booking: 'legalisation',
    label: t('Légalisation de documents pour entreprises', 'Beglaubigung von Dokumenten für Unternehmen', 'Legalisation of documents for companies'),
    docs: DOCS_PERMIS_LIST(),
  },
  certifier_conforme: {
    booking: 'legalisation',
    label: t('Certification conforme', 'Beglaubigte Kopie', 'Certified true copy'),
    docs: DOCS_PERMIS_LIST(),
  },

  // ---- État civil et mariage ----
  certificat_capacite_mariage: {
    booking: 'etat_civil',
    label: t('Certificat de capacité à mariage', 'Ehefähigkeitszeugnis', 'Marriage capacity certificate'),
    docs: [
      DOC.form(t('Formulaire de demande dûment rempli et signé', 'Ausgefülltes und unterschriebenes Antragsformular', 'Request form completed and signed')),
      doc('birth_marriage', true, t('Extrait d’acte de naissance « En vue de mariage »', 'Geburtsurkunden-Auszug „Zur Eheschließung“', 'Birth certificate extract marked “For marriage”'), t('Légalisé par le Ministère de l’Intérieur et le Ministère des Affaires étrangères', 'Beglaubigt durch das Innenministerium und das Außenministerium', 'Legalised by the Ministry of the Interior and the Ministry of Foreign Affairs')),
      doc('celibacy', true, t('Certificat de célibat', 'Ledigkeitsbescheinigung', 'Certificate of celibacy'), t('Légalisé par le Ministère de l’Intérieur et le Ministère des Affaires étrangères', 'Beglaubigt durch das Innenministerium und das Außenministerium', 'Legalised by the Ministry of the Interior and the Ministry of Foreign Affairs')),
      doc('passport_copy', true, t('Copie du passeport en cours de validité', 'Kopie des gültigen Reisepasses', 'Copy of a valid passport')),
      doc('residence_cert', true, t('Attestation de résidence', 'Wohnsitzbescheinigung', 'Certificate of residence')),
      DOC.paymentRequired(),
    ],
  },
  certificat_de_vie: {
    booking: 'etat_civil',
    label: t('Certificat de vie', 'Lebensbescheinigung', 'Certificate of life'),
    docs: [
      doc('id_copy', true, t('Pièce d’identité ou passeport', 'Ausweis oder Reisepass', 'ID or passport')),
      DOC.paymentRequired(),
    ],
  },
  celebration_mariage: {
    booking: 'etat_civil',
    label: t('Célébration de mariage', 'Eheschließung', 'Marriage ceremony'),
    docs: [
      doc('birth_spouses', true, t('Extrait d’acte de naissance de chacun des futurs époux « En vue de mariage »', 'Geburtsurkunden-Auszug jedes künftigen Ehepartners „Zur Eheschließung“', 'Birth certificate extract of each future spouse, marked “For marriage”'), t('Légalisé par le Ministère de l’Intérieur et le Ministère des Affaires étrangères', 'Beglaubigt durch das Innenministerium und das Außenministerium', 'Legalised by the Ministry of the Interior and the Ministry of Foreign Affairs')),
    ],
  },

  // ---- Autres démarches ----
  authentification_permis: {
    booking: 'autre',
    label: t('Authentification de permis de conduire', 'Beglaubigung des Führerscheins', 'Driving licence authentication'),
    docs: DOCS_PERMIS_LIST(),
  },
  renonciation_nationalite: {
    booking: 'autre',
    label: t('Attestation de renonciation à la nationalité ivoirienne', 'Bescheinigung über den Verzicht auf die ivorische Staatsangehörigkeit', 'Renunciation of Ivorian nationality'),
    docs: [
      doc('letter', true, t('Demande manuscrite de renonciation', 'Handschriftlicher Verzichtsantrag', 'Handwritten renunciation request'), t('Adressée au Ministre de la Justice', 'Gerichtet an den Justizminister', 'Addressed to the Minister of Justice')),
      doc('passport', true, t('Passeport ivoirien', 'Ivorischer Reisepass', 'Ivorian passport')),
      doc('civil_acts', true, t('Actes de l’état civil vous concernant', 'Personenstandsurkunden zu Ihrer Person', 'Civil status documents concerning you')),
      doc('nationality_cert', true, t('Certificat de nationalité ivoirienne', 'Ivorische Staatsangehörigkeitsbescheinigung', 'Ivorian nationality certificate')),
      doc('naturalisation', true, t('Photocopie légalisée du certificat de naturalisation', 'Beglaubigte Kopie der Einbürgerungsurkunde', 'Legalised photocopy of the naturalisation certificate')),
    ],
  },
};

// booking service -> dossier services that unlock it. Every kind of appointment needs a validated dossier.
export const BOOKING_NEEDS_DOSSIER = {
  passeport: ['passeport_premiere', 'passeport_renouvellement', 'passeport_urgence'],
  visa: ['visa'],
  carte_consulaire: ['carte_consulaire'],
  legalisation: ['legalisation_actes', 'legalisation_entreprises', 'certifier_conforme'],
  etat_civil: ['certificat_capacite_mariage', 'certificat_de_vie', 'celebration_mariage'],
  autre: ['authentification_permis', 'renonciation_nationalite'],
};

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,POST,DELETE,OPTIONS',
  'access-control-allow-headers': 'content-type,x-dossier-token',
  'access-control-max-age': '86400',
};

function out(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS },
  });
}

export function dossiersEnabled(env) {
  return env.DOSSIERS_ENABLED === 'true' && !!env.DOSSIERS && !!env.DB && !!env.DOSSIER_LINK_SECRET;
}

// ---------- small helpers ----------

const hex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

async function sha256(text) {
  return hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
}

// The personal link token is derived, not random: HMAC-SHA256(secret, "<reference>:<version>").
// Only its SHA-256 is stored (to find the dossier), but the administration platform, which shares
// DOSSIER_LINK_SECRET, can recompute the same link to put in its e-mails. Recovering a link
// increments the version, which invalidates the previous one. Keep this function identical to
// the one in the platform (lib/dossiers.ts).
async function linkToken(env, reference, version) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.DOSSIER_LINK_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${reference}:${version}`)));
  let bin = '';
  for (const x of sig) bin += String.fromCharCode(x);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function newReference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I
  const b = crypto.getRandomValues(new Uint8Array(6));
  const rand = [...b].map((x) => alphabet[x % alphabet.length]).join('');
  return `DOS-${new Date().getFullYear()}-${rand}`;
}

const isoPlusDays = (days, from = new Date()) => new Date(from.getTime() + days * 86400000).toISOString().slice(0, 19).replace('T', ' ');
const nowSql = () => new Date().toISOString().slice(0, 19).replace('T', ' ');
const pickLang = (l) => (LANGS.includes(l) ? l : 'fr');
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

function sniff(bytes) {
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return { mime: 'application/pdf', ext: 'pdf' };
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { mime: 'image/jpeg', ext: 'jpg' };
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { mime: 'image/png', ext: 'png' };
  return null;
}

async function logEvent(env, dossierId, actor, action, detail) {
  await env.DB.prepare('INSERT INTO dossier_events (dossier_id, actor, action, detail) VALUES (?, ?, ?, ?)')
    .bind(dossierId, actor, action, detail || null).run().catch((e) => console.error('event log', e));
}

async function loadByToken(env, token) {
  if (!token || typeof token !== 'string' || token.length < 30 || token.length > 80) return null;
  const row = await env.DB.prepare("SELECT * FROM dossiers WHERE token_hash = ? AND status != 'purged'").bind(await sha256(token)).first();
  return row || null;
}

async function dossierView(env, d) {
  const docs = (await env.DB.prepare('SELECT doc_key, status, comment FROM dossier_docs WHERE dossier_id = ?').bind(d.id).all()).results;
  const files = (await env.DB.prepare('SELECT id, doc_key, mime, size, original_name FROM dossier_files WHERE dossier_id = ? ORDER BY id').bind(d.id).all()).results;
  const svc = SERVICES[d.service];
  return {
    reference: d.reference,
    service: d.service,
    status: d.status,
    lang: d.lang,
    firstName: d.first_name,
    lastName: d.last_name,
    email: d.email,
    bookingReference: d.booking_reference,
    canBook: d.status === 'validated' && !d.booking_reference,
    docs: (svc ? svc.docs : []).map((def) => {
      const row = docs.find((r) => r.doc_key === def.key) || { status: 'missing', comment: null };
      return {
        key: def.key,
        status: row.status,
        comment: row.comment,
        files: files.filter((f) => f.doc_key === def.key).map((f) => ({ id: f.id, name: f.original_name, size: f.size, mime: f.mime })),
      };
    }),
  };
}

// ---------- e-mails ----------

const MAIL = {
  link: {
    subject: t('Votre dossier {ref} — lien personnel', 'Ihre Akte {ref} – persönlicher Link', 'Your file {ref} — personal link'),
    title: t('Votre dossier consulaire', 'Ihre konsularische Akte', 'Your consular file'),
    body: t('Vous pouvez ajouter vos pièces et revenir sur votre dossier à tout moment avec le lien ci-dessous. Ne le partagez avec personne : il donne accès à vos documents.', 'Mit dem folgenden Link können Sie jederzeit Unterlagen hinzufügen und Ihre Akte wieder öffnen. Teilen Sie ihn mit niemandem: Er gibt Zugriff auf Ihre Dokumente.', 'You can add your documents and come back to your file at any time with the link below. Do not share it: it gives access to your documents.'),
    button: t('Ouvrir mon dossier', 'Meine Akte öffnen', 'Open my file'),
  },
  submitted: {
    subject: t('Dossier {ref} reçu', 'Akte {ref} erhalten', 'File {ref} received'),
    title: t('Votre dossier a bien été reçu', 'Ihre Akte ist eingegangen', 'Your file has been received'),
    body: t('Le service consulaire va vérifier vos pièces. Vous recevrez un e-mail dès que la vérification est terminée.', 'Der Konsulardienst prüft Ihre Unterlagen. Sie erhalten eine E-Mail, sobald die Prüfung abgeschlossen ist.', 'The consular service will check your documents. You will receive an e-mail as soon as the check is done.'),
    button: t('Suivre mon dossier', 'Meine Akte verfolgen', 'Follow my file'),
  },
};

function mailHtml(lang, key, link, name) {
  const m = MAIL[key];
  const hello = { fr: 'Bonjour', de: 'Guten Tag', en: 'Hello' }[lang];
  return `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#14201A;">
    <h2 style="color:#0A1F10;">${escapeHtml(m.title[lang])}</h2>
    <p>${hello} ${escapeHtml(name)},</p>
    <p>${escapeHtml(m.body[lang])}</p>
    <p style="margin:22px 0;"><a href="${escapeHtml(link)}" style="background:#F77F00;color:#fff;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px;display:inline-block;">${escapeHtml(m.button[lang])}</a></p>
    <p style="color:#8A8570;font-size:13px;">Ambassade de la République de Côte d'Ivoire en Autriche — Michael-Neumann-Gasse 2, 1190 Wien</p>
  </div>`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function personalLink(env, request, token) {
  const base = (env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '');
  return `${base}/dossier.html#t=${token}`;
}

// The applicant's e-mail only goes out once a verified sending domain is configured
// (EMAIL_FROM), exactly like the booking confirmation.
async function mailCitizen(env, deps, d, key, link) {
  if (!env.EMAIL_FROM) return;
  const lang = pickLang(d.lang);
  await deps.sendEmail(env, {
    to: d.email,
    subject: MAIL[key].subject[lang].replace('{ref}', d.reference),
    html: mailHtml(lang, key, link, d.first_name),
  }).catch((e) => console.error(e));
}

async function notifyStaff(env, deps, d) {
  if (!env.NOTIFY_EMAIL) return;
  const svc = SERVICES[d.service];
  const adminLink = env.ADMIN_URL ? `${env.ADMIN_URL.replace(/\/$/, '')}/admin/consulaire/dossiers` : null;
  await deps.sendEmail(env, {
    to: env.NOTIFY_EMAIL,
    subject: `Dossier à vérifier — ${svc ? svc.label.fr : d.service} — ${d.first_name} ${d.last_name} — ${d.reference}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#0A1F10;">Nouveau dossier à vérifier</h2>
      <table style="width:100%;border-collapse:collapse;margin:16px 0;">
        <tr><td style="padding:6px 0;color:#8A8570;">Démarche</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(svc ? svc.label.fr : d.service)}</td></tr>
        <tr><td style="padding:6px 0;color:#8A8570;">Nom</td><td style="padding:6px 0;font-weight:bold;">${escapeHtml(d.first_name)} ${escapeHtml(d.last_name)}</td></tr>
        <tr><td style="padding:6px 0;color:#8A8570;">Référence</td><td style="padding:6px 0;font-weight:bold;color:#D96C00;">${escapeHtml(d.reference)}</td></tr>
      </table>
      ${adminLink ? `<p><a href="${escapeHtml(adminLink)}">Ouvrir la plateforme d'administration</a></p>` : ''}
    </div>`,
  }).catch((e) => console.error(e));
}

// ---------- API ----------

export async function handleDossierApi(request, env, url, deps) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });

  const path = url.pathname.replace(/^\/api\/dossiers/, '') || '/';

  if (path === '/config' && request.method === 'GET') {
    return out({
      enabled: dossiersEnabled(env),
      limits: { maxFileMB: MAX_FILE_BYTES / 1048576, maxFilesPerDoc: MAX_FILES_PER_DOC, accepted: ['application/pdf', 'image/jpeg', 'image/png'] },
      services: dossiersEnabled(env) ? SERVICES : {},
      bookingNeedsDossier: dossiersEnabled(env) ? BOOKING_NEEDS_DOSSIER : {},
    });
  }

  if (!dossiersEnabled(env)) return out({ error: 'disabled' }, 404);

  if (path === '/' && request.method === 'POST') return createDossier(request, env, deps);
  if (path === '/recover' && request.method === 'POST') return recoverDossier(request, env, deps);

  const token = request.headers.get('x-dossier-token') || '';
  const dossier = await loadByToken(env, token);
  if (!dossier) return out({ error: 'invalid_token' }, 401);

  if (path === '/me' && request.method === 'GET') return out(await dossierView(env, dossier));
  if (path === '/files' && request.method === 'POST') return uploadFile(request, env, dossier);
  const del = path.match(/^\/files\/(\d+)$/);
  if (del && request.method === 'DELETE') return deleteFile(env, dossier, Number(del[1]));
  if (path === '/submit' && request.method === 'POST') return submitDossier(request, env, deps, dossier, token);

  return out({ error: 'not_found' }, 404);
}

async function createDossier(request, env, deps) {
  let body;
  try { body = await request.json(); } catch { return out({ error: 'invalid_json' }, 400); }

  if (body.website) return out({ error: 'rejected' }, 400); // honeypot
  const service = String(body.service || '');
  if (!SERVICES[service]) return out({ error: 'invalid_service' }, 400);
  const firstName = clean(body.firstName, 80), lastName = clean(body.lastName, 80);
  const email = clean(body.email, 120).toLowerCase(), phone = clean(body.phone, 40), country = clean(body.country, 80);
  if (!firstName || !lastName) return out({ error: 'missing_name' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return out({ error: 'invalid_email' }, 400);
  if (phone.length < 5) return out({ error: 'invalid_phone' }, 400);
  if (body.consent !== true) return out({ error: 'consent_required' }, 400);
  const lang = pickLang(body.lang);

  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  const ipHash = await sha256(`${env.DOSSIER_SALT || 'ambaci'}|${ip}`);
  const day = isoPlusDays(-1), hour = isoPlusDays(-1 / 24);
  const perEmail = await env.DB.prepare('SELECT COUNT(*) AS n FROM dossiers WHERE email = ? AND created_at > ?').bind(email, day).first();
  const perIp = await env.DB.prepare('SELECT COUNT(*) AS n FROM dossiers WHERE ip_hash = ? AND created_at > ?').bind(ipHash, hour).first();
  if (perEmail.n >= 5 || perIp.n >= 15) return out({ error: 'too_many_requests' }, 429);

  let reference = null, token = null, id = null;
  for (let attempt = 0; attempt < 5 && !id; attempt++) {
    reference = newReference();
    token = await linkToken(env, reference, 1);
    try {
      const r = await env.DB.prepare(
        `INSERT INTO dossiers (reference, token_hash, link_version, service, first_name, last_name, email, phone, country, lang, ip_hash, delete_after)
         VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(reference, await sha256(token), service, firstName, lastName, email, phone, country, lang, ipHash, isoPlusDays(DRAFT_RETENTION_DAYS)).run();
      id = r.meta.last_row_id;
    } catch (e) {
      if (!String(e).includes('UNIQUE')) { console.error(e); return out({ error: 'db_error' }, 500); }
    }
  }
  if (!id) return out({ error: 'db_error' }, 500);

  await env.DB.batch(SERVICES[service].docs.map((d) =>
    env.DB.prepare('INSERT INTO dossier_docs (dossier_id, doc_key) VALUES (?, ?)').bind(id, d.key)));
  await logEvent(env, id, 'citizen', 'created', service);

  const d = { id, reference, first_name: firstName, email, lang };
  await mailCitizen(env, deps, d, 'link', personalLink(env, request, token));
  return out({ reference, token, service });
}

async function recoverDossier(request, env, deps) {
  let body;
  try { body = await request.json(); } catch { return out({ error: 'invalid_json' }, 400); }
  const reference = clean(body.reference, 40).toUpperCase();
  const email = clean(body.email, 120).toLowerCase();
  const d = reference && email
    ? await env.DB.prepare("SELECT * FROM dossiers WHERE reference = ? AND email = ? AND status != 'purged'").bind(reference, email).first()
    : null;
  if (d) {
    const recent = await env.DB.prepare("SELECT COUNT(*) AS n FROM dossier_events WHERE dossier_id = ? AND action = 'link_resent' AND created_at > ?").bind(d.id, isoPlusDays(-1 / 24)).first();
    if (recent.n < 3) {
      const version = d.link_version + 1; // the previous link stops working
      const token = await linkToken(env, d.reference, version);
      await env.DB.prepare('UPDATE dossiers SET token_hash = ?, link_version = ? WHERE id = ?').bind(await sha256(token), version, d.id).run();
      await logEvent(env, d.id, 'citizen', 'link_resent', null);
      await mailCitizen(env, deps, d, 'link', personalLink(env, request, token));
    }
  }
  // Same answer whether or not the dossier exists.
  return out({ ok: true, emailEnabled: !!env.EMAIL_FROM });
}

function editable(dossier, docRow) {
  if (dossier.status === 'draft') return docRow.status !== 'validated';
  if (dossier.status === 'needs_fix') return docRow.status === 'needs_fix' || docRow.status === 'missing';
  return false;
}

async function uploadFile(request, env, dossier) {
  let form;
  try { form = await request.formData(); } catch { return out({ error: 'invalid_form' }, 400); }
  const docKey = String(form.get('doc_key') || '');
  const file = form.get('file');
  const svc = SERVICES[dossier.service];
  if (!svc || !svc.docs.some((d) => d.key === docKey)) return out({ error: 'invalid_document' }, 400);
  if (!file || typeof file === 'string' || typeof file.arrayBuffer !== 'function') return out({ error: 'missing_file' }, 400);
  if (file.size === 0) return out({ error: 'empty_file' }, 400);
  if (file.size > MAX_FILE_BYTES) return out({ error: 'file_too_large' }, 413);

  const docRow = await env.DB.prepare('SELECT * FROM dossier_docs WHERE dossier_id = ? AND doc_key = ?').bind(dossier.id, docKey).first();
  if (!docRow || !editable(dossier, docRow)) return out({ error: 'not_editable' }, 409);

  const totals = await env.DB.prepare('SELECT COUNT(*) AS n, COALESCE(SUM(size),0) AS bytes FROM dossier_files WHERE dossier_id = ?').bind(dossier.id).first();
  const perDoc = await env.DB.prepare('SELECT COUNT(*) AS n FROM dossier_files WHERE dossier_id = ? AND doc_key = ?').bind(dossier.id, docKey).first();
  if (perDoc.n >= MAX_FILES_PER_DOC || totals.n >= MAX_FILES_PER_DOSSIER || totals.bytes + file.size > MAX_BYTES_PER_DOSSIER) return out({ error: 'too_many_files' }, 409);

  const kind = sniff(new Uint8Array(await file.slice(0, 8).arrayBuffer()));
  if (!kind) return out({ error: 'unsupported_type' }, 415);

  const r2Key = `dossiers/${dossier.id}/${docKey}/${crypto.randomUUID()}.${kind.ext}`;
  await env.DOSSIERS.put(r2Key, await file.arrayBuffer(), { httpMetadata: { contentType: kind.mime } });
  const name = clean(String(file.name || '').split(/[\\/]/).pop(), 120);
  const ins = await env.DB.prepare('INSERT INTO dossier_files (dossier_id, doc_key, r2_key, mime, size, original_name) VALUES (?, ?, ?, ?, ?, ?)')
    .bind(dossier.id, docKey, r2Key, kind.mime, file.size, name).run();
  await env.DB.prepare("UPDATE dossier_docs SET status = 'received', comment = NULL WHERE dossier_id = ? AND doc_key = ?").bind(dossier.id, docKey).run();
  await logEvent(env, dossier.id, 'citizen', 'file_added', docKey);
  return out({ ok: true, file: { id: ins.meta.last_row_id, name, size: file.size, mime: kind.mime } });
}

async function deleteFile(env, dossier, fileId) {
  const f = await env.DB.prepare('SELECT * FROM dossier_files WHERE id = ? AND dossier_id = ?').bind(fileId, dossier.id).first();
  if (!f) return out({ error: 'not_found' }, 404);
  const docRow = await env.DB.prepare('SELECT * FROM dossier_docs WHERE dossier_id = ? AND doc_key = ?').bind(dossier.id, f.doc_key).first();
  if (!docRow || !editable(dossier, docRow)) return out({ error: 'not_editable' }, 409);
  await env.DOSSIERS.delete(f.r2_key);
  await env.DB.prepare('DELETE FROM dossier_files WHERE id = ?').bind(f.id).run();
  const left = await env.DB.prepare('SELECT COUNT(*) AS n FROM dossier_files WHERE dossier_id = ? AND doc_key = ?').bind(dossier.id, f.doc_key).first();
  if (left.n === 0) await env.DB.prepare("UPDATE dossier_docs SET status = 'missing' WHERE dossier_id = ? AND doc_key = ? AND status = 'received'").bind(dossier.id, f.doc_key).run();
  await logEvent(env, dossier.id, 'citizen', 'file_removed', f.doc_key);
  return out({ ok: true });
}

async function submitDossier(request, env, deps, dossier, token) {
  if (dossier.status !== 'draft' && dossier.status !== 'needs_fix') return out({ error: 'not_editable' }, 409);
  const svc = SERVICES[dossier.service];
  const rows = (await env.DB.prepare('SELECT doc_key, status FROM dossier_docs WHERE dossier_id = ?').bind(dossier.id).all()).results;
  const missing = svc.docs.filter((d) => d.required && !['received', 'validated'].includes((rows.find((r) => r.doc_key === d.key) || {}).status));
  if (missing.length) return out({ error: 'incomplete', missing: missing.map((d) => d.key) }, 400);

  await env.DB.prepare("UPDATE dossiers SET status = 'submitted', submitted_at = ?, delete_after = ? WHERE id = ?")
    .bind(nowSql(), isoPlusDays(VALIDATED_RETENTION_DAYS), dossier.id).run();
  await logEvent(env, dossier.id, 'citizen', 'submitted', null);
  await mailCitizen(env, deps, dossier, 'submitted', personalLink(env, request, token));
  await notifyStaff(env, deps, dossier);
  return out(await dossierView(env, { ...dossier, status: 'submitted' }));
}

// ---------- booking integration ----------

// Returns { ok: true, dossier } when the token belongs to a validated dossier that unlocks
// this booking service, or { ok: false, error }.
export async function bookingDossierCheck(env, token, bookingService) {
  if (!dossiersEnabled(env) || !BOOKING_NEEDS_DOSSIER[bookingService]) return { ok: true, dossier: null };
  const d = await loadByToken(env, token);
  if (!d) return { ok: false, error: 'dossier_required' };
  if (!BOOKING_NEEDS_DOSSIER[bookingService].includes(d.service)) return { ok: false, error: 'dossier_wrong_service' };
  if (d.status !== 'validated') return { ok: false, error: 'dossier_not_validated' };
  if (d.booking_reference) return { ok: false, error: 'dossier_already_used' };
  return { ok: true, dossier: d };
}

export async function attachBookingToDossier(env, dossier, bookingReference, apptDate) {
  const r = await env.DB.prepare('UPDATE dossiers SET booking_reference = ?, delete_after = ? WHERE id = ? AND booking_reference IS NULL')
    .bind(bookingReference, isoPlusDays(AFTER_APPOINTMENT_DAYS, new Date(`${apptDate}T00:00:00Z`)), dossier.id).run();
  await logEvent(env, dossier.id, 'system', 'booking_attached', bookingReference);
  return r.meta.changes === 1;
}

// ---------- retention ----------

// Runs daily (cron). Erases files and personal data of expired dossiers.
export async function purgeExpired(env) {
  if (!env.DOSSIERS || !env.DB) return { purged: 0 };
  const due = (await env.DB.prepare("SELECT id FROM dossiers WHERE status != 'purged' AND delete_after < ? LIMIT 50").bind(nowSql()).all()).results;
  for (const { id } of due) {
    const files = (await env.DB.prepare('SELECT r2_key FROM dossier_files WHERE dossier_id = ?').bind(id).all()).results;
    for (const f of files) await env.DOSSIERS.delete(f.r2_key);
    await env.DB.batch([
      env.DB.prepare('DELETE FROM dossier_files WHERE dossier_id = ?').bind(id),
      env.DB.prepare('UPDATE dossier_docs SET comment = NULL WHERE dossier_id = ?').bind(id),
      env.DB.prepare("UPDATE dossiers SET status = 'purged', first_name = '-', last_name = '-', email = '-', phone = '-', country = '-', ip_hash = NULL, token_hash = 'purged-' || id WHERE id = ?").bind(id),
    ]);
    await logEvent(env, id, 'system', 'purged', null);
  }
  return { purged: due.length };
}
