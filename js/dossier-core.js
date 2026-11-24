/* ============================================================
   Dossiers — shared code (config, personal link storage, texts).
   Loaded by dossier.html, rendez-vous.html and the pages that show
   the "Préparer mon dossier" entry points. Nothing shows up unless the
   server says the feature is switched on (/api/dossiers/config).
   ============================================================ */
(function () {
  var API_BASE = (window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform())
    ? 'https://ambacivienna.kouassij019.workers.dev' : '';
  var STORE = 'ambaci-dossier';

  var I18N = {
    fr: {
      'page.title': 'Préparer mon dossier',
      'page.lead': 'Envoyez vos documents avant de venir. Le service consulaire les vérifie à l’avance : le jour du rendez-vous, il ne reste que la signature, la photo et les empreintes.',
      'disabled': 'Ce service n’est pas encore disponible. Prenez rendez-vous ou contactez le service consulaire.',
      'loading': 'Chargement…',
      'start.title': 'Commencer mon dossier',
      'start.service': 'Démarche',
      'start.firstName': 'Prénom', 'start.lastName': 'Nom', 'start.email': 'Adresse e-mail', 'start.phone': 'Téléphone', 'start.country': 'Pays de résidence',
      'start.consent': 'J’accepte que le service consulaire consulte les documents que j’envoie, uniquement pour traiter ma demande. Ils sont supprimés quelques semaines après mon rendez-vous.',
      'start.submit': 'Commencer mon dossier',
      'start.have': 'J’ai déjà un dossier',
      'start.current': 'Vous avez un dossier en cours : {ref}.',
      'start.open': 'Ouvrir ce dossier',
      'recover.title': 'Retrouver mon dossier',
      'recover.text': 'Saisissez votre numéro de dossier et l’adresse e-mail utilisée. Nous vous envoyons un nouveau lien personnel.',
      'recover.ref': 'Numéro de dossier', 'recover.email': 'Adresse e-mail utilisée',
      'recover.submit': 'Recevoir mon lien par e-mail',
      'recover.done': 'Si ces informations correspondent à un dossier, un e-mail avec un nouveau lien vient d’être envoyé.',
      'recover.noemail': 'L’envoi d’e-mails n’est pas encore activé. Contactez le service consulaire.',
      'recover.back': '← Retour',
      'status.draft': 'À compléter', 'status.submitted': 'En vérification', 'status.needs_fix': 'Pièce à corriger', 'status.validated': 'Dossier complet',
      'doc.missing': 'À ajouter', 'doc.received': 'Reçu', 'doc.validated': 'Validé', 'doc.needs_fix': 'À corriger',
      'doc.take': 'Prendre une photo', 'doc.pick': 'Choisir une photo', 'doc.pdf': 'Choisir un PDF',
      'doc.drop': 'ou glissez vos fichiers sur cette pièce', 'doc.formats': 'PDF, JPEG ou PNG · 10 Mo maximum par fichier · plusieurs pages possibles',
      'doc.remove': 'Retirer', 'doc.uploading': 'Envoi en cours…', 'doc.required': 'Obligatoire', 'doc.optional': 'Facultatif', 'doc.fixwhy': 'À corriger : {why}',
      'progress': '{n} pièces obligatoires sur {m}',
      'submit': 'Envoyer mon dossier', 'submit.hint': 'Ajoutez toutes les pièces obligatoires pour envoyer votre dossier.',
      'sent.title': 'Votre dossier est en vérification',
      'sent.text': 'Vous pouvez fermer cette page. Le service consulaire vérifie vos pièces et vous écrit dès que c’est fait. Votre numéro de dossier : {ref}.',
      'fix.title': 'Une ou plusieurs pièces sont à corriger',
      'fix.text': 'Corrigez les pièces signalées, puis renvoyez votre dossier.',
      'ok.title': 'Votre dossier est complet', 'ok.text': 'Vous pouvez maintenant choisir votre rendez-vous.', 'ok.cta': 'Choisir mon rendez-vous',
      'booked.title': 'Rendez-vous pris', 'booked.text': 'Votre rendez-vous est enregistré (référence {ref}). Apportez votre passeport actuel (original) et une pièce d’identité.',
      'note.original': 'Le service consulaire vous indiquera si un original doit être présenté lors du rendez-vous.',
      'privacy.title': 'Vos documents', 'privacy.text': 'Seul le service consulaire les consulte, pour traiter votre demande. Ils sont supprimés quelques semaines après votre rendez-vous.',
      'link.title': 'Gardez votre lien personnel', 'link.text': 'Il vous permet de revenir sur ce dossier à tout moment. Ne le partagez avec personne.', 'link.copy': 'Copier le lien', 'link.copied': 'Lien copié',
      'forget': 'Ce n’est pas mon dossier : l’oublier sur cet appareil',
      'err.generic': 'Une erreur est survenue. Réessayez dans un instant.',
      'err.invalid_email': 'Adresse e-mail invalide.', 'err.invalid_phone': 'Numéro de téléphone invalide.', 'err.missing_name': 'Indiquez votre prénom et votre nom.',
      'err.consent_required': 'Vous devez accepter pour continuer.',
      'err.too_many_requests': 'Trop de demandes. Réessayez plus tard.',
      'err.file_too_large': 'Fichier trop volumineux (10 Mo maximum).', 'err.unsupported_type': 'Format non accepté. Utilisez un PDF, un JPEG ou un PNG.',
      'err.too_many_files': 'Trop de fichiers pour cette pièce.', 'err.not_editable': 'Cette pièce ne peut plus être modifiée.',
      'err.incomplete': 'Il manque encore des pièces obligatoires.', 'err.invalid_token': 'Ce lien n’est plus valide. Utilisez « J’ai déjà un dossier » pour en recevoir un nouveau.',
      'err.empty_file': 'Ce fichier est vide.',
      'gate.title': 'Envoyez d’abord vos documents',
      'gate.text': 'Pour réserver, votre dossier doit être vérifié par le service consulaire. Le rendez-vous sera ensuite court : signature, photo et empreintes.',
      'gate.cta': 'Préparer mon dossier', 'gate.open': 'Ouvrir mon dossier',
      'gate.pending': 'Votre dossier est en cours de vérification. Vous pourrez réserver dès qu’il sera validé.',
      'gate.fix': 'Une pièce de votre dossier est à corriger avant de pouvoir réserver.',
      'gate.draft': 'Votre dossier n’est pas encore envoyé.',
      'gate.booked': 'Un rendez-vous est déjà pris pour ce dossier.',
      'gate.other': 'Votre dossier ne correspond pas à cette démarche. Préparez un dossier pour cette démarche.',
      'promo.title': 'Envoyez vos documents avant de venir', 'promo.text': 'Gagnez du temps le jour du rendez-vous : le service consulaire vérifie votre dossier à l’avance.',
      'promo.cta': 'Préparer mon dossier', 'promo.track': 'Suivre mon dossier', 'promo.status': 'Votre dossier {ref} : {status}', 'promo.open': 'Ouvrir mon dossier',
      'cta.title': 'Préparez votre dossier en ligne', 'cta.text': 'Envoyez vos documents depuis votre téléphone ou votre ordinateur. Vous ne venez à l’ambassade que pour la signature, la photo et les empreintes.',
      'cta.btn': 'Préparer mon dossier', 'cta.first': 'Première demande', 'cta.renew': 'Renouvellement', 'cta.urgent': 'Urgence (perte ou vol)'
    },
    de: {
      'page.title': 'Meine Akte vorbereiten',
      'page.lead': 'Senden Sie Ihre Unterlagen vor Ihrem Besuch. Der Konsulardienst prüft sie im Voraus: Beim Termin bleiben nur Unterschrift, Foto und Fingerabdrücke.',
      'disabled': 'Dieser Service ist noch nicht verfügbar. Vereinbaren Sie einen Termin oder kontaktieren Sie den Konsulardienst.',
      'loading': 'Wird geladen…',
      'start.title': 'Meine Akte beginnen',
      'start.service': 'Anliegen',
      'start.firstName': 'Vorname', 'start.lastName': 'Nachname', 'start.email': 'E-Mail-Adresse', 'start.phone': 'Telefon', 'start.country': 'Wohnsitzland',
      'start.consent': 'Ich bin einverstanden, dass der Konsulardienst die von mir gesendeten Dokumente ausschließlich zur Bearbeitung meines Antrags einsieht. Sie werden einige Wochen nach meinem Termin gelöscht.',
      'start.submit': 'Meine Akte beginnen',
      'start.have': 'Ich habe bereits eine Akte',
      'start.current': 'Sie haben eine laufende Akte: {ref}.',
      'start.open': 'Diese Akte öffnen',
      'recover.title': 'Meine Akte wiederfinden',
      'recover.text': 'Geben Sie Ihre Aktennummer und die verwendete E-Mail-Adresse ein. Wir senden Ihnen einen neuen persönlichen Link.',
      'recover.ref': 'Aktennummer', 'recover.email': 'Verwendete E-Mail-Adresse',
      'recover.submit': 'Link per E-Mail erhalten',
      'recover.done': 'Wenn diese Angaben zu einer Akte passen, wurde eine E-Mail mit einem neuen Link gesendet.',
      'recover.noemail': 'Der E-Mail-Versand ist noch nicht aktiviert. Kontaktieren Sie den Konsulardienst.',
      'recover.back': '← Zurück',
      'status.draft': 'Zu vervollständigen', 'status.submitted': 'In Prüfung', 'status.needs_fix': 'Dokument zu korrigieren', 'status.validated': 'Akte vollständig',
      'doc.missing': 'Hinzufügen', 'doc.received': 'Erhalten', 'doc.validated': 'Bestätigt', 'doc.needs_fix': 'Zu korrigieren',
      'doc.take': 'Foto aufnehmen', 'doc.pick': 'Foto auswählen', 'doc.pdf': 'PDF auswählen',
      'doc.drop': 'oder Dateien auf dieses Dokument ziehen', 'doc.formats': 'PDF, JPEG oder PNG · max. 10 MB pro Datei · mehrere Seiten möglich',
      'doc.remove': 'Entfernen', 'doc.uploading': 'Wird gesendet…', 'doc.required': 'Pflicht', 'doc.optional': 'Optional', 'doc.fixwhy': 'Zu korrigieren: {why}',
      'progress': '{n} von {m} Pflichtdokumenten',
      'submit': 'Meine Akte senden', 'submit.hint': 'Fügen Sie alle Pflichtdokumente hinzu, um Ihre Akte zu senden.',
      'sent.title': 'Ihre Akte wird geprüft',
      'sent.text': 'Sie können diese Seite schließen. Der Konsulardienst prüft Ihre Unterlagen und schreibt Ihnen, sobald das erledigt ist. Ihre Aktennummer: {ref}.',
      'fix.title': 'Ein oder mehrere Dokumente müssen korrigiert werden',
      'fix.text': 'Korrigieren Sie die markierten Dokumente und senden Sie Ihre Akte erneut.',
      'ok.title': 'Ihre Akte ist vollständig', 'ok.text': 'Sie können jetzt Ihren Termin wählen.', 'ok.cta': 'Termin wählen',
      'booked.title': 'Termin gebucht', 'booked.text': 'Ihr Termin ist gespeichert (Referenz {ref}). Bringen Sie Ihren aktuellen Reisepass (Original) und einen Ausweis mit.',
      'note.original': 'Der Konsulardienst teilt Ihnen mit, ob beim Termin ein Original vorgelegt werden muss.',
      'privacy.title': 'Ihre Dokumente', 'privacy.text': 'Nur der Konsulardienst sieht sie, um Ihren Antrag zu bearbeiten. Sie werden einige Wochen nach Ihrem Termin gelöscht.',
      'link.title': 'Bewahren Sie Ihren persönlichen Link auf', 'link.text': 'Damit können Sie jederzeit zu dieser Akte zurückkehren. Teilen Sie ihn mit niemandem.', 'link.copy': 'Link kopieren', 'link.copied': 'Link kopiert',
      'forget': 'Das ist nicht meine Akte: auf diesem Gerät vergessen',
      'err.generic': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es gleich noch einmal.',
      'err.invalid_email': 'Ungültige E-Mail-Adresse.', 'err.invalid_phone': 'Ungültige Telefonnummer.', 'err.missing_name': 'Geben Sie Vor- und Nachnamen an.',
      'err.consent_required': 'Sie müssen zustimmen, um fortzufahren.',
      'err.too_many_requests': 'Zu viele Anfragen. Bitte später erneut versuchen.',
      'err.file_too_large': 'Datei zu groß (max. 10 MB).', 'err.unsupported_type': 'Format nicht akzeptiert. Verwenden Sie PDF, JPEG oder PNG.',
      'err.too_many_files': 'Zu viele Dateien für dieses Dokument.', 'err.not_editable': 'Dieses Dokument kann nicht mehr geändert werden.',
      'err.incomplete': 'Es fehlen noch Pflichtdokumente.', 'err.invalid_token': 'Dieser Link ist nicht mehr gültig. Wählen Sie „Ich habe bereits eine Akte“, um einen neuen zu erhalten.',
      'err.empty_file': 'Diese Datei ist leer.',
      'gate.title': 'Senden Sie zuerst Ihre Unterlagen',
      'gate.text': 'Für eine Buchung muss Ihre Akte vom Konsulardienst geprüft sein. Der Termin ist dann kurz: Unterschrift, Foto und Fingerabdrücke.',
      'gate.cta': 'Meine Akte vorbereiten', 'gate.open': 'Meine Akte öffnen',
      'gate.pending': 'Ihre Akte wird geprüft. Sie können buchen, sobald sie bestätigt ist.',
      'gate.fix': 'Ein Dokument Ihrer Akte muss korrigiert werden, bevor Sie buchen können.',
      'gate.draft': 'Ihre Akte wurde noch nicht gesendet.',
      'gate.booked': 'Für diese Akte ist bereits ein Termin gebucht.',
      'gate.other': 'Ihre Akte passt nicht zu diesem Anliegen. Bereiten Sie eine Akte für dieses Anliegen vor.',
      'promo.title': 'Senden Sie Ihre Unterlagen vor dem Besuch', 'promo.text': 'Sparen Sie Zeit beim Termin: Der Konsulardienst prüft Ihre Akte im Voraus.',
      'promo.cta': 'Meine Akte vorbereiten', 'promo.track': 'Meine Akte verfolgen', 'promo.status': 'Ihre Akte {ref}: {status}', 'promo.open': 'Meine Akte öffnen',
      'cta.title': 'Bereiten Sie Ihre Akte online vor', 'cta.text': 'Senden Sie Ihre Unterlagen vom Smartphone oder Computer. Sie kommen nur noch für Unterschrift, Foto und Fingerabdrücke zur Botschaft.',
      'cta.btn': 'Meine Akte vorbereiten', 'cta.first': 'Erstantrag', 'cta.renew': 'Verlängerung', 'cta.urgent': 'Notfall (Verlust oder Diebstahl)'
    },
    en: {
      'page.title': 'Prepare my file',
      'page.lead': 'Send your documents before you come. The consular service checks them in advance: on the day of the appointment, only the signature, photo and fingerprints are left.',
      'disabled': 'This service is not available yet. Book an appointment or contact the consular service.',
      'loading': 'Loading…',
      'start.title': 'Start my file',
      'start.service': 'Procedure',
      'start.firstName': 'First name', 'start.lastName': 'Last name', 'start.email': 'E-mail address', 'start.phone': 'Phone', 'start.country': 'Country of residence',
      'start.consent': 'I agree that the consular service looks at the documents I send, only to process my request. They are deleted a few weeks after my appointment.',
      'start.submit': 'Start my file',
      'start.have': 'I already have a file',
      'start.current': 'You have a file in progress: {ref}.',
      'start.open': 'Open this file',
      'recover.title': 'Find my file',
      'recover.text': 'Enter your file number and the e-mail address you used. We will send you a new personal link.',
      'recover.ref': 'File number', 'recover.email': 'E-mail address used',
      'recover.submit': 'Send me my link by e-mail',
      'recover.done': 'If these details match a file, an e-mail with a new link has just been sent.',
      'recover.noemail': 'E-mail sending is not active yet. Please contact the consular service.',
      'recover.back': '← Back',
      'status.draft': 'To complete', 'status.submitted': 'Being checked', 'status.needs_fix': 'Document to correct', 'status.validated': 'File complete',
      'doc.missing': 'To add', 'doc.received': 'Received', 'doc.validated': 'Approved', 'doc.needs_fix': 'To correct',
      'doc.take': 'Take a photo', 'doc.pick': 'Choose a photo', 'doc.pdf': 'Choose a PDF',
      'doc.drop': 'or drag your files onto this document', 'doc.formats': 'PDF, JPEG or PNG · 10 MB maximum per file · several pages allowed',
      'doc.remove': 'Remove', 'doc.uploading': 'Sending…', 'doc.required': 'Required', 'doc.optional': 'Optional', 'doc.fixwhy': 'To correct: {why}',
      'progress': '{n} of {m} required documents',
      'submit': 'Send my file', 'submit.hint': 'Add all required documents to send your file.',
      'sent.title': 'Your file is being checked',
      'sent.text': 'You can close this page. The consular service checks your documents and writes to you as soon as it is done. Your file number: {ref}.',
      'fix.title': 'One or more documents need to be corrected',
      'fix.text': 'Correct the documents marked below, then send your file again.',
      'ok.title': 'Your file is complete', 'ok.text': 'You can now choose your appointment.', 'ok.cta': 'Choose my appointment',
      'booked.title': 'Appointment booked', 'booked.text': 'Your appointment is saved (reference {ref}). Bring your current passport (original) and an ID.',
      'note.original': 'The consular service will tell you if an original must be shown at the appointment.',
      'privacy.title': 'Your documents', 'privacy.text': 'Only the consular service sees them, to process your request. They are deleted a few weeks after your appointment.',
      'link.title': 'Keep your personal link', 'link.text': 'It lets you come back to this file at any time. Do not share it with anyone.', 'link.copy': 'Copy the link', 'link.copied': 'Link copied',
      'forget': 'This is not my file: forget it on this device',
      'err.generic': 'Something went wrong. Please try again in a moment.',
      'err.invalid_email': 'Invalid e-mail address.', 'err.invalid_phone': 'Invalid phone number.', 'err.missing_name': 'Enter your first and last name.',
      'err.consent_required': 'You must agree to continue.',
      'err.too_many_requests': 'Too many requests. Please try again later.',
      'err.file_too_large': 'File too large (10 MB maximum).', 'err.unsupported_type': 'Format not accepted. Use a PDF, JPEG or PNG.',
      'err.too_many_files': 'Too many files for this document.', 'err.not_editable': 'This document can no longer be changed.',
      'err.incomplete': 'Some required documents are still missing.', 'err.invalid_token': 'This link is no longer valid. Use “I already have a file” to get a new one.',
      'err.empty_file': 'This file is empty.',
      'gate.title': 'Send your documents first',
      'gate.text': 'To book, your file must be checked by the consular service. The appointment will then be short: signature, photo and fingerprints.',
      'gate.cta': 'Prepare my file', 'gate.open': 'Open my file',
      'gate.pending': 'Your file is being checked. You will be able to book as soon as it is approved.',
      'gate.fix': 'A document in your file needs to be corrected before you can book.',
      'gate.draft': 'Your file has not been sent yet.',
      'gate.booked': 'An appointment is already booked for this file.',
      'gate.other': 'Your file does not match this procedure. Prepare a file for this procedure.',
      'promo.title': 'Send your documents before you come', 'promo.text': 'Save time on the day of your appointment: the consular service checks your file in advance.',
      'promo.cta': 'Prepare my file', 'promo.track': 'Follow my file', 'promo.status': 'Your file {ref}: {status}', 'promo.open': 'Open my file',
      'cta.title': 'Prepare your file online', 'cta.text': 'Send your documents from your phone or computer. You only come to the embassy for the signature, photo and fingerprints.',
      'cta.btn': 'Prepare my file', 'cta.first': 'First application', 'cta.renew': 'Renewal', 'cta.urgent': 'Emergency (loss or theft)'
    }
  };

  function lang() {
    var l = (document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
    return I18N[l] ? l : 'en'; // the other site languages fall back to English
  }
  function tr(key, vars) {
    var s = (I18N[lang()] && I18N[lang()][key]) || I18N.fr[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace('{' + k + '}', vars[k]); });
    return s;
  }
  function pick(obj) { return obj ? (obj[lang()] || obj.en || obj.fr || '') : ''; }

  function getStored() { try { return JSON.parse(localStorage.getItem(STORE) || 'null'); } catch (e) { return null; } }
  function setStored(v) { try { localStorage.setItem(STORE, JSON.stringify(v)); } catch (e) {} }
  function clearStored() { try { localStorage.removeItem(STORE); } catch (e) {} }

  var cfgPromise = null;
  function config() {
    if (!cfgPromise) {
      cfgPromise = fetch(API_BASE + '/api/dossiers/config', { cache: 'no-store' })
        .then(function (r) { return r.ok ? r.json() : { enabled: false }; })
        .catch(function () { return { enabled: false }; });
    }
    return cfgPromise;
  }

  // Calls the API with the personal token (from `token`, or the one stored on this device).
  function api(path, opts, token) {
    opts = opts || {};
    var headers = Object.assign({}, opts.headers || {});
    var tk = token || (getStored() || {}).token;
    if (tk) headers['x-dossier-token'] = tk;
    return fetch(API_BASE + path, Object.assign({}, opts, { headers: headers, cache: 'no-store' })).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (body) { return { ok: r.ok, status: r.status, body: body }; });
    });
  }

  function me(token) {
    return api('/api/dossiers/me', {}, token).then(function (r) { if (!r.ok) throw r; return r.body; });
  }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // Re-runs `fn` whenever the visitor changes the site language.
  function onLangChange(fn) {
    new MutationObserver(fn).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }

  function loadCss() {
    if (document.getElementById('dossier-css')) return;
    var l = document.createElement('link');
    l.id = 'dossier-css'; l.rel = 'stylesheet'; l.href = 'css/dossier.css';
    document.head.appendChild(l);
  }

  window.AmbaciDossier = {
    API_BASE: API_BASE, lang: lang, tr: tr, pick: pick, esc: esc,
    config: config, api: api, me: me, getStored: getStored, setStored: setStored, clearStored: clearStored,
    onLangChange: onLangChange, loadCss: loadCss
  };
})();
