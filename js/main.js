'use strict';

/* ============================================================
   TRADUCTIONS — FR / DE / EN
   ============================================================ */
const translations = {

  /* ==================== FRANÇAIS ==================== */
  fr: {
    'topbar.address':'Michael-Neumann-Gasse 2 - 3ème Etage, 1190 Wien',
    'topbar.hours':  'Lun–Ven : 09h30 – 16h00',
    'nav.home':      'Accueil',
    'nav.embassy':   "L'Ambassade",
    'nav.services':  'Services consulaires',
    'nav.contact':   'Contact & Horaires',
    'alert.text':    'La prise de rendez-vous est obligatoire pour toute démarche consulaire.',
    'alert.link':    'Prendre rendez-vous →',
    'hero.eyebrow':  'Service Consulaire',
    'hero.h1':       "Bienvenue à l'Ambassade de<br><em>Côte d'Ivoire</em> en Autriche",
    'hero.desc':     "Nous accompagnons les ressortissants ivoiriens résidant en Europe centrale dans toutes leurs démarches administratives et consulaires depuis Vienne.",
    'hero.btn1':     'Nos services consulaires',
    'hero.btn2':     'Prendre rendez-vous',
    'hero.card.title':'Informations pratiques',
    'hero.addr.lbl': 'Adresse',
    'hero.hours.lbl':'Horaires générales Ambassade',
    'hero.hours.val':'Lun – Ven : 09h30 – 16h00',
    'hero.tel.lbl':  'Téléphone',
    'hero.jurid.lbl':"Juridiction consulaire",
    'hero.jurid.val':"9 pays d'Europe centrale",
    'srv.badge':     'Nos services',
    'srv.title':     'Services consulaires disponibles',
    'srv.subtitle':  "L'ensemble de nos services s'adresse aux ressortissants ivoiriens et aux citoyens étrangers souhaitant visiter la Côte d'Ivoire.",
    'srv.passport':  'Passeport',
    'srv.passport.d':'Demande, renouvellement et urgence de passeport biométrique pour les ressortissants ivoiriens.',
    'srv.visa':      "Visa d'entrée",
    'srv.visa.d':    "Visas touristiques, d'affaires et de transit pour les ressortissants étrangers souhaitant entrer en Côte d'Ivoire.",
    'srv.civil':     'État civil',
    'srv.civil.d':   "Actes de naissance, de mariage, décès, transcriptions et extraits d'actes d'état civil.",
    'srv.legal':     'Légalisation',
    'srv.legal.d':   "Légalisation et apostille de documents officiels, authentification de signatures.",
    'srv.cnie':      'CNI',
    'srv.cnie.d':    "Carte nationale d'identité électronique pour les ressortissants ivoiriens en Europe centrale.",
    'srv.cert':      'Certificats & Attestations',
    'srv.cert.d':    "Certificats de vie, de résidence, de nationalité, de coutume et autres attestations officielles.",
    'srv.more':      'En savoir plus',
    'home.hours.badge': 'Horaires Ambassade',
    'info.badge':    'Horaires consulaires',
    'info.title':    "Heures d'ouverture",
    'info.subtitle': 'Le service consulaire reçoit sur rendez-vous uniquement.',
    'info.rdv':      'Prendre rendez-vous →',
    'info.ct.title': 'Nous contacter',
    'info.ct.sub':   'Pour toute question ou urgence consulaire',
    'info.addr.lbl': 'Adresse',
    'info.tel.lbl':  'Téléphone',
    'info.email.lbl':'Email consulaire',
    'info.urg.lbl':  'Urgences (hors heures)',
    'info.metro.lbl':'Accès',
    'pays.badge':    'Circonscription',
    'pays.title':    'Circonscription diplomatique',
    'pays.subtitle': "L'Ambassade de Côte d'Ivoire à Vienne exerce sa circonscription diplomatique sur 9 pays d'Europe centrale et des Balkans.",
    'actu.badge':    'Actualités',
    'actu.title':    'Informations & Annonces',
    'actu.all':      'Toutes les actualités →',
    'cta.title':     "Besoin d'assistance consulaire ?",
    'cta.desc':      "Notre équipe est à votre disposition pour vous accompagner dans toutes vos démarches administratives. Prenez rendez-vous en ligne ou contactez-nous directement.",
    'cta.btn1':      'Prendre rendez-vous',
    'cta.btn2':      'Consulter les services',
    'footer.desc':   "Ambassade de la République de Côte d'Ivoire en Autriche, desservant 9 pays d'Europe centrale. Service consulaire officiel sous l'autorité du Ministère des Affaires Étrangères.",
    'footer.srv':    'Services', 'footer.info':'Informations', 'footer.contact':'Contact',
    'footer.legal':  'Mentions légales', 'footer.privacy':'Politique de confidentialité',
    'footer.access': 'Accessibilité', 'footer.sitemap':'Plan du site',
    'footer.copy':   '© 2025 Ambassade de la République de Côte d\'Ivoire en Autriche. Tous droits réservés.',
    'footer.link.amb':"→ L'Ambassadeur",
    'logo.name':     "Ambassade de Côte d'Ivoire",
    'logo.subtitle': 'République de Côte d\'Ivoire — Vienne, Autriche',
    'skip.link':     'Aller au contenu principal',
    'alert.important':'Information importante :',
    'table.day':'Jour','table.hours':'Horaires',
    'day.mon':'Lundi','day.tue':'Mardi','day.wed':'Mercredi','day.thu':'Jeudi',
    'day.fri':'Vendredi','day.sat':'Samedi','day.sun':'Dimanche','day.closed':'Fermé',
    'hours.val':'09h30 – 16h00',
    'info.note':'Fermé les jours fériés autrichiens et ivoiriens.',
    'month.jan':'Jan','month.feb':'Fév','month.mar':'Mar','month.apr':'Avr',
    'month.may':'Mai','month.jun':'Jun','month.jul':'Jul','month.aug':'Aoû',
    'month.sep':'Sep','month.oct':'Oct','month.nov':'Nov','month.dec':'Déc',
    'addr.street':'Michael-Neumann-Gasse 2 - 3ème Etage', 'pays.at':'Autriche','pays.at.cap':'Wien (siège)',
    'pays.hu':'Hongrie','pays.si':'Slovénie','pays.sk':'Slovaquie',
    'pays.hr':'Croatie','pays.rs':'Serbie','pays.ro':'Roumanie','pays.ba':'Bosnie-Herzégovine','pays.md':'Moldavie',
    'actu.tag.event':'Événement','actu.tag.info':'Information','actu.tag.mission':'Mission économique',
    'srv.badge.passport':'Document de voyage','srv.badge.visa':"Visa d'entrée",'srv.badge.identity':'Identité',
    'actu.ev1.title':"Mission économique : Visite du Président du Conseil Économique, Social, Environnemental et Culturel",
    'actu.ev1.desc': "L'Ambassade de Côte d'Ivoire à Vienne a accueilli le Président du Conseil Économique, Social, Environnemental et Culturel dans le cadre d'une mission économique visant à renforcer les liens entre la Côte d'Ivoire et l'Europe centrale.",
    'actu.ev1.date': '02 juin 2025',
    'actu.n1.title': 'Nouveau formulaire de demande de passeport',
    'actu.n1.desc':  'Mise à jour du formulaire de demande de passeport biométrique.',
    'actu.n2.title': 'Fermeture exceptionnelle — Fête du Travail',
    'actu.n2.desc':  'Le service consulaire sera fermé le 1er mai 2025 pour la Fête du Travail.',
    'actu.n3.title': 'Campagne de régularisation des ressortissants',
    'actu.n3.desc':  "L'Ambassade organise une journée dédiée à la régularisation des documents.",
    'actu.n4.title': 'Modification des délais de traitement des visas',
    'actu.n4.desc':  'Les délais de traitement des demandes de visa sont désormais de 5 à 10 jours ouvrés.',
    /* Page Services */
    'psrv.h1':       'Services Consulaires',
    'psrv.desc':     "Retrouvez l'ensemble des démarches administratives proposées par le service consulaire de l'Ambassade de Côte d'Ivoire à Vienne.",
    'psrv.appt':     'Rendez-vous obligatoire','psrv.appt.d':'Aucune démarche sans RDV préalable',
    'psrv.delay':    'Délais de traitement',   'psrv.delay.d':'Variables selon la nature du dossier',
    'psrv.pay':      'Paiements uniquement en ligne', 'psrv.pay.d':'Les frais consulaires doivent être réglés en ligne avant votre rendez-vous',
    'psrv.docs':     'Dossier complet requis', 'psrv.docs.d':'Apportez tous les documents nécessaires',
    'psrv.faq.badge':'FAQ', 'psrv.faq.title':'Questions fréquentes',
    'psrv.cta.title':"Prêt à démarrer votre démarche ?",
    'psrv.cta.desc': 'Contactez-nous pour prendre rendez-vous ou obtenir des informations complémentaires sur votre dossier.',
    'psrv.cta.btn1': 'Prendre rendez-vous', 'psrv.cta.btn2':'📞 Appeler maintenant',
    /* Page Contact */
    'pcon.h1':       'Contact & Horaires',
    'pcon.desc':     "Coordonnées complètes et horaires d'ouverture du service consulaire. Toute démarche nécessite un rendez-vous préalable.",
    'pcon.tel.lbl':  'Téléphone',   'pcon.email.lbl':'Email consulaire',
    'pcon.addr.lbl': 'Adresse',     'pcon.urg.lbl':'Urgences consulaires',
    'pcon.urg.sub':  'Disponible 24h/24 pour urgences',
    'pcon.h.badge':  'Horaires consulaires',    'pcon.h.title':"Heures d'ouverture",
    'pcon.a.badge':  'Accès',       'pcon.a.title':'Comment nous trouver',
    'pcon.f.badge':  'Nous écrire', 'pcon.f.title':'Formulaire de contact',
    'pcon.f.desc':   'Pour toute question ou demande de rendez-vous, remplissez ce formulaire. Nous vous répondrons sous 3 à 5 jours ouvrés.',
    'pcon.f.send':   'Envoyer le message →',
    'pcon.table.window':'Guichet consulaire',
    'pcon.urg2.title':'🚨 Urgences consulaires',
    'pcon.urg2.desc': "En cas d'urgence en dehors des heures d'ouverture (perte de passeport, décès, hospitalisation, arrestation), notre service de permanence est disponible 24h/24.",
    /* Page Ambassade */
    'pamb.h1':       "L'Ambassade de Côte d'Ivoire",
    'pamb.desc':     "Représentation officielle de la République de Côte d'Ivoire en Autriche depuis Vienne, assurant les relations diplomatiques et les services consulaires pour 9 pays d'Europe centrale.",
    'pamb.mis.badge':'Notre mission', 'pamb.mis.title':'Mission diplomatique & consulaire',
    'pamb.pays.badge':'Juridiction', 'pamb.pays.title':'Circonscription diplomatique',
    'pamb.pays.sub': "L'Ambassade de Côte d'Ivoire à Vienne couvre la circonscription diplomatique des 9 pays suivants.",
    'pamb.amb.badge':'Direction',    'pamb.rel.badge':'Diplomatie',
    'pamb.rel.title':"Relations Côte d'Ivoire — Autriche",
    'pamb.ci.badge': "La Côte d'Ivoire", 'pamb.ci.title':"Découvrir la Côte d'Ivoire",
    'pamb.mis.p1':   "L'Ambassade de la République de Côte d'Ivoire en Autriche est la représentation diplomatique officielle de la Côte d'Ivoire à Vienne. Elle assure la défense des intérêts ivoiriens, le développement des relations bilatérales et la protection de ses ressortissants.",
    'pamb.mis.p2':   "Établie conformément à la Convention de Vienne sur les relations diplomatiques de 1961, l'Ambassade remplit une double mission : diplomatique (représentation de l'État auprès du pays hôte) et consulaire (assistance aux ressortissants ivoiriens résidant dans sa juridiction).",
    'pamb.mis.p3':   "Au titre de sa compétence territoriale, l'Ambassade couvre 9 pays : l'Autriche, la Hongrie, la Slovénie, la Slovaquie, la Croatie, la Serbie, la Roumanie et la Bosnie-Herzégovine.",
    'pamb.stat.countries':'pays dans la Circonscription diplomatique', 'pamb.stat.conv':'Conv. de Vienne', 'pamb.stat.ci':"Côte d'Ivoire", 'pamb.stat.host':'Pays hôte',
    'pamb.amb.title':"Ambassadeur Extraordinaire et Plénipotentiaire de la République de Côte d'Ivoire en Autriche",
    'pamb.amb.p1':   "Son Excellence Monsieur Cissé Yacouba est accrédité auprès de la République d'Autriche en qualité d'Ambassadeur Extraordinaire et Plénipotentiaire de la République de Côte d'Ivoire. Il est également accrédité auprès de la Hongrie, la Slovénie, la Slovaquie, la Croatie, la Serbie, la Roumanie et la Bosnie-Herzégovine.",
    'pamb.amb.p2':   "Fort d'une longue carrière diplomatique au service de la Côte d'Ivoire, Son Excellence Monsieur Cissé Yacouba représente les intérêts de la République ivoirienne, promeut les relations bilatérales et multilatérales, et coordonne l'ensemble des services de l'Ambassade.",
  },

  /* ==================== DEUTSCH ==================== */
  de: {
    'topbar.address':'Michael-Neumann-Gasse 2 - 3. Stock, 1190 Wien',
    'topbar.hours':  'Mo–Fr : 09:30 – 16:00 Uhr',
    'nav.home':      'Startseite',
    'nav.embassy':   'Die Botschaft',
    'nav.services':  'Konsularische Dienste',
    'nav.contact':   'Kontakt & Öffnungszeiten',
    'alert.text':    'Eine Terminvereinbarung ist für alle konsularischen Angelegenheiten erforderlich.',
    'alert.link':    'Termin vereinbaren →',
    'hero.eyebrow':  'Konsulardienst',
    'hero.h1':       "Willkommen bei der Botschaft der<br><em>Elfenbeinküste</em> in Österreich",
    'hero.desc':     "Wir begleiten ivorische Staatsangehörige in Mitteleuropa bei allen administrativen und konsularischen Angelegenheiten von Wien aus.",
    'hero.btn1':     'Unsere Dienste',
    'hero.btn2':     'Termin vereinbaren',
    'hero.card.title':'Praktische Informationen',
    'hero.addr.lbl': 'Adresse',
    'hero.hours.lbl':'Allgemeine Botschaftszeiten',
    'hero.hours.val':'Mo – Fr : 09:30 – 16:00 Uhr',
    'hero.tel.lbl':  'Telefon',
    'hero.jurid.lbl':'Konsularer Zuständigkeitsbereich',
    'hero.jurid.val':'9 mitteleuropäische Länder',
    'srv.badge':     'Unsere Dienste',
    'srv.title':     'Verfügbare konsularische Dienste',
    'srv.subtitle':  'Alle unsere Dienste richten sich an ivorische Staatsangehörige und ausländische Bürger, die die Elfenbeinküste besuchen möchten.',
    'srv.passport':  'Reisepass',
    'srv.passport.d':'Erstantrag, Verlängerung und Notreisepass für ivorische Staatsangehörige.',
    'srv.visa':      'Einreisevisum',
    'srv.visa.d':    'Touristenvisa, Geschäftsvisa und Transitvisa für ausländische Staatsangehörige.',
    'srv.civil':     'Personenstandswesen',
    'srv.civil.d':   'Geburtsurkunden, Heiratsurkunden, Sterbeurkunden und Abschriften.',
    'srv.legal':     'Beglaubigung',
    'srv.legal.d':   'Beglaubigung offizieller Dokumente, Apostille und Unterschriftsbeglaubigung.',
    'srv.cnie':      'Elektronischer Personalausweis',
    'srv.cnie.d':    'Nationaler elektronischer Personalausweis für ivorische Staatsangehörige in Mitteleuropa.',
    'srv.cert':      'Bescheinigungen & Atteste',
    'srv.cert.d':    'Lebensbescheinigungen, Wohnsitzbescheinigungen, Staatsangehörigkeitsnachweise.',
    'srv.more':      'Mehr erfahren',
    'home.hours.badge': 'Öffnungszeiten der Botschaft',
    'info.badge':    'Konsularische Öffnungszeiten',
    'info.title':    'Öffnungszeiten',
    'info.subtitle': 'Der Konsulardienst empfängt nur nach vorheriger Terminvereinbarung.',
    'info.rdv':      'Termin vereinbaren →',
    'info.ct.title': 'Kontakt aufnehmen',
    'info.ct.sub':   'Für Fragen oder konsularische Notfälle',
    'info.addr.lbl': 'Adresse',     'info.tel.lbl':'Telefon',
    'info.email.lbl':'Konsularische E-Mail', 'info.urg.lbl':'Notfall (außerhalb der Öffnungszeiten)',
    'info.metro.lbl':'Anfahrt',
    'pays.badge':    'Amtsbereich',
    'pays.title':    'Diplomatischer Amtsbereich',
    'pays.subtitle': 'Die Botschaft der Elfenbeinküste in Wien ist für Staatsangehörige zuständig, die in den folgenden 9 Ländern leben.',
    'actu.badge':    'Aktuelles',
    'actu.title':    'Informationen & Ankündigungen',
    'actu.all':      'Alle Nachrichten →',
    'cta.title':     'Benötigen Sie konsularische Hilfe?',
    'cta.desc':      'Unser Team steht Ihnen für alle administrativen Angelegenheiten zur Verfügung. Vereinbaren Sie online einen Termin oder kontaktieren Sie uns direkt.',
    'cta.btn1':      'Termin vereinbaren', 'cta.btn2':'Dienste ansehen',
    'footer.desc':   "Botschaft der Republik Côte d'Ivoire in Österreich, zuständig für 9 mitteleuropäische Länder. Konsulardienst.",
    'footer.srv':    'Dienste', 'footer.info':'Informationen', 'footer.contact':'Kontakt',
    'footer.legal':  'Impressum', 'footer.privacy':'Datenschutz',
    'footer.access': 'Barrierefreiheit', 'footer.sitemap':'Sitemap',
    'footer.copy':   '© 2025 Botschaft der Republik Côte d\'Ivoire in Österreich. Alle Rechte vorbehalten.',
    'footer.link.amb':'→ Der Botschafter',
    'logo.name':     'Botschaft der Elfenbeinküste',
    'logo.subtitle': 'Republik Côte d\'Ivoire — Wien, Österreich',
    'skip.link':     'Zum Hauptinhalt springen',
    'alert.important':'Wichtiger Hinweis:',
    'table.day':'Tag','table.hours':'Öffnungszeiten',
    'day.mon':'Montag','day.tue':'Dienstag','day.wed':'Mittwoch','day.thu':'Donnerstag',
    'day.fri':'Freitag','day.sat':'Samstag','day.sun':'Sonntag','day.closed':'Geschlossen',
    'hours.val':'09:30 – 16:00 Uhr',
    'info.note':'Geschlossen an österreichischen und ivorischen Feiertagen.',
    'month.jan':'Jan','month.feb':'Feb','month.mar':'Mär','month.apr':'Apr',
    'month.may':'Mai','month.jun':'Jun','month.jul':'Jul','month.aug':'Aug',
    'month.sep':'Sep','month.oct':'Okt','month.nov':'Nov','month.dec':'Dez',
    'addr.street':'Michael-Neumann-Gasse 2 - 3. Stock', 'pays.at':'Österreich','pays.at.cap':'Wien (Sitz)',
    'pays.hu':'Ungarn','pays.si':'Slowenien','pays.sk':'Slowakei',
    'pays.hr':'Kroatien','pays.rs':'Serbien','pays.ro':'Rumänien','pays.ba':'Bosnien und Herzegowina','pays.md':'Moldawien',
    'actu.tag.event':'Veranstaltung','actu.tag.info':'Information','actu.tag.mission':'Wirtschaftsmission',
    'actu.ev1.title':'Wirtschaftsmission: Besuch des Präsidenten des Wirtschafts-, Sozial-, Umwelt- und Kulturrats',
    'actu.ev1.desc': 'Die Botschaft der Elfenbeinküste in Wien empfing den Präsidenten des Wirtschafts-, Sozial-, Umwelt- und Kulturrats im Rahmen einer Wirtschaftsmission zur Stärkung der Beziehungen zwischen der Elfenbeinküste und Mitteleuropa.',
    'actu.ev1.date': '2. Juni 2025',
    'actu.n1.title': 'Neues Antragsformular für den Reisepass',
    'actu.n1.desc':  'Aktualisierung des Antragsformulars für den biometrischen Reisepass.',
    'actu.n2.title': 'Außerordentliche Schließung — Tag der Arbeit',
    'actu.n2.desc':  'Der Konsulardienst ist am 1. Mai 2025 anlässlich des Tags der Arbeit geschlossen.',
    'actu.n3.title': 'Regularisierungskampagne für Staatsangehörige',
    'actu.n3.desc':  'Die Botschaft organisiert einen Tag zur Regularisierung von Dokumenten.',
    'actu.n4.title': 'Änderung der Visabearbeitungszeiten',
    'actu.n4.desc':  'Die Bearbeitungszeiten für Visaanträge betragen nun 5 bis 10 Werktage.',
    'psrv.h1':       'Konsularische Dienste',
    'psrv.desc':     'Alle konsularischen Verfahren der Botschaft der Elfenbeinküste in Wien.',
    'psrv.appt':     'Termin erforderlich',  'psrv.appt.d':'Kein Verfahren ohne vorherigen Termin',
    'psrv.delay':    'Bearbeitungszeiten',   'psrv.delay.d':'Variiert je nach Dossier',
    'psrv.pay':      'Zahlungen ausschließlich online', 'psrv.pay.d':'Alle Konsulargebühren sind vor dem Termin online zu bezahlen',
    'psrv.docs':     'Vollständige Unterlagen erforderlich', 'psrv.docs.d':'Bringen Sie alle Dokumente mit',
    'psrv.faq.badge':'FAQ', 'psrv.faq.title':'Häufig gestellte Fragen',
    'psrv.cta.title':'Bereit, Ihr Verfahren zu starten?',
    'psrv.cta.desc': 'Kontaktieren Sie uns für einen Termin oder für Informationen zu Ihrem Dossier.',
    'psrv.cta.btn1': 'Termin vereinbaren', 'psrv.cta.btn2':'📞 Jetzt anrufen',
    'pcon.h1':       'Kontakt & Öffnungszeiten',
    'pcon.desc':     'Vollständige Kontaktdaten und Öffnungszeiten. Alle Verfahren erfordern eine vorherige Terminvereinbarung.',
    'pcon.tel.lbl':  'Telefon',    'pcon.email.lbl':'Konsularische E-Mail',
    'pcon.addr.lbl': 'Adresse',   'pcon.urg.lbl':'Konsularische Notfälle',
    'pcon.urg.sub':  '24/7 für Notfälle verfügbar',
    'pcon.h.badge':  'Konsularische Öffnungszeiten', 'pcon.h.title':'Öffnungszeiten',
    'pcon.a.badge':  'Anfahrt',   'pcon.a.title':'So finden Sie uns',
    'pcon.f.badge':  'Schreiben Sie uns', 'pcon.f.title':'Kontaktformular',
    'pcon.f.desc':   'Füllen Sie dieses Formular aus. Wir antworten innerhalb von 3–5 Werktagen.',
    'pcon.f.send':   'Nachricht senden →',
    'pcon.urg2.title':'🚨 Konsularische Notfälle',
    'pcon.urg2.desc': 'Im Notfall außerhalb der Öffnungszeiten ist unser Bereitschaftsdienst 24/7 erreichbar.',
    'pamb.h1':       'Die Botschaft der Elfenbeinküste',
    'pamb.desc':     "Offizielle Vertretung der Republik Côte d'Ivoire in Österreich, zuständig für 9 mitteleuropäische Länder.",
    'pamb.mis.badge':'Unsere Mission', 'pamb.mis.title':'Diplomatische & Konsularische Mission',
    'pamb.pays.badge':'Zuständigkeit', 'pamb.pays.title':'Zuständige Länder',
    'pamb.pays.sub': 'Die Botschaft ist für Staatsangehörige in den folgenden 9 Ländern zuständig.',
    'pamb.amb.badge':'Leitung',        'pamb.rel.badge':'Diplomatie',
    'pamb.rel.title':'Beziehungen Elfenbeinküste — Österreich',
    'pamb.ci.badge': 'Die Elfenbeinküste', 'pamb.ci.title':'Die Elfenbeinküste entdecken',
    'pamb.mis.p1':   'Die Botschaft der Republik Côte d\'Ivoire in Österreich ist die offizielle diplomatische Vertretung der Elfenbeinküste in Wien. Sie verteidigt die ivorischen Interessen, fördert bilaterale Beziehungen und schützt ihre Staatsangehörigen.',
    'pamb.mis.p2':   'Gegründet gemäß dem Wiener Übereinkommen über diplomatische Beziehungen von 1961, erfüllt die Botschaft eine doppelte Mission: diplomatisch (Vertretung des Staates beim Gastland) und konsular (Unterstützung ivorischer Staatsangehöriger in der Jurisdiktion).',
    'pamb.mis.p3':   'Im Rahmen ihrer territorialen Zuständigkeit deckt die Botschaft 9 Länder ab: Österreich, Ungarn, Slowenien, Slowakei, Kroatien, Serbien, Rumänien und Bosnien-Herzegowina.',
    'pamb.stat.countries':'Länder im diplomatischen Amtsbereich', 'pamb.stat.conv':'Wiener Konvention', 'pamb.stat.ci':'Elfenbeinküste', 'pamb.stat.host':'Gastgeberland',
    'pamb.amb.title':"Außerordentlicher und bevollmächtigter Botschafter der Republik Côte d'Ivoire in Österreich",
    'pamb.amb.p1':   'Seine Exzellenz Herr Cissé Yacouba ist bei der Republik Österreich als Außerordentlicher und Bevollmächtigter Botschafter der Republik Côte d\'Ivoire akkreditiert. Er ist auch bei Ungarn, Slowenien, der Slowakei, Kroatien, Serbien, Rumänien und Bosnien-Herzegowina akkreditiert.',
    'pamb.amb.p2':   'Mit einer langen diplomatischen Karriere im Dienst der Elfenbeinküste vertritt Seine Exzellenz Herr Cissé Yacouba die Interessen der Ivorischen Republik, fördert bilaterale und multilaterale Beziehungen und koordiniert alle Dienste der Botschaft.',
    'pcon.addr.official':'📍 Geografische Adresse',
    'pcon.table.window':'Konsularsschalter',
    'srv.badge.passport':'Reisedokument','srv.badge.visa':'Einreisevisum','srv.badge.identity':'Personalausweis',
  },

  /* ==================== ENGLISH ==================== */
  en: {
    'topbar.address':'Michael-Neumann-Gasse 2 - 3rd Floor, 1190 Vienna',
    'topbar.hours':  'Mon–Fri : 9:30 AM – 4:00 PM',
    'nav.home':      'Home',
    'nav.embassy':   'The Embassy',
    'nav.services':  'Consular Services',
    'nav.contact':   'Contact & Hours',
    'alert.text':    'An appointment is required for all consular procedures.',
    'alert.link':    'Book an appointment →',
    'hero.eyebrow':  'Consular Service',
    'hero.h1':       "Welcome to the Embassy of<br><em>Côte d'Ivoire</em> in Austria",
    'hero.desc':     "We assist Ivorian nationals residing in Central Europe with all their administrative and consular procedures from Vienna.",
    'hero.btn1':     'Our Consular Services',
    'hero.btn2':     'Book an Appointment',
    'hero.card.title':'Practical Information',
    'hero.addr.lbl': 'Address',
    'hero.hours.lbl':'General Embassy Hours',
    'hero.hours.val':'Mon – Fri : 9:30 AM – 4:00 PM',
    'hero.tel.lbl':  'Phone',
    'hero.jurid.lbl':'Consular Jurisdiction',
    'hero.jurid.val':'9 Central European countries',
    'srv.badge':     'Our Services',
    'srv.title':     'Available Consular Services',
    'srv.subtitle':  "All our services are available to Ivorian nationals and foreign citizens wishing to visit Côte d'Ivoire.",
    'srv.passport':  'Passport',
    'srv.passport.d':"First application, renewal and emergency passport for Ivorian nationals.",
    'srv.visa':      'Entry Visa',
    'srv.visa.d':    "Tourist, business and transit visas for foreign nationals wishing to enter Côte d'Ivoire.",
    'srv.civil':     'Civil Registry',
    'srv.civil.d':   'Birth, marriage and death certificates, transcriptions and civil status documents.',
    'srv.legal':     'Legalisation',
    'srv.legal.d':   'Legalisation and apostille of official documents, signature authentication.',
    'srv.cnie':      'National ID Card',
    'srv.cnie.d':    'Electronic national identity card for Ivorian nationals in Central Europe.',
    'srv.cert':      'Certificates & Attestations',
    'srv.cert.d':    'Life, residence and nationality certificates and official attestations.',
    'srv.more':      'Learn more',
    'home.hours.badge': 'Embassy Hours',
    'info.badge':    'Consular Hours',
    'info.title':    'Opening Hours',
    'info.subtitle': 'The consular service receives visitors by appointment only.',
    'info.rdv':      'Book an appointment →',
    'info.ct.title': 'Contact Us',
    'info.ct.sub':   'For any question or consular emergency',
    'info.addr.lbl': 'Address',    'info.tel.lbl':'Phone',
    'info.email.lbl':'Consular Email', 'info.urg.lbl':'Emergency (out of hours)',
    'info.metro.lbl':'Getting here',
    'pays.badge':    'Constituency',
    'pays.title':    'Diplomatic Constituency',
    'pays.subtitle': "The Embassy of Côte d'Ivoire in Vienna has consular jurisdiction over 9 Central European and Balkan countries.",
    'actu.badge':    'News',
    'actu.title':    'Information & Announcements',
    'actu.all':      'All news →',
    'cta.title':     'Need consular assistance?',
    'cta.desc':      'Our team is available to assist you with all your administrative procedures. Book an appointment online or contact us directly.',
    'cta.btn1':      'Book an Appointment', 'cta.btn2':'View Services',
    'footer.desc':   "Embassy of the Republic of Côte d'Ivoire in Austria, serving 9 Central European countries. Official consular service.",
    'footer.srv':    'Services', 'footer.info':'Information', 'footer.contact':'Contact',
    'footer.legal':  'Legal Notice', 'footer.privacy':'Privacy Policy',
    'footer.access': 'Accessibility', 'footer.sitemap':'Sitemap',
    'footer.copy':   '© 2025 Embassy of the Republic of Côte d\'Ivoire in Austria. All rights reserved.',
    'footer.link.amb':'→ The Ambassador',
    'logo.name':     "Embassy of Côte d'Ivoire",
    'logo.subtitle': 'Republic of Côte d\'Ivoire — Vienna, Austria',
    'skip.link':     'Skip to main content',
    'alert.important':'Important notice:',
    'table.day':'Day','table.hours':'Hours',
    'day.mon':'Monday','day.tue':'Tuesday','day.wed':'Wednesday','day.thu':'Thursday',
    'day.fri':'Friday','day.sat':'Saturday','day.sun':'Sunday','day.closed':'Closed',
    'hours.val':'9:30 AM – 4:00 PM',
    'info.note':'Closed on Austrian and Ivorian public holidays.',
    'month.jan':'Jan','month.feb':'Feb','month.mar':'Mar','month.apr':'Apr',
    'month.may':'May','month.jun':'Jun','month.jul':'Jul','month.aug':'Aug',
    'month.sep':'Sep','month.oct':'Oct','month.nov':'Nov','month.dec':'Dec',
    'addr.street':'Michael-Neumann-Gasse 2 - 3rd Floor', 'pays.at':'Austria','pays.at.cap':'Vienna (seat)',
    'pays.hu':'Hungary','pays.si':'Slovenia','pays.sk':'Slovakia',
    'pays.hr':'Croatia','pays.rs':'Serbia','pays.ro':'Romania','pays.ba':'Bosnia-Herzegovina','pays.md':'Moldova',
    'actu.tag.event':'Event','actu.tag.info':'Information','actu.tag.mission':'Economic Mission',
    'actu.ev1.title':"Economic Mission: Visit by the President of the Economic, Social, Environmental and Cultural Council",
    'actu.ev1.desc': "The Embassy of Côte d'Ivoire in Vienna welcomed the President of the Economic, Social, Environmental and Cultural Council as part of an economic mission to strengthen ties between Côte d'Ivoire and Central Europe.",
    'actu.ev1.date': '2 June 2025',
    'actu.n1.title': 'New passport application form',
    'actu.n1.desc':  'Update of the biometric passport application form.',
    'actu.n2.title': 'Exceptional closure — Labour Day',
    'actu.n2.desc':  'The consular service will be closed on 1 May 2025 for Labour Day.',
    'actu.n3.title': 'Regularisation campaign for nationals',
    'actu.n3.desc':  'The Embassy is organising a day dedicated to the regularisation of documents.',
    'actu.n4.title': 'Change in visa processing times',
    'actu.n4.desc':  'Visa processing times are now 5 to 10 working days.',
    'psrv.h1':       'Consular Services',
    'psrv.desc':     "Find all administrative procedures offered by the Embassy of Côte d'Ivoire in Vienna.",
    'psrv.appt':     'Appointment Required', 'psrv.appt.d':'No procedure without a prior appointment',
    'psrv.delay':    'Processing Times',     'psrv.delay.d':'Variable depending on the file',
    'psrv.pay':      'Online payments only', 'psrv.pay.d':'All consular fees must be paid online prior to your appointment',
    'psrv.docs':     'Complete File Required','psrv.docs.d':'Bring all necessary documents',
    'psrv.faq.badge':'FAQ', 'psrv.faq.title':'Frequently Asked Questions',
    'psrv.cta.title':'Ready to start your procedure?',
    'psrv.cta.desc': 'Contact us to make an appointment or get additional information about your file.',
    'psrv.cta.btn1': 'Book an Appointment', 'psrv.cta.btn2':'📞 Call Now',
    'pcon.h1':       'Contact & Hours',
    'pcon.desc':     'Full contact details and opening hours. All procedures require a prior appointment.',
    'pcon.tel.lbl':  'Phone',     'pcon.email.lbl':'Consular Email',
    'pcon.addr.lbl': 'Address',   'pcon.urg.lbl':'Consular Emergencies',
    'pcon.urg.sub':  'Available 24/7 for emergencies',
    'pcon.h.badge':  'Consular Hours',     'pcon.h.title':'Opening Hours',
    'pcon.a.badge':  'Getting Here','pcon.a.title':'How to Find Us',
    'pcon.f.badge':  'Write to Us','pcon.f.title':'Contact Form',
    'pcon.f.desc':   'Fill in this form. We will reply within 3–5 business days.',
    'pcon.f.send':   'Send Message →',
    'pcon.urg2.title':'🚨 Consular Emergencies',
    'pcon.urg2.desc': 'In case of emergency outside opening hours, our duty service is available 24/7.',
    'pamb.h1':       "The Embassy of Côte d'Ivoire",
    'pamb.desc':     "Official representation of the Republic of Côte d'Ivoire in Austria, serving 9 Central European countries.",
    'pamb.mis.badge':'Our Mission', 'pamb.mis.title':'Diplomatic & Consular Mission',
    'pamb.pays.badge':'Jurisdiction','pamb.pays.title':'Countries Served',
    'pamb.pays.sub': 'The Embassy of Côte d\'Ivoire in Vienna is competent for nationals in the following 9 countries.',
    'pamb.amb.badge':'Leadership',  'pamb.rel.badge':'Diplomacy',
    'pamb.rel.title':"Relations Côte d'Ivoire — Austria",
    'pamb.ci.badge': "Côte d'Ivoire",'pamb.ci.title':"Discover Côte d'Ivoire",
    'pamb.mis.p1':   "The Embassy of the Republic of Côte d'Ivoire in Austria is the official diplomatic representation of Côte d'Ivoire in Vienna. It defends Ivorian interests, develops bilateral relations and protects its nationals.",
    'pamb.mis.p2':   "Established in accordance with the Vienna Convention on Diplomatic Relations of 1961, the Embassy fulfils a dual mission: diplomatic (representing the State to the host country) and consular (assisting Ivorian nationals residing in its jurisdiction).",
    'pamb.mis.p3':   "Within its territorial jurisdiction, the Embassy covers 9 countries: Austria, Hungary, Slovenia, Slovakia, Croatia, Serbia, Romania and Bosnia-Herzegovina.",
    'pamb.stat.countries':'countries in the Diplomatic Constituency', 'pamb.stat.conv':'Vienna Convention', 'pamb.stat.ci':"Côte d'Ivoire", 'pamb.stat.host':'Host country',
    'pamb.amb.title':"Ambassador Extraordinary and Plenipotentiary of the Republic of Côte d'Ivoire in Austria",
    'pamb.amb.p1':   "His Excellency Mr Cissé Yacouba is accredited to the Republic of Austria as Ambassador Extraordinary and Plenipotentiary of the Republic of Côte d'Ivoire. He is also accredited to Hungary, Slovenia, Slovakia, Croatia, Serbia, Romania and Bosnia-Herzegovina.",
    'pamb.amb.p2':   "With a long diplomatic career in the service of Côte d'Ivoire, His Excellency Mr Cissé Yacouba represents the interests of the Ivorian Republic, promotes bilateral and multilateral relations, and coordinates all the services of the Embassy.",
    'pcon.addr.official':'📍 Geographic Address',
    'pcon.table.window':'Consular window',
    'srv.badge.passport':'Travel document','srv.badge.visa':'Entry Visa','srv.badge.identity':'ID Card',
  }
};

/* ============================================================
   setLang — applique la langue choisie
   ============================================================ */
function setLang(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) el.textContent = translations[lang][key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });

  document.documentElement.lang = lang === 'de' ? 'de' : lang === 'en' ? 'en' : 'fr';
  localStorage.setItem('ambaci-lang', lang);
}

(function initLang() {
  const saved = localStorage.getItem('ambaci-lang') || 'fr';
  setLang(saved);
})();

/* ============================================================
   Navigation mobile — hamburger menu
   ============================================================ */
const menuToggle = document.getElementById('menu-toggle');
const mainNav    = document.getElementById('main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuToggle.focus();
    }
  });
}

/* ============================================================
   Alerte — fermeture
   ============================================================ */
const alertClose  = document.getElementById('alert-close');
const alertBanner = document.getElementById('alert-banner');

if (alertClose && alertBanner) {
  alertClose.addEventListener('click', () => {
    alertBanner.style.maxHeight = alertBanner.scrollHeight + 'px';
    requestAnimationFrame(() => {
      alertBanner.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
      alertBanner.style.maxHeight  = '0';
      alertBanner.style.opacity    = '0';
      alertBanner.style.overflow   = 'hidden';
    });
    setTimeout(() => alertBanner.remove(), 350);
  });
}

/* ============================================================
   Accordion (FAQ)
   ============================================================ */
document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panelId = trigger.getAttribute('aria-controls');
    const panel   = document.getElementById(panelId);
    if (!panel) return;
    const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.accordion-trigger').forEach((t) => {
      if (t !== trigger) {
        t.setAttribute('aria-expanded', 'false');
        const p = document.getElementById(t.getAttribute('aria-controls'));
        if (p) p.classList.remove('is-open');
      }
    });
    trigger.setAttribute('aria-expanded', String(!isExpanded));
    panel.classList.toggle('is-open', !isExpanded);
  });
});

/* ============================================================
   Surlignage du jour courant
   ============================================================ */
(function highlightToday() {
  const days = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  const todayName = days[new Date().getDay()];
  document.querySelectorAll('.horaires-table tbody tr').forEach((row) => {
    const cell = row.querySelector('td:first-child');
    if (cell && cell.textContent.trim() === todayName) row.classList.add('today-row');
  });
})();

/* ============================================================
   Formulaire de contact
   ============================================================ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = contactForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach((field) => {
      const ok = field.type === 'checkbox' ? field.checked : field.value.trim() !== '';
      if (!ok) { valid = false; field.style.borderColor = '#DC2626'; field.setAttribute('aria-invalid','true'); }
      else { field.style.borderColor = ''; field.removeAttribute('aria-invalid'); }
    });
    if (!valid) { const f = contactForm.querySelector('[aria-invalid="true"]'); if (f) f.focus(); return; }
    const btn = contactForm.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.disabled = true; btn.textContent = 'Envoi en cours…';
    setTimeout(() => {
      btn.textContent = '✓ Message envoyé !'; btn.style.background = 'var(--green)'; contactForm.reset();
      setTimeout(() => { btn.disabled = false; btn.textContent = orig; btn.style.background = ''; }, 4000);
    }, 1500);
  });
  contactForm.querySelectorAll('[required]').forEach((field) => {
    field.addEventListener('input', () => { field.style.borderColor = ''; field.removeAttribute('aria-invalid'); });
  });
}

/* ============================================================
   Sticky header
   ============================================================ */
(function stickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 80 ? 'var(--shadow-md)' : 'var(--shadow-sm)';
  }, { passive: true });
})();

/* ============================================================
   Smooth scroll
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const headerH = document.querySelector('.site-header')?.offsetHeight ?? 80;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerH - 16, behavior: 'smooth' });
    }
  });
});
