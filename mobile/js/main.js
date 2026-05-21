'use strict';

/* ============================================================
   TRADUCTIONS FR / DE / EN — Version complète
   ============================================================ */
const T = {
  fr: {
    /* ── Navigation & chrome ── */
    'nav.home':'Accueil','nav.embassy':'Ambassade','nav.services':'Services',
    'nav.annonces':'Annonces','nav.contact':'Contact',
    'logo.name':"Ambassade de Côte d'Ivoire",
    'logo.sub':'Vienne, Autriche',
    'footer.copy':"© 2025 Ambassade de la République de Côte d'Ivoire en Autriche",
    'footer.links.home':'Accueil','footer.links.embassy':'Ambassade',
    'footer.links.services':'Services','footer.links.annonces':'Annonces',
    'footer.links.contact':'Contact',

    /* ── Top bar ── */
    'topbar.address':'Michael-Neumann-Gasse 2 - 3ème Etage, 1190 Wien',
    'topbar.hours':'Lun–Ven : 09h30 – 16h00',

    /* ── Alert ── */
    'alert.text':'RDV obligatoire pour toute démarche.',
    'alert.link':'Prendre RDV →',

    /* ── Hero (index) ── */
    'hero.tag':'Service Consulaire',
    'hero.h1':"Bienvenue à l'Ambassade de<br><em>Côte d'Ivoire</em>",
    'hero.desc':"Vos démarches consulaires depuis Vienne, pour 8 pays d'Europe centrale.",
    'hero.btn1':'Nos services','hero.btn2':'Prendre RDV',
    'hero.countries':'8 pays desservis',
    'hero.floor':'1190 Wien, 3ème Etage',

    /* ── Index — Services grid ── */
    'badge.services':'Nos services',
    'srv.title':'Services consulaires','srv.more':'Voir →',
    'srv.passport':'Passeport','srv.passport.sub':'Demande & renouvellement',
    'srv.visa':'Visa','srv.visa.sub':'Touristique, affaires, transit',
    'srv.civil':'État civil','srv.civil.sub':'Actes & transcriptions',
    'srv.legal':'Légalisation','srv.legal.sub':'Documents officiels',
    'srv.cert':'Certificats','srv.cert.sub':'Vie, résidence, nationalité',
    'srv.wa':'WhatsApp','srv.wa.sub':'Contact direct',

    /* ── Index — Infos pratiques ── */
    'badge.contact':'Contact',
    'info.practical':'Informations pratiques',
    'info.contact.title':'Nous contacter',
    'info.address.label':'Adresse géographique',
    'info.phone.label':'Téléphone',
    'info.email.label':'Email',
    'info.emergency.label':'Urgences 24h/24',

    /* ── Index — Pays ── */
    'badge.jurisdiction':'Juridiction',
    'pays.title':'Circonscription diplomatique',
    'pays.sub':"8 pays d'Europe centrale et des Balkans",
    'pays.at':'Autriche','pays.hu':'Hongrie','pays.si':'Slovénie',
    'pays.sk':'Slovaquie','pays.hr':'Croatie','pays.rs':'Serbie',
    'pays.ro':'Roumanie','pays.ba':'Bosnie',

    /* ── Index — Actualités ── */
    'badge.news':'Actualités',
    'actu.title':'Informations & Annonces',
    'actu.tag1':'Mission économique',
    'actu.h3':"Visite du Président du Conseil Économique, Social, Environnemental et Culturel",
    'actu.p1':"Mission économique visant à renforcer les liens entre la Côte d'Ivoire et l'Europe centrale.",
    'actu.date1':'02 juin 2025',
    'actu.month1':'Mai',
    'news1.title':'Nouveau formulaire de demande de passeport',
    'news1.desc':'Mise à jour du formulaire biométrique.',
    'news2.title':'Fermeture — Fête du Travail',
    'news2.desc':'Fermé le 1er mai 2025.',

    /* ── CTA ── */
    'cta.title':"Besoin d'aide consulaire ?",
    'cta.desc':'Dépôt de dossiers et retraits du mardi au vendredi — sur rendez-vous.',
    'cta.btn':'Prendre rendez-vous',
    'cta.call':'+43 1 581007610',

    /* ── Services page ── */
    'srv.breadcrumb':'Services',
    'srv.page.h1':'Services consulaires',
    'srv.page.sub':'Toutes vos démarches administratives officielles',
    'info.rdv':'RDV obligatoire','info.rdv.sub':'Aucune démarche sans RDV',
    'info.payment':'Paiement en ligne','info.payment.sub':'Uniquement en ligne',
    'info.delay':'Délais variables','info.delay.sub':'Selon la démarche',
    'info.file':'Dossier complet','info.file.sub':'Tous documents requis',
    'badge.passport':'Document de voyage',
    'srv.passport.title':'Passeport biométrique',
    'srv.pp.new':'Première demande','srv.pp.new.sub':'Pour les personnes sans passeport',
    'srv.pp.renew':'Renouvellement','srv.pp.renew.sub':'Passeport expiré ou à renouveler',
    'srv.pp.urgent':'Passeport d\'urgence','srv.pp.urgent.sub':'Perte, vol ou urgence',
    'srv.fees':'Frais consulaires',
    'srv.delay.std':'Délai : 4 à 8 semaines',
    'srv.delay.urgent':'Délai : 24 à 72h',
    /* Première demande */
    'pp.new.req1':"Acte de naissance original (moins de 3 mois)",
    'pp.new.req2':"Certificat de nationalité ivoirienne",
    'pp.new.req3':"2 photos d'identité (fond blanc, 35×45mm)",
    'pp.new.req4':"Justificatif de résidence",
    /* Renouvellement */
    'pp.renew.req1':"Ancien passeport original",
    'pp.renew.req2':"Acte de naissance (moins de 3 mois)",
    'pp.renew.req3':"2 photos d'identité récentes",
    /* Urgence */
    'pp.urgent.req1':"Déclaration de perte/vol (police)",
    'pp.urgent.req2':"Acte de naissance original",
    'pp.urgent.req3':"Justification de l'urgence",
    /* Visa touristique */
    'visa.tourist.req1':"Passeport valide (min. 6 mois)",
    'visa.tourist.req2':"Billet aller-retour",
    'visa.tourist.req3':"Justificatif d'hébergement",
    'visa.tourist.req4':"Assurance voyage",
    /* Visa affaires */
    'visa.business.req1':"Passeport valide",
    'visa.business.req2':"Lettre d'invitation d'une entreprise CI",
    'visa.business.req3':"Extrait Kbis",
    'badge.visa':'Visa d\'entrée',
    'srv.visa.title':'Visa pour la Côte d\'Ivoire',
    'srv.visa.tourist':'Visa touristique','srv.visa.tourist.sub':'Séjour jusqu\'à 90 jours',
    'srv.visa.business':'Visa d\'affaires','srv.visa.business.sub':'Activités professionnelles',
    'srv.visa.fees':'Frais de visa',
    'srv.delay.visa':'Délai : 5 à 10 jours ouvrés',
    'badge.civil':'État civil',
    'srv.civil.title':'Actes d\'état civil',
    'srv.civil.online':'Actes disponibles','srv.civil.online.sub':'Cliquez pour payer en ligne',
    'civil.act.death':'Acte de décès',
    'civil.act.marriage':'Acte de mariage',
    'civil.act.admin':'Attestation Administrative',
    'civil.act.id':'Carte d\'identité consulaire',
    'civil.act.wed':'Célébration de mariage',
    'civil.act.life':'Certificat de vie',
    'civil.act.birth':'Extrait de naissance',
    'civil.act.pass':'Laissez-passer volontaire',
    'civil.act.legal.admin':'Légalisation documents admin.',
    'civil.act.legal.co':'Légalisation pour Entreprises',
    'civil.act.transcription':'Transcription actes d\'État Civil',
    'badge.cert':'Certificats',
    'srv.cert.title':'Certificats & Attestations',
    'srv.cert.online':'Certificats consulaires','srv.cert.online.sub':'Paiement en ligne',
    'cert.life':'Certificat de vie',
    'cert.single':'Certificat de célibat',
    'cert.residence':'Certificat de résidence',
    'cert.nationality':'Certificat de nationalité',
    'cert.custom':'Certificat de coutume',
    'cert.proxy':'Procuration',
    'badge.faq':'FAQ',
    'srv.faq.title':'Questions fréquentes',
    'faq1.q':'Faut-il un rendez-vous ?',
    'faq1.a':'Oui, la prise de rendez-vous est obligatoire pour tout dépôt de dossier. Contactez-nous par téléphone ou email.',
    'faq2.q':'Délai passeport ?',
    'faq2.a':'4 à 8 semaines en général. En urgence : 24 à 72 heures selon situation.',
    'faq3.q':'Je réside en Hongrie, puis-je venir à Vienne ?',
    'faq3.a':"Oui. L'Ambassade couvre 8 pays : Autriche, Hongrie, Slovénie, Slovaquie, Croatie, Serbie, Roumanie et Bosnie-Herzégovine.",
    'srv.cta.title':'Prêt à commencer ?',
    'srv.cta.desc':'Prenez rendez-vous ou payez vos frais consulaires en ligne.',
    'btn.rdv':'Prendre rendez-vous','btn.call':'Appeler',

    /* ── Ambassade page ── */
    'amb.breadcrumb':'Ambassade',
    'amb.h1':"L'Ambassade de Côte d'Ivoire",
    'amb.sub':'Représentation officielle en Autriche depuis Vienne',
    'amb.stat.countries':'pays dans la circonscription',
    'amb.stat.conv':'Conv. de Vienne',
    'amb.stat.ci':"Côte d'Ivoire",
    'amb.stat.host':'Pays hôte',
    'badge.mission':'Notre mission',
    'amb.mission.title':'Mission diplomatique & consulaire',
    'amb.mission.p1':"L'Ambassade de la République de Côte d'Ivoire en Autriche est la représentation diplomatique officielle de la Côte d'Ivoire à Vienne. Elle assure la défense des intérêts ivoiriens, le développement des relations bilatérales et la protection de ses ressortissants.",
    'amb.mission.p2':"Établie conformément à la Convention de Vienne de 1961, l'Ambassade remplit une double mission : diplomatique et consulaire.",
    'badge.direction':'Direction',
    'amb.title':"Ambassadeur Extraordinaire et Plénipotentiaire de la République de Côte d'Ivoire en Autriche",
    'amb.p1':"Son Excellence Monsieur Cissé Yacouba est accrédité auprès de la République d'Autriche depuis 2023. Il est également accrédité auprès de la Hongrie, la Slovénie, la Slovaquie, la Croatie, la Serbie, la Roumanie et la Bosnie-Herzégovine.",
    'amb.p2':"Fort d'une longue carrière diplomatique, Son Excellence représente les intérêts de la République ivoirienne et coordonne l'ensemble des services de l'Ambassade.",
    'badge.diplomacy':'Diplomatie',
    'amb.rel.title':'Relations CI — Autriche',
    'rel.bilateral.title':'Coopération bilatérale',
    'rel.bilateral.desc':'Relations fondées sur le respect mutuel, la coopération économique, culturelle et éducative.',
    'rel.trade.title':'Échanges commerciaux',
    'rel.trade.desc':"La CI exporte cacao, café et matières premières. L'Autriche est partenaire dans l'industrie et les services.",
    'rel.academic.title':'Coopération académique',
    'rel.academic.desc':'Échanges universitaires et programmes de bourses pour étudiants ivoiriens.',
    'rel.intl.title':'Organisations internationales',
    'rel.intl.desc':"Vienne abrite ONUDI, AIEA, ONUDC. L'Ambassade coordonne la participation ivoirienne.",
    'badge.ci':"La Côte d'Ivoire",
    'ci.title':"Découvrir la Côte d'Ivoire",
    'ci.area':'Superficie','ci.pop':'Population',
    'ci.indep':'Indépendance','ci.capital':'Capitale',
    'amb.cta.title':'Besoin d\'un service ?',
    'amb.cta.desc':'Notre équipe est disponible du lundi au vendredi.',
    'amb.cta.btn1':'Voir les services','amb.cta.btn2':'Nous contacter',

    /* ── Contact page ── */
    'contact.breadcrumb':'Contact',
    'contact.h1':'Contact & Horaires',
    'contact.sub':'Coordonnées et horaires du service consulaire',
    'contact.phone.label':'Téléphone','contact.email.label':'Email',
    'contact.address.label':'Adresse','contact.emergency.label':'Urgences',
    'contact.address.val':'1190 Wien, 3ème Etage',
    'badge.hours':'Horaires consulaires',
    'contact.hours.title':'Heures d\'ouverture',
    'contact.hours.sub':'Sur rendez-vous uniquement',
    'table.day':'Jour','table.counter':'Guichet',
    'contact.holidays':'Quelques jours fériés',
    'holiday.newyear':'Nouvel An','holiday.labor':'Fête du Travail',
    'holiday.ci':'Fête Nationale CI','holiday.at':'Fête Nationale AT',
    'badge.access':'Accès',
    'contact.addr.title':'Adresse géographique',
    'contact.floor':'3ème Etage — 1190 Wien, Autriche',
    'contact.metro':'Métro','contact.metro.val':'U4 — Station Heiligenstadt',
    'contact.bus':'Bus','contact.bus.val':'Ligne 35A — Arrêt Michael-Neumann-Gasse',
    'contact.maps':'Ouvrir dans Google Maps →',
    'badge.form':'Nous écrire',
    'contact.form.title':'Formulaire de contact',
    'form.firstname':'Prénom','form.lastname':'Nom','form.email':'Email',
    'form.phone':'Téléphone','form.country':'Pays de résidence',
    'form.country.select':'— Sélectionner —',
    'form.subject':'Objet','form.subject.select':'— Type de demande —',
    'form.rdv':'Prise de rendez-vous','form.passport':'Passeport','form.visa':'Visa',
    'form.civil':'État civil','form.emergency':'Urgence consulaire',
    'form.message':'Message','form.placeholder':'Décrivez votre demande...',
    'form.submit':'Envoyer →',
    'contact.urgency.title':'Urgences consulaires',
    'contact.urgency.text':'En cas d\'urgence hors horaires (perte de passeport, décès, hospitalisation, arrestation), notre permanence est disponible 24h/24.',

    /* ── Annonces page ── */
    'annonces.breadcrumb':'Annonces',
    'annonces.h1':'Informations & Annonces',
    'annonces.sub':'Avis officiels, fermetures, événements et communiqués',
    'annonces.pinned':'Épinglé — Urgent',
    'annonces.pin.title':'Fermeture — Fête Nationale de Côte d\'Ivoire',
    'annonces.pin.text':"L'Ambassade sera <strong>fermée le lundi 7 août 2025</strong> pour la Fête Nationale (65ème anniversaire). Reprise le mardi 8 août à 09h30.",
    'annonces.pin.date':'Publié le 10 juillet 2025',
    'filter.all':'Toutes','filter.urgent':'Urgentes',
    'filter.admin':'Administratif','filter.event':'Événements',
    'filter.communique':'Communiqués',
    /* Catégories */
    'cat.urgent':'Urgent','cat.admin':'Administratif',
    'cat.event':'Événement','cat.communique':'Communiqué',
    /* Annonce 1 */
    'ann1.date':'15 juillet 2025',
    'ann1.title':'Perturbation — Travaux de rénovation',
    'ann1.text':'Services perturbés du <strong>21 au 25 juillet</strong>. Dépôts de dossiers sur RDV uniquement.',
    'btn.rdv.short':'Prendre RDV','btn.write':'Écrire',
    /* Annonce 2 */
    'ann2.date':'1er juillet 2025',
    'ann2.title':'Nouveaux tarifs consulaires — 1er août 2025',
    'ann2.text':'Le nouveau barème des prestations consulaires entre en vigueur le <strong>1er août 2025</strong>.',
    'btn.download':'Télécharger PDF','btn.services':'Services',
    /* Annonce 3 */
    'ann3.date':'20 juin 2025',
    'ann3.title':'Journée Consulaire Itinérante — Budapest, 12 sept.',
    'ann3.text':'Démarches administratives sur place à Budapest. Inscription avant le <strong>29 août 2025</strong>.',
    'btn.register':'S\'inscrire','btn.programme':'Programme',
    /* Annonce 4 */
    'ann4.date':'5 juin 2025',
    'ann4.title':'Rappel — Documents requis pour le passeport',
    'ann4.text':'Ancien passeport, acte de naissance légalisé, 2 photos, justificatif de domicile. Tout dossier incomplet sera retourné.',
    'btn.procedure':'Procédure complète',
    /* Annonce 5 */
    'ann5.date':'15 mai 2025',
    'ann5.title':'Présentation de lettres de créance',
    'ann5.text':'S.E.M. Cissé Yacouba a présenté ses lettres de créance au Président fédéral d\'Autriche au Palais de la Hofburg.',
    'btn.read':'Lire le communiqué',
    'annonce.subscribe.title':'Recevez les annonces',
    'annonce.subscribe.desc':'Inscrivez-vous pour être notifié des nouvelles informations importantes.',
    'annonce.subscribe.placeholder':'votre@email.com',
    'annonce.subscribe.btn':'OK →',
    'annonce.follow':'Suivez-nous',
    'annonce.empty':'Aucune annonce dans cette catégorie.',

    /* ── Days ── */
    'day.mon':'Lundi','day.tue':'Mardi','day.wed':'Mercredi','day.thu':'Jeudi',
    'day.fri':'Vendredi','day.sat':'Samedi','day.sun':'Dimanche','day.closed':'Fermé',
    'hours.val':'09h30 – 16h00',
    'hours.depot':'Dépôt de dossiers',
    'hours.retrait':'Retraits de dossiers',
    'hours.rdv':'(sur rendez-vous)',
    'hours.days':'Mardi – Vendredi',
    'hours.depot.time':'09:00 – 14:00',
    'hours.retrait.time':'14:00 – 16:00',
    'hours.closed.days':'Lundi · Sam. · Dim.',
  },

  de: {
    /* ── Navigation & chrome ── */
    'nav.home':'Start','nav.embassy':'Botschaft','nav.services':'Dienste',
    'nav.annonces':'Ankündigungen','nav.contact':'Kontakt',
    'logo.name':'Botschaft der Elfenbeinküste',
    'logo.sub':'Wien, Österreich',
    'footer.copy':'© 2025 Botschaft der Republik Elfenbeinküste in Österreich',
    'footer.links.home':'Start','footer.links.embassy':'Botschaft',
    'footer.links.services':'Dienste','footer.links.annonces':'Ankündigungen',
    'footer.links.contact':'Kontakt',

    /* ── Top bar ── */
    'topbar.address':'Michael-Neumann-Gasse 2 - 3. Stock, 1190 Wien',
    'topbar.hours':'Mo–Fr : 09:30 – 16:00 Uhr',

    /* ── Alert ── */
    'alert.text':'Termin erforderlich für alle Verfahren.',
    'alert.link':'Termin buchen →',

    /* ── Hero ── */
    'hero.tag':'Konsulardienst',
    'hero.h1':'Willkommen bei der Botschaft der<br><em>Elfenbeinküste</em>',
    'hero.desc':'Ihre konsularischen Angelegenheiten von Wien aus, für 8 mitteleuropäische Länder.',
    'hero.btn1':'Unsere Dienste','hero.btn2':'Termin buchen',
    'hero.countries':'8 Länder betreut',
    'hero.floor':'1190 Wien, 3. Etage',

    /* ── Index — Services grid ── */
    'badge.services':'Unsere Dienste',
    'srv.title':'Konsularische Dienste','srv.more':'Mehr →',
    'srv.passport':'Reisepass','srv.passport.sub':'Antrag & Verlängerung',
    'srv.visa':'Visum','srv.visa.sub':'Tourismus, Geschäft, Transit',
    'srv.civil':'Standesamt','srv.civil.sub':'Urkunden & Transkriptionen',
    'srv.legal':'Beglaubigung','srv.legal.sub':'Offizielle Dokumente',
    'srv.cert':'Bescheinigungen','srv.cert.sub':'Leben, Wohnsitz, Staatsangehörigkeit',
    'srv.wa':'WhatsApp','srv.wa.sub':'Direktkontakt',

    /* ── Index — Infos pratiques ── */
    'badge.contact':'Kontakt',
    'info.practical':'Praktische Informationen',
    'info.contact.title':'Uns kontaktieren',
    'info.address.label':'Adresse',
    'info.phone.label':'Telefon',
    'info.email.label':'E-Mail',
    'info.emergency.label':'Notfall 24/7',

    /* ── Index — Pays ── */
    'badge.jurisdiction':'Zuständigkeit',
    'pays.title':'Diplomatischer Amtsbereich',
    'pays.sub':'8 Länder in Mitteleuropa und dem Balkan',
    'pays.at':'Österreich','pays.hu':'Ungarn','pays.si':'Slowenien',
    'pays.sk':'Slowakei','pays.hr':'Kroatien','pays.rs':'Serbien',
    'pays.ro':'Rumänien','pays.ba':'Bosnien',

    /* ── Index — Actualités ── */
    'badge.news':'Aktuelles',
    'actu.title':'Informationen & Ankündigungen',
    'actu.tag1':'Wirtschaftsmission',
    'actu.h3':'Besuch des Präsidenten des Wirtschafts-, Sozial-, Umwelt- und Kulturrats',
    'actu.p1':'Wirtschaftsmission zur Stärkung der Beziehungen zwischen der Elfenbeinküste und Mitteleuropa.',
    'actu.date1':'02. Juni 2025',
    'actu.month1':'Mai',
    'news1.title':'Neues Reisepassantragsformular',
    'news1.desc':'Aktualisierung des biometrischen Formulars.',
    'news2.title':'Schließung — Tag der Arbeit',
    'news2.desc':'Geschlossen am 1. Mai 2025.',

    /* ── CTA ── */
    'cta.title':'Konsularische Hilfe benötigt?',
    'cta.desc':'Einreichung und Abholung dienstags bis freitags — nach Terminvereinbarung.',
    'cta.btn':'Termin vereinbaren',
    'cta.call':'+43 1 581007610',

    /* ── Services page ── */
    'srv.breadcrumb':'Dienste',
    'srv.page.h1':'Konsularische Dienste',
    'srv.page.sub':'Alle Ihre offiziellen Verwaltungsangelegenheiten',
    'info.rdv':'Termin erforderlich','info.rdv.sub':'Keine Bearbeitung ohne Termin',
    'info.payment':'Online-Zahlung','info.payment.sub':'Ausschließlich online',
    'info.delay':'Variable Bearbeitungszeiten','info.delay.sub':'Je nach Verfahren',
    'info.file':'Vollständige Unterlagen','info.file.sub':'Alle Dokumente erforderlich',
    'badge.passport':'Reisedokument',
    'srv.passport.title':'Biometrischer Reisepass',
    'srv.pp.new':'Erstantrag','srv.pp.new.sub':'Für Personen ohne Reisepass',
    'srv.pp.renew':'Verlängerung','srv.pp.renew.sub':'Abgelaufener oder zu verlängernder Reisepass',
    'srv.pp.urgent':'Notreisepass','srv.pp.urgent.sub':'Verlust, Diebstahl oder Notfall',
    'srv.fees':'Konsulargebühren',
    'srv.delay.std':'Bearbeitungszeit: 4–8 Wochen',
    'srv.delay.urgent':'Bearbeitungszeit: 24–72 Std.',
    /* Première demande */
    'pp.new.req1':"Originale Geburtsurkunde (max. 3 Monate alt)",
    'pp.new.req2':"Bescheinigung der ivorischen Staatsangehörigkeit",
    'pp.new.req3':"2 Passfotos (weißer Hintergrund, 35×45mm)",
    'pp.new.req4':"Wohnsitznachweis",
    /* Renouvellement */
    'pp.renew.req1':"Originaler alter Reisepass",
    'pp.renew.req2':"Geburtsurkunde (max. 3 Monate alt)",
    'pp.renew.req3':"2 aktuelle Passfotos",
    /* Urgence */
    'pp.urgent.req1':"Verlust-/Diebstahlmeldung (Polizei)",
    'pp.urgent.req2':"Originale Geburtsurkunde",
    'pp.urgent.req3':"Nachweis der Dringlichkeit",
    /* Visa touristique */
    'visa.tourist.req1':"Gültiger Reisepass (mind. 6 Monate)",
    'visa.tourist.req2':"Hin- und Rückflugticket",
    'visa.tourist.req3':"Unterkunftsnachweis",
    'visa.tourist.req4':"Reiseversicherung",
    /* Visa affaires */
    'visa.business.req1':"Gültiger Reisepass",
    'visa.business.req2':"Einladungsschreiben eines ivorischen Unternehmens",
    'visa.business.req3':"Handelsregisterauszug",
    'badge.visa':'Einreisevisum',
    'srv.visa.title':'Visum für die Elfenbeinküste',
    'srv.visa.tourist':'Touristenvisum','srv.visa.tourist.sub':'Aufenthalt bis zu 90 Tagen',
    'srv.visa.business':'Geschäftsvisum','srv.visa.business.sub':'Berufliche Tätigkeiten',
    'srv.visa.fees':'Visumgebühren',
    'srv.delay.visa':'Bearbeitungszeit: 5–10 Werktage',
    'badge.civil':'Standesamt',
    'srv.civil.title':'Personenstandsurkunden',
    'srv.civil.online':'Verfügbare Urkunden','srv.civil.online.sub':'Klicken für Online-Zahlung',
    'civil.act.death':'Sterbeurkunde',
    'civil.act.marriage':'Heiratsurkunde',
    'civil.act.admin':'Verwaltungsbescheinigung',
    'civil.act.id':'Konsularischer Personalausweis',
    'civil.act.wed':'Eheschließung',
    'civil.act.life':'Lebensbescheinigung',
    'civil.act.birth':'Geburtsurkunde (Auszug)',
    'civil.act.pass':'Freiwilliger Reiseausweis',
    'civil.act.legal.admin':'Beglaubigung Verwaltungsdok.',
    'civil.act.legal.co':'Beglaubigung für Unternehmen',
    'civil.act.transcription':'Transkription Personenstandsurkunden',
    'badge.cert':'Bescheinigungen',
    'srv.cert.title':'Bescheinigungen & Nachweise',
    'srv.cert.online':'Konsularbescheinigungen','srv.cert.online.sub':'Online-Zahlung',
    'cert.life':'Lebensbescheinigung',
    'cert.single':'Ledigenzeugnis',
    'cert.residence':'Wohnsitzbescheinigung',
    'cert.nationality':'Staatsangehörigkeitsbescheinigung',
    'cert.custom':'Gewohnheitsrechtsbescheinigung',
    'cert.proxy':'Vollmacht',
    'badge.faq':'FAQ',
    'srv.faq.title':'Häufige Fragen',
    'faq1.q':'Ist ein Termin erforderlich?',
    'faq1.a':'Ja, ein Termin ist für alle Einreichungen erforderlich. Kontaktieren Sie uns telefonisch oder per E-Mail.',
    'faq2.q':'Wie lange dauert der Reisepass?',
    'faq2.a':'Im Allgemeinen 4 bis 8 Wochen. Im Notfall: 24 bis 72 Stunden.',
    'faq3.q':'Ich wohne in Ungarn, kann ich nach Wien kommen?',
    'faq3.a':'Ja. Die Botschaft ist für 8 Länder zuständig: Österreich, Ungarn, Slowenien, Slowakei, Kroatien, Serbien, Rumänien und Bosnien-Herzegowina.',
    'srv.cta.title':'Bereit anzufangen?',
    'srv.cta.desc':'Vereinbaren Sie einen Termin oder zahlen Sie Ihre Konsulargebühren online.',
    'btn.rdv':'Termin vereinbaren','btn.call':'Anrufen',

    /* ── Ambassade page ── */
    'amb.breadcrumb':'Botschaft',
    'amb.h1':'Die Botschaft der Elfenbeinküste',
    'amb.sub':'Offizielle Vertretung in Österreich von Wien aus',
    'amb.stat.countries':'Länder im Amtsbereich',
    'amb.stat.conv':'Wiener Konvention',
    'amb.stat.ci':'Elfenbeinküste',
    'amb.stat.host':'Gastland',
    'badge.mission':'Unsere Mission',
    'amb.mission.title':'Diplomatische & konsulare Mission',
    'amb.mission.p1':'Die Botschaft der Republik Côte d\'Ivoire in Österreich ist die offizielle diplomatische Vertretung der Elfenbeinküste in Wien. Sie verteidigt die ivorischen Interessen, fördert bilaterale Beziehungen und schützt ihre Staatsbürger.',
    'amb.mission.p2':'Gemäß der Wiener Konvention von 1961 erfüllt die Botschaft eine doppelte Aufgabe: diplomatisch und konsular.',
    'badge.direction':'Leitung',
    'amb.title':'Außerordentlicher und Bevollmächtigter Botschafter der Republik Elfenbeinküste in Österreich',
    'amb.p1':'Seine Exzellenz Herr Cissé Yacouba ist seit 2023 bei der Republik Österreich akkreditiert. Er ist auch in Ungarn, Slowenien, der Slowakei, Kroatien, Serbien, Rumänien und Bosnien-Herzegowina akkreditiert.',
    'amb.p2':'Mit einer langen diplomatischen Karriere vertritt Seine Exzellenz die Interessen der Republik Elfenbeinküste und koordiniert alle Dienste der Botschaft.',
    'badge.diplomacy':'Diplomatie',
    'amb.rel.title':'Beziehungen CI — Österreich',
    'rel.bilateral.title':'Bilaterale Zusammenarbeit',
    'rel.bilateral.desc':'Beziehungen auf Basis gegenseitigen Respekts, wirtschaftlicher, kultureller und bildungsbezogener Zusammenarbeit.',
    'rel.trade.title':'Handelsbeziehungen',
    'rel.trade.desc':'Die CI exportiert Kakao, Kaffee und Rohstoffe. Österreich ist Partner in Industrie und Dienstleistungen.',
    'rel.academic.title':'Akademische Zusammenarbeit',
    'rel.academic.desc':'Universitätsaustausch und Stipendienprogramme für ivorische Studenten.',
    'rel.intl.title':'Internationale Organisationen',
    'rel.intl.desc':'Wien beherbergt UNIDO, IAEA, UNODC. Die Botschaft koordiniert die ivorische Teilnahme.',
    'badge.ci':'Die Elfenbeinküste',
    'ci.title':'Die Elfenbeinküste entdecken',
    'ci.area':'Fläche','ci.pop':'Bevölkerung',
    'ci.indep':'Unabhängigkeit','ci.capital':'Hauptstadt',
    'amb.cta.title':'Brauchen Sie einen Dienst?',
    'amb.cta.desc':'Unser Team ist montags bis freitags verfügbar.',
    'amb.cta.btn1':'Dienste anzeigen','amb.cta.btn2':'Uns kontaktieren',

    /* ── Contact page ── */
    'contact.breadcrumb':'Kontakt',
    'contact.h1':'Kontakt & Öffnungszeiten',
    'contact.sub':'Kontaktdaten und Öffnungszeiten des Konsulardienstes',
    'contact.phone.label':'Telefon','contact.email.label':'E-Mail',
    'contact.address.label':'Adresse','contact.emergency.label':'Notfall',
    'contact.address.val':'1190 Wien, 3. Etage',
    'badge.hours':'Konsularische Öffnungszeiten',
    'contact.hours.title':'Öffnungszeiten',
    'contact.hours.sub':'Nur nach Terminvereinbarung',
    'table.day':'Tag','table.counter':'Schalter',
    'contact.holidays':'Feiertage (Auszug)',
    'holiday.newyear':'Neujahr','holiday.labor':'Tag der Arbeit',
    'holiday.ci':'Nationalfeiertag CI','holiday.at':'Nationalfeiertag AT',
    'badge.access':'Anfahrt',
    'contact.addr.title':'Adresse',
    'contact.floor':'3. Etage — 1190 Wien, Österreich',
    'contact.metro':'U-Bahn','contact.metro.val':'U4 — Haltestelle Heiligenstadt',
    'contact.bus':'Bus','contact.bus.val':'Linie 35A — Haltestelle Michael-Neumann-Gasse',
    'contact.maps':'In Google Maps öffnen →',
    'badge.form':'Nachricht schreiben',
    'contact.form.title':'Kontaktformular',
    'form.firstname':'Vorname','form.lastname':'Nachname','form.email':'E-Mail',
    'form.phone':'Telefon','form.country':'Wohnsitzland',
    'form.country.select':'— Auswählen —',
    'form.subject':'Betreff','form.subject.select':'— Art der Anfrage —',
    'form.rdv':'Terminvereinbarung','form.passport':'Reisepass','form.visa':'Visum',
    'form.civil':'Standesamt','form.emergency':'Konsularnotfall',
    'form.message':'Nachricht','form.placeholder':'Beschreiben Sie Ihr Anliegen...',
    'form.submit':'Absenden →',
    'contact.urgency.title':'Konsularische Notfälle',
    'contact.urgency.text':'Im Notfall außerhalb der Öffnungszeiten (Passverlust, Todesfall, Krankenhausaufenthalt, Verhaftung) ist unser Bereitschaftsdienst 24/7 erreichbar.',

    /* ── Annonces page ── */
    'annonces.breadcrumb':'Ankündigungen',
    'annonces.h1':'Informationen & Ankündigungen',
    'annonces.sub':'Offizielle Hinweise, Schließungen, Veranstaltungen und Mitteilungen',
    'annonces.pinned':'Angeheftet — Dringend',
    'annonces.pin.title':'Schließung — Nationalfeiertag der Elfenbeinküste',
    'annonces.pin.text':'Die Botschaft ist am <strong>Montag, 7. August 2025</strong> zum Nationalfeiertag geschlossen (65. Jahrestag). Wiederaufnahme am Dienstag, 8. August um 09:30 Uhr.',
    'annonces.pin.date':'Veröffentlicht am 10. Juli 2025',
    'filter.all':'Alle','filter.urgent':'Dringlich',
    'filter.admin':'Verwaltung','filter.event':'Veranstaltungen',
    'filter.communique':'Mitteilungen',
    /* Catégories */
    'cat.urgent':'Dringend','cat.admin':'Verwaltung',
    'cat.event':'Veranstaltung','cat.communique':'Mitteilung',
    /* Annonce 1 */
    'ann1.date':'15. Juli 2025',
    'ann1.title':'Störung — Renovierungsarbeiten',
    'ann1.text':'Dienste vom <strong>21. bis 25. Juli</strong> gestört. Einreichungen nur nach Terminvereinbarung.',
    'btn.rdv.short':'Termin buchen','btn.write':'Schreiben',
    /* Annonce 2 */
    'ann2.date':'1. Juli 2025',
    'ann2.title':'Neue Konsulargebühren — 1. August 2025',
    'ann2.text':'Der neue Gebührentarif tritt am <strong>1. August 2025</strong> in Kraft.',
    'btn.download':'PDF herunterladen','btn.services':'Dienste',
    /* Annonce 3 */
    'ann3.date':'20. Juni 2025',
    'ann3.title':'Konsulartag Budapest — 12. Sept.',
    'ann3.text':'Verwaltungsangelegenheiten vor Ort in Budapest. Anmeldung bis <strong>29. August 2025</strong>.',
    'btn.register':'Anmelden','btn.programme':'Programm',
    /* Annonce 4 */
    'ann4.date':'5. Juni 2025',
    'ann4.title':'Erinnerung — Erforderliche Dokumente für den Reisepass',
    'ann4.text':'Alter Reisepass, beglaubigte Geburtsurkunde, 2 Fotos, Wohnsitznachweis. Unvollständige Akten werden zurückgegeben.',
    'btn.procedure':'Vollständiges Verfahren',
    /* Annonce 5 */
    'ann5.date':'15. Mai 2025',
    'ann5.title':'Übergabe des Beglaubigungsschreibens',
    'ann5.text':'S.E. Herr Cissé Yacouba hat dem österreichischen Bundespräsidenten sein Beglaubigungsschreiben im Palais Hofburg überreicht.',
    'btn.read':'Mitteilung lesen',
    'annonce.subscribe.title':'Ankündigungen erhalten',
    'annonce.subscribe.desc':'Melden Sie sich an, um über neue wichtige Informationen benachrichtigt zu werden.',
    'annonce.subscribe.placeholder':'ihre@email.com',
    'annonce.subscribe.btn':'OK →',
    'annonce.follow':'Folgen Sie uns',
    'annonce.empty':'Keine Ankündigung in dieser Kategorie.',

    /* ── Days ── */
    'day.mon':'Montag','day.tue':'Dienstag','day.wed':'Mittwoch','day.thu':'Donnerstag',
    'day.fri':'Freitag','day.sat':'Samstag','day.sun':'Sonntag','day.closed':'Geschlossen',
    'hours.val':'09:30 – 16:00 Uhr',
    'hours.depot':'Akteneinsendung',
    'hours.retrait':'Aktenabholung',
    'hours.rdv':'(nach Terminvereinbarung)',
    'hours.days':'Dienstag – Freitag',
    'hours.depot.time':'09:00 – 14:00',
    'hours.retrait.time':'14:00 – 16:00',
    'hours.closed.days':'Mo. · Sa. · So.',
  },

  en: {
    /* ── Navigation & chrome ── */
    'nav.home':'Home','nav.embassy':'Embassy','nav.services':'Services',
    'nav.annonces':'Announcements','nav.contact':'Contact',
    'logo.name':"Embassy of Côte d'Ivoire",
    'logo.sub':'Vienna, Austria',
    'footer.copy':"© 2025 Embassy of the Republic of Côte d'Ivoire in Austria",
    'footer.links.home':'Home','footer.links.embassy':'Embassy',
    'footer.links.services':'Services','footer.links.annonces':'Announcements',
    'footer.links.contact':'Contact',

    /* ── Top bar ── */
    'topbar.address':'Michael-Neumann-Gasse 2 - 3rd Floor, 1190 Vienna',
    'topbar.hours':'Mon–Fri : 9:30 AM – 4:00 PM',

    /* ── Alert ── */
    'alert.text':'Appointment required for all procedures.',
    'alert.link':'Book now →',

    /* ── Hero ── */
    'hero.tag':'Consular Service',
    'hero.h1':"Welcome to the Embassy of<br><em>Côte d'Ivoire</em>",
    'hero.desc':"Your consular services from Vienna, covering 8 Central European countries.",
    'hero.btn1':'Our Services','hero.btn2':'Book Appointment',
    'hero.countries':'8 countries served',
    'hero.floor':'1190 Vienna, 3rd Floor',

    /* ── Index — Services grid ── */
    'badge.services':'Our Services',
    'srv.title':'Consular Services','srv.more':'View →',
    'srv.passport':'Passport','srv.passport.sub':'Application & renewal',
    'srv.visa':'Visa','srv.visa.sub':'Tourism, business, transit',
    'srv.civil':'Civil Status','srv.civil.sub':'Acts & transcriptions',
    'srv.legal':'Legalisation','srv.legal.sub':'Official documents',
    'srv.cert':'Certificates','srv.cert.sub':'Life, residence, nationality',
    'srv.wa':'WhatsApp','srv.wa.sub':'Direct contact',

    /* ── Index — Infos pratiques ── */
    'badge.contact':'Contact',
    'info.practical':'Practical Information',
    'info.contact.title':'Contact us',
    'info.address.label':'Address',
    'info.phone.label':'Phone',
    'info.email.label':'Email',
    'info.emergency.label':'Emergency 24/7',

    /* ── Index — Pays ── */
    'badge.jurisdiction':'Jurisdiction',
    'pays.title':'Diplomatic Constituency',
    'pays.sub':'8 countries in Central Europe and the Balkans',
    'pays.at':'Austria','pays.hu':'Hungary','pays.si':'Slovenia',
    'pays.sk':'Slovakia','pays.hr':'Croatia','pays.rs':'Serbia',
    'pays.ro':'Romania','pays.ba':'Bosnia',

    /* ── Index — Actualités ── */
    'badge.news':'News',
    'actu.title':'Information & Announcements',
    'actu.tag1':'Economic mission',
    'actu.h3':"Visit of the President of the Economic, Social, Environmental and Cultural Council",
    'actu.p1':"Economic mission to strengthen ties between Côte d'Ivoire and Central Europe.",
    'actu.date1':'02 June 2025',
    'actu.month1':'May',
    'news1.title':'New passport application form',
    'news1.desc':'Update of the biometric application form.',
    'news2.title':'Closure — Labour Day',
    'news2.desc':'Closed on 1 May 2025.',

    /* ── CTA ── */
    'cta.title':'Need consular assistance?',
    'cta.desc':'File submission and collection Tuesday to Friday — by appointment.',
    'cta.btn':'Book an Appointment',
    'cta.call':'+43 1 581007610',

    /* ── Services page ── */
    'srv.breadcrumb':'Services',
    'srv.page.h1':'Consular Services',
    'srv.page.sub':'All your official administrative procedures',
    'info.rdv':'Appointment required','info.rdv.sub':'No procedure without appointment',
    'info.payment':'Online payment','info.payment.sub':'Online only',
    'info.delay':'Variable delays','info.delay.sub':'Depending on procedure',
    'info.file':'Complete file','info.file.sub':'All documents required',
    'badge.passport':'Travel document',
    'srv.passport.title':'Biometric Passport',
    'srv.pp.new':'First application','srv.pp.new.sub':'For persons without a passport',
    'srv.pp.renew':'Renewal','srv.pp.renew.sub':'Expired or to-be-renewed passport',
    'srv.pp.urgent':'Emergency passport','srv.pp.urgent.sub':'Loss, theft or emergency',
    'srv.fees':'Consular fees',
    'srv.delay.std':'Processing time: 4 to 8 weeks',
    'srv.delay.urgent':'Processing time: 24 to 72h',
    /* Première demande */
    'pp.new.req1':"Original birth certificate (less than 3 months old)",
    'pp.new.req2':"Ivorian nationality certificate",
    'pp.new.req3':"2 identity photos (white background, 35×45mm)",
    'pp.new.req4':"Proof of residence",
    /* Renouvellement */
    'pp.renew.req1':"Original old passport",
    'pp.renew.req2':"Birth certificate (less than 3 months old)",
    'pp.renew.req3':"2 recent identity photos",
    /* Urgence */
    'pp.urgent.req1':"Loss/theft report (police)",
    'pp.urgent.req2':"Original birth certificate",
    'pp.urgent.req3':"Proof of urgency",
    /* Visa touristique */
    'visa.tourist.req1':"Valid passport (min. 6 months)",
    'visa.tourist.req2':"Return flight ticket",
    'visa.tourist.req3':"Proof of accommodation",
    'visa.tourist.req4':"Travel insurance",
    /* Visa affaires */
    'visa.business.req1':"Valid passport",
    'visa.business.req2':"Invitation letter from an Ivorian company",
    'visa.business.req3':"Company registration extract",
    'badge.visa':'Entry visa',
    'srv.visa.title':"Visa for Côte d'Ivoire",
    'srv.visa.tourist':'Tourist visa','srv.visa.tourist.sub':'Stay up to 90 days',
    'srv.visa.business':'Business visa','srv.visa.business.sub':'Professional activities',
    'srv.visa.fees':'Visa fees',
    'srv.delay.visa':'Processing time: 5 to 10 business days',
    'badge.civil':'Civil Status',
    'srv.civil.title':'Civil records',
    'srv.civil.online':'Available documents','srv.civil.online.sub':'Click to pay online',
    'civil.act.death':'Death certificate',
    'civil.act.marriage':'Marriage certificate',
    'civil.act.admin':'Administrative attestation',
    'civil.act.id':'Consular identity card',
    'civil.act.wed':'Wedding ceremony',
    'civil.act.life':'Certificate of life',
    'civil.act.birth':'Birth certificate extract',
    'civil.act.pass':'Voluntary travel document',
    'civil.act.legal.admin':'Legalisation admin. documents',
    'civil.act.legal.co':'Legalisation for companies',
    'civil.act.transcription':'Transcription of civil records',
    'badge.cert':'Certificates',
    'srv.cert.title':'Certificates & Attestations',
    'srv.cert.online':'Consular certificates','srv.cert.online.sub':'Online payment',
    'cert.life':'Certificate of life',
    'cert.single':'Certificate of single status',
    'cert.residence':'Certificate of residence',
    'cert.nationality':'Certificate of nationality',
    'cert.custom':'Certificate of customary law',
    'cert.proxy':'Power of attorney',
    'badge.faq':'FAQ',
    'srv.faq.title':'Frequently asked questions',
    'faq1.q':'Is an appointment required?',
    'faq1.a':'Yes, booking an appointment is mandatory for all file submissions. Contact us by phone or email.',
    'faq2.q':'Passport processing time?',
    'faq2.a':'Generally 4 to 8 weeks. Emergency: 24 to 72 hours depending on the situation.',
    'faq3.q':'I live in Hungary, can I come to Vienna?',
    'faq3.a':'Yes. The Embassy covers 8 countries: Austria, Hungary, Slovenia, Slovakia, Croatia, Serbia, Romania and Bosnia-Herzegovina.',
    'srv.cta.title':'Ready to get started?',
    'srv.cta.desc':'Book an appointment or pay your consular fees online.',
    'btn.rdv':'Book an appointment','btn.call':'Call',

    /* ── Ambassade page ── */
    'amb.breadcrumb':'Embassy',
    'amb.h1':"The Embassy of Côte d'Ivoire",
    'amb.sub':'Official representation in Austria from Vienna',
    'amb.stat.countries':'countries in the constituency',
    'amb.stat.conv':'Vienna Convention',
    'amb.stat.ci':"Côte d'Ivoire",
    'amb.stat.host':'Host country',
    'badge.mission':'Our Mission',
    'amb.mission.title':'Diplomatic & Consular Mission',
    'amb.mission.p1':"The Embassy of the Republic of Côte d'Ivoire in Austria is the official diplomatic representation of Côte d'Ivoire in Vienna. It defends Ivorian interests, develops bilateral relations and protects its nationals.",
    'amb.mission.p2':"Established under the Vienna Convention of 1961, the Embassy fulfils a dual mission: diplomatic and consular.",
    'badge.direction':'Leadership',
    'amb.title':"Ambassador Extraordinary and Plenipotentiary of the Republic of Côte d'Ivoire in Austria",
    'amb.p1':"His Excellency Mr Cissé Yacouba has been accredited to the Republic of Austria since 2023. He is also accredited to Hungary, Slovenia, Slovakia, Croatia, Serbia, Romania and Bosnia-Herzegovina.",
    'amb.p2':"With a long diplomatic career, His Excellency represents the interests of the Ivorian Republic and coordinates all the Embassy's services.",
    'badge.diplomacy':'Diplomacy',
    'amb.rel.title':'CI — Austria Relations',
    'rel.bilateral.title':'Bilateral cooperation',
    'rel.bilateral.desc':'Relations based on mutual respect, economic, cultural and educational cooperation.',
    'rel.trade.title':'Trade relations',
    'rel.trade.desc':"CI exports cocoa, coffee and raw materials. Austria is a partner in industry and services.",
    'rel.academic.title':'Academic cooperation',
    'rel.academic.desc':'University exchanges and scholarship programmes for Ivorian students.',
    'rel.intl.title':'International organisations',
    'rel.intl.desc':'Vienna hosts UNIDO, IAEA, UNODC. The Embassy coordinates Ivorian participation.',
    'badge.ci':"Côte d'Ivoire",
    'ci.title':"Discover Côte d'Ivoire",
    'ci.area':'Area','ci.pop':'Population',
    'ci.indep':'Independence','ci.capital':'Capital',
    'amb.cta.title':'Need a service?',
    'amb.cta.desc':'Our team is available Monday to Friday.',
    'amb.cta.btn1':'View services','amb.cta.btn2':'Contact us',

    /* ── Contact page ── */
    'contact.breadcrumb':'Contact',
    'contact.h1':'Contact & Hours',
    'contact.sub':'Contact details and hours of the consular service',
    'contact.phone.label':'Phone','contact.email.label':'Email',
    'contact.address.label':'Address','contact.emergency.label':'Emergencies',
    'contact.address.val':'1190 Vienna, 3rd Floor',
    'badge.hours':'Consular Hours',
    'contact.hours.title':'Opening hours',
    'contact.hours.sub':'By appointment only',
    'table.day':'Day','table.counter':'Counter',
    'contact.holidays':'Public holidays (selection)',
    'holiday.newyear':'New Year\'s Day','holiday.labor':'Labour Day',
    'holiday.ci':'National Day CI','holiday.at':'National Day AT',
    'badge.access':'Getting here',
    'contact.addr.title':'Address',
    'contact.floor':'3rd Floor — 1190 Vienna, Austria',
    'contact.metro':'Metro','contact.metro.val':'U4 — Heiligenstadt station',
    'contact.bus':'Bus','contact.bus.val':'Line 35A — Michael-Neumann-Gasse stop',
    'contact.maps':'Open in Google Maps →',
    'badge.form':'Send a message',
    'contact.form.title':'Contact form',
    'form.firstname':'First name','form.lastname':'Last name','form.email':'Email',
    'form.phone':'Phone','form.country':'Country of residence',
    'form.country.select':'— Select —',
    'form.subject':'Subject','form.subject.select':'— Type of request —',
    'form.rdv':'Appointment booking','form.passport':'Passport','form.visa':'Visa',
    'form.civil':'Civil status','form.emergency':'Consular emergency',
    'form.message':'Message','form.placeholder':'Describe your request...',
    'form.submit':'Send →',
    'contact.urgency.title':'Consular emergencies',
    'contact.urgency.text':'In case of emergency outside opening hours (lost passport, death, hospitalisation, arrest), our on-call service is available 24/7.',

    /* ── Annonces page ── */
    'annonces.breadcrumb':'Announcements',
    'annonces.h1':'Information & Announcements',
    'annonces.sub':'Official notices, closures, events and press releases',
    'annonces.pinned':'Pinned — Urgent',
    'annonces.pin.title':"Closure — National Day of Côte d'Ivoire",
    'annonces.pin.text':'The Embassy will be <strong>closed on Monday 7 August 2025</strong> for the National Day (65th anniversary). Services resume Tuesday 8 August at 9:30 AM.',
    'annonces.pin.date':'Published 10 July 2025',
    'filter.all':'All','filter.urgent':'Urgent',
    'filter.admin':'Administrative','filter.event':'Events',
    'filter.communique':'Press releases',
    /* Categories */
    'cat.urgent':'Urgent','cat.admin':'Administrative',
    'cat.event':'Event','cat.communique':'Press release',
    /* Annonce 1 */
    'ann1.date':'15 July 2025',
    'ann1.title':'Disruption — Renovation works',
    'ann1.text':'Services disrupted from <strong>21 to 25 July</strong>. File submissions by appointment only.',
    'btn.rdv.short':'Book appointment','btn.write':'Write',
    /* Annonce 2 */
    'ann2.date':'1 July 2025',
    'ann2.title':'New consular fees — 1 August 2025',
    'ann2.text':'The new consular fee schedule takes effect on <strong>1 August 2025</strong>.',
    'btn.download':'Download PDF','btn.services':'Services',
    /* Annonce 3 */
    'ann3.date':'20 June 2025',
    'ann3.title':'Mobile Consular Day — Budapest, 12 Sept.',
    'ann3.text':'Administrative procedures on-site in Budapest. Registration before <strong>29 August 2025</strong>.',
    'btn.register':'Register','btn.programme':'Programme',
    /* Annonce 4 */
    'ann4.date':'5 June 2025',
    'ann4.title':'Reminder — Documents required for passport',
    'ann4.text':'Old passport, legalised birth certificate, 2 photos, proof of address. Incomplete files will be returned.',
    'btn.procedure':'Full procedure',
    /* Annonce 5 */
    'ann5.date':'15 May 2025',
    'ann5.title':'Presentation of credentials',
    'ann5.text':'H.E. Mr Cissé Yacouba presented his credentials to the Austrian Federal President at the Hofburg Palace.',
    'btn.read':'Read the press release',
    'annonce.subscribe.title':'Receive announcements',
    'annonce.subscribe.desc':'Sign up to be notified of new important information.',
    'annonce.subscribe.placeholder':'your@email.com',
    'annonce.subscribe.btn':'OK →',
    'annonce.follow':'Follow us',
    'annonce.empty':'No announcement in this category.',

    /* ── Days ── */
    'day.mon':'Monday','day.tue':'Tuesday','day.wed':'Wednesday','day.thu':'Thursday',
    'day.fri':'Friday','day.sat':'Saturday','day.sun':'Sunday','day.closed':'Closed',
    'hours.val':'9:30 AM – 4:00 PM',
    'hours.depot':'File submission',
    'hours.retrait':'File collection',
    'hours.rdv':'(by appointment)',
    'hours.days':'Tuesday – Friday',
    'hours.depot.time':'9:00 AM – 2:00 PM',
    'hours.retrait.time':'2:00 PM – 4:00 PM',
    'hours.closed.days':'Mon. · Sat. · Sun.',
  }
};

/* ── i18n placeholders ── */
function setLang(lang) {
  if (!T[lang]) return;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (T[lang][k] !== undefined) el.textContent = T[lang][k];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const k = el.dataset.i18nHtml;
    if (T[lang][k] !== undefined) el.innerHTML = T[lang][k];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const k = el.dataset.i18nPh;
    if (T[lang][k] !== undefined) el.placeholder = T[lang][k];
  });
  document.querySelectorAll('.m-lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
  localStorage.setItem('ambaci-mobile-lang', lang);
}

(function init() {
  const lang = localStorage.getItem('ambaci-mobile-lang') || 'fr';
  setLang(lang);

  /* Accordion */
  document.querySelectorAll('.m-acc-trigger').forEach(t => {
    t.addEventListener('click', () => {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      const open = t.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.m-acc-trigger').forEach(x => {
        x.setAttribute('aria-expanded','false');
        const p = document.getElementById(x.getAttribute('aria-controls'));
        if (p) p.classList.remove('open');
      });
      if (!open && panel) { t.setAttribute('aria-expanded','true'); panel.classList.add('open'); }
    });
  });

  /* Alert close */
  const alertClose = document.getElementById('m-alert-close');
  const alertBanner = document.getElementById('m-alert');
  if (alertClose && alertBanner) {
    alertClose.addEventListener('click', () => { alertBanner.style.display = 'none'; });
  }

  /* Highlight today in schedule table */
  const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const today = days[new Date().getDay()];
  document.querySelectorAll('.m-table tbody tr').forEach(row => {
    if (row.querySelector('td')?.textContent.trim() === today) row.classList.add('today');
  });

  /* Contact form */
  const form = document.getElementById('m-contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true; btn.textContent = '…';
      setTimeout(() => {
        btn.textContent = '✓'; btn.style.background = '#009A44';
        form.reset();
        setTimeout(() => { btn.disabled=false; btn.textContent='→'; btn.style.background=''; }, 3500);
      }, 1400);
    });
  }
})();
