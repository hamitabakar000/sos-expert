import type {
  Consultation,
  CrowdsourcingLot,
  DemoUser,
  Expert,
  ExpertValidationCase,
  ExpertCollection,
  Mission,
  NetworkPost,
  Notification,
  Payment,
  Review,
  SuccessStory
} from "@/lib/types";

export const domains = [
  "Droit",
  "Medecine & Sante",
  "Finance",
  "IT & Cybersecurite",
  "Coaching",
  "Education",
  "Architecture & Ingenierie",
  "RH & Recrutement",
  "Marketing"
];

export const demoUsers: DemoUser[] = [
  {
    id: "usr-client-001",
    role: "client",
    firstName: "Hamit",
    lastName: "Moussa",
    email: "client@sosexpert.ma",
    city: "Tanger",
    preferredLanguage: "fr",
    avatarInitials: "HM",
    avatarUrl: "/users/hamit-moussa.png"
  },
  {
    id: "usr-expert-001",
    role: "expert",
    firstName: "Youssef",
    lastName: "Bennani",
    email: "expert@sosexpert.ma",
    city: "Casablanca",
    preferredLanguage: "fr",
    avatarInitials: "YB",
    avatarUrl: "/experts/youssef-bennani.png",
    expertId: "exp-002"
  },
  {
    id: "usr-admin-001",
    role: "admin",
    firstName: "Admin",
    lastName: "SOS",
    email: "admin@sosexpert.ma",
    city: "Tanger",
    preferredLanguage: "fr",
    avatarInitials: "AS",
    avatarUrl: "/users/admin-sos.png"
  },
  {
    id: "usr-client-002",
    role: "client",
    firstName: "Sara",
    lastName: "Benali",
    email: "sara.benali@example.com",
    city: "Rabat",
    preferredLanguage: "fr",
    avatarInitials: "SB"
  },
  {
    id: "usr-client-003",
    role: "client",
    firstName: "Omar",
    lastName: "Naciri",
    email: "omar.naciri@example.com",
    city: "Casablanca",
    preferredLanguage: "ar",
    avatarInitials: "ON"
  },
  {
    id: "usr-client-004",
    role: "client",
    firstName: "Ilham",
    lastName: "Bakkali",
    email: "ilham.bakkali@example.com",
    city: "Fes",
    preferredLanguage: "fr",
    avatarInitials: "IB"
  },
  {
    id: "usr-admin-002",
    role: "admin",
    firstName: "Imane",
    lastName: "Operations",
    email: "imane.ops@sosexpert.ma",
    city: "Tanger",
    preferredLanguage: "fr",
    avatarInitials: "IO"
  },
  {
    id: "usr-client-005",
    role: "client",
    firstName: "Nadia",
    lastName: "Akkari",
    email: "nadia.akkari@example.com",
    city: "Marrakech",
    preferredLanguage: "fr",
    avatarInitials: "NA"
  },
  {
    id: "usr-client-006",
    role: "client",
    firstName: "Yassine",
    lastName: "El Fadil",
    email: "yassine.elfadil@example.com",
    city: "Agadir",
    preferredLanguage: "ar",
    avatarInitials: "YE"
  },
  {
    id: "usr-client-007",
    role: "client",
    firstName: "Meryem",
    lastName: "Touzani",
    email: "meryem.touzani@example.com",
    city: "Tanger",
    preferredLanguage: "fr",
    avatarInitials: "MT"
  },
  {
    id: "usr-client-008",
    role: "client",
    firstName: "Adil",
    lastName: "Fassi",
    email: "adil.fassi@example.com",
    city: "Casablanca",
    preferredLanguage: "en",
    avatarInitials: "AF"
  },
  {
    id: "usr-admin-003",
    role: "admin",
    firstName: "Mehdi",
    lastName: "Qualite",
    email: "mehdi.quality@sosexpert.ma",
    city: "Rabat",
    preferredLanguage: "fr",
    avatarInitials: "MQ"
  },
  {
    id: "usr-client-009",
    role: "client",
    firstName: "Khadija",
    lastName: "Mernissi",
    email: "khadija.mernissi@example.com",
    city: "Fes",
    preferredLanguage: "ar",
    avatarInitials: "KM"
  },
  {
    id: "usr-client-010",
    role: "client",
    firstName: "Ilyas",
    lastName: "Berrada",
    email: "ilyas.berrada@example.com",
    city: "Rabat",
    preferredLanguage: "fr",
    avatarInitials: "IB"
  },
  {
    id: "usr-client-011",
    role: "client",
    firstName: "Safae",
    lastName: "Mokhtari",
    email: "safae.mokhtari@example.com",
    city: "Casablanca",
    preferredLanguage: "fr",
    avatarInitials: "SM"
  },
  {
    id: "usr-client-012",
    role: "client",
    firstName: "Walid",
    lastName: "Rhazali",
    email: "walid.rhazali@example.com",
    city: "Meknes",
    preferredLanguage: "ar",
    avatarInitials: "WR"
  },
  {
    id: "usr-expert-002",
    role: "expert",
    firstName: "Nadia",
    lastName: "El Amrani",
    email: "nadia.elamrani@sosexpert.ma",
    city: "Rabat",
    preferredLanguage: "fr",
    avatarInitials: "NA",
    avatarUrl: "/experts/nadia-el-amrani.png",
    expertId: "exp-001"
  },
  {
    id: "usr-expert-003",
    role: "expert",
    firstName: "Salma",
    lastName: "Idrissi",
    email: "salma.idrissi@sosexpert.ma",
    city: "Marrakech",
    preferredLanguage: "ar",
    avatarInitials: "SI",
    avatarUrl: "/experts/salma-idrissi.png",
    expertId: "exp-003"
  },
  {
    id: "usr-admin-004",
    role: "admin",
    firstName: "Leila",
    lastName: "Conformite",
    email: "leila.compliance@sosexpert.ma",
    city: "Casablanca",
    preferredLanguage: "fr",
    avatarInitials: "LC"
  }
];

export const experts: Expert[] = [
  {
    id: "exp-001",
    profileId: "usr-expert-legal-001",
    firstName: "Nadia",
    lastName: "El Amrani",
    title: "Avocate en droit des affaires",
    city: "Tanger",
    bio:
      "Avocate specialisee en droit des affaires, contrats commerciaux, propriete intellectuelle et accompagnement juridique des jeunes entreprises. Elle intervient surtout sur les dossiers sensibles demandant confidentialite, pedagogie et rapidite de decision.",
    domains: ["Droit", "Finance"],
    certifications: ["CAPA", "Master droit des affaires", "Formation mediation commerciale"],
    hourlyRate: 450,
    languages: ["fr", "ar"],
    yearsExperience: 9,
    responseTime: "Moins de 10 min",
    nextAvailableSlot: "Aujourd'hui 18:30",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 36,
    totalConsultations: 128,
    completionRate: 98,
    responseRate: 96,
    verifiedBadges: ["Identite verifiee", "Dossier certifie", "Confidentialite stricte"],
    trustSummary: "Tres appreciee pour sa clarte sur les risques juridiques et sa capacite a rassurer sans simplifier.",
    avatarUrl: "/experts/nadia-el-amrani.png"
  },
  {
    id: "exp-002",
    profileId: "usr-expert-001",
    firstName: "Youssef",
    lastName: "Bennani",
    title: "Architecte logiciel & consultant cloud",
    city: "Casablanca",
    bio:
      "Architecte logiciel et consultant cloud, expert en audit de plateformes SaaS, securite applicative, architecture scalable, WebRTC et supervision cloud. Il aide les equipes a transformer une idee produit en architecture fiable et mesurable.",
    domains: ["IT & Cybersecurite", "Architecture & Ingenierie"],
    certifications: ["AWS Solutions Architect", "ISO 27001 Foundation", "Kubernetes Administrator"],
    hourlyRate: 650,
    flatRate: 3200,
    languages: ["fr", "en", "ar"],
    yearsExperience: 11,
    responseTime: "Moins de 5 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 52,
    totalConsultations: 210,
    completionRate: 99,
    responseRate: 98,
    verifiedBadges: ["Identite verifiee", "Certifications cloud", "Top expert IT"],
    trustSummary: "Fort sur les audits techniques complexes, avec des recommandations actionnables et priorisees.",
    avatarUrl: "/experts/youssef-bennani.png"
  },
  {
    id: "exp-003",
    profileId: "usr-expert-rh-001",
    firstName: "Salma",
    lastName: "Idrissi",
    title: "Coach RH & recrutement",
    city: "Rabat",
    bio:
      "Experte RH, recrutement et coaching professionnel pour profils juniors, managers et equipes en transition. Elle accompagne les clients sur la preparation d'entretien, le diagnostic de competences et la structuration de parcours.",
    domains: ["RH & Recrutement", "Coaching"],
    certifications: ["Coach certifiee ICF", "Master GRH", "Certification assessment center"],
    hourlyRate: 300,
    languages: ["fr", "ar"],
    yearsExperience: 7,
    responseTime: "Environ 30 min",
    nextAvailableSlot: "Demain 09:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.6,
    totalReviews: 24,
    totalConsultations: 89,
    completionRate: 94,
    responseRate: 91,
    verifiedBadges: ["Identite verifiee", "Coach certifiee", "Ecoute active"],
    trustSummary: "Profil humain et tres pedagogique pour les transitions RH, entretiens et decisions de carriere.",
    avatarUrl: "/experts/salma-idrissi.png"
  },
  {
    id: "exp-004",
    profileId: "usr-expert-finance-001",
    firstName: "Karim",
    lastName: "Haddad",
    title: "Consultant financier",
    city: "Tanger",
    bio:
      "Consultant financier specialise en business plans, previsions, levees de fonds et structuration de dossiers d'investissement. Il intervient pour startups, PME et porteurs de projets avec une approche claire et chiffrable.",
    domains: ["Finance", "Marketing"],
    certifications: ["CFA Level II", "Expert comptable stagiaire", "Analyse financiere avancee"],
    hourlyRate: 520,
    languages: ["fr", "ar", "en"],
    yearsExperience: 8,
    responseTime: "Moins de 20 min",
    nextAvailableSlot: "Aujourd'hui 20:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 41,
    totalConsultations: 166,
    completionRate: 97,
    responseRate: 94,
    verifiedBadges: ["Identite verifiee", "Finance PME", "Business plan"],
    trustSummary: "Aide les porteurs de projet a transformer des hypotheses floues en chiffres defendables.",
    avatarUrl: "/experts/karim-haddad.png"
  },
  {
    id: "exp-005",
    profileId: "usr-expert-health-001",
    firstName: "Amina",
    lastName: "Tazi",
    title: "Medecin generaliste conseil",
    city: "Fes",
    bio:
      "Medecin generaliste orientee teleconseil, prevention et orientation patient. Ses consultations ne remplacent pas les urgences medicales, mais aident a clarifier les symptomes, preparer un rendez-vous et comprendre un compte rendu.",
    domains: ["Medecine & Sante"],
    certifications: ["Doctorat en medecine", "Formation telemedecine", "DU prevention sante"],
    hourlyRate: 380,
    languages: ["fr", "ar"],
    yearsExperience: 12,
    responseTime: "Moins de 15 min",
    nextAvailableSlot: "Aujourd'hui 19:15",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 67,
    totalConsultations: 244,
    completionRate: 99,
    responseRate: 97,
    verifiedBadges: ["Identite verifiee", "Doctorat verifie", "Sante preventive"],
    trustSummary: "Approche rassurante pour comprendre un symptome, preparer un rendez-vous ou relire un compte rendu.",
    avatarUrl: "/experts/amina-tazi.png"
  },
  {
    id: "exp-006",
    profileId: "usr-expert-edu-001",
    firstName: "Mehdi",
    lastName: "Rami",
    title: "Consultant education & orientation",
    city: "Marrakech",
    bio:
      "Specialiste en orientation academique, methodologie de travail et accompagnement des etudiants. Il construit des plans d'apprentissage, aide au choix de filieres et prepare les dossiers de candidature.",
    domains: ["Education", "Coaching"],
    certifications: ["Master sciences de l'education", "Certification orientation scolaire"],
    hourlyRate: 260,
    languages: ["fr", "ar", "en"],
    yearsExperience: 6,
    responseTime: "Environ 1 h",
    nextAvailableSlot: "Vendredi 11:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.5,
    totalReviews: 18,
    totalConsultations: 72,
    completionRate: 92,
    responseRate: 89,
    verifiedBadges: ["Identite verifiee", "Orientation", "Mentorat"],
    trustSummary: "Bon profil pour les etudiants qui ont besoin d'une decision concrete, pas seulement d'une liste d'options.",
    avatarUrl: "/experts/mehdi-rami.png"
  },
  {
    id: "exp-007",
    profileId: "usr-expert-arch-001",
    firstName: "Leila",
    lastName: "Mernissi",
    title: "Architecte & ingenieure batiment",
    city: "Agadir",
    bio:
      "Architecte specialisee en faisabilite de projets, lecture de plans, estimation preliminaire et coordination technique. Elle intervient sur renovations, locaux professionnels et projets residentiels.",
    domains: ["Architecture & Ingenierie"],
    certifications: ["Architecte DENA", "BIM fundamentals", "Gestion chantier"],
    hourlyRate: 480,
    languages: ["fr", "ar"],
    yearsExperience: 10,
    responseTime: "Moins de 45 min",
    nextAvailableSlot: "Demain 14:30",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 29,
    totalConsultations: 101,
    completionRate: 96,
    responseRate: 93,
    verifiedBadges: ["Identite verifiee", "BIM", "Faisabilite projet"],
    trustSummary: "Excellente pour cadrer rapidement la faisabilite d'un projet avant d'engager des couts importants.",
    avatarUrl: "/experts/leila-mernissi.png"
  },
  {
    id: "exp-008",
    profileId: "usr-expert-marketing-001",
    firstName: "Omar",
    lastName: "Alaoui",
    title: "Strategiste marketing digital",
    city: "Casablanca",
    bio:
      "Consultant marketing digital specialise en acquisition, positionnement, funnels, analytics et lancement d'offres. Il aide les entreprises a prioriser les canaux et mesurer le retour sur investissement.",
    domains: ["Marketing", "Finance"],
    certifications: ["Google Ads", "Meta Blueprint", "Analytics advanced"],
    hourlyRate: 410,
    languages: ["fr", "en", "ar"],
    yearsExperience: 8,
    responseTime: "Moins de 25 min",
    nextAvailableSlot: "Aujourd'hui 21:00",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "standard",
    averageRating: 4.6,
    totalReviews: 33,
    totalConsultations: 137,
    completionRate: 95,
    responseRate: 92,
    verifiedBadges: ["Identite verifiee", "Acquisition", "Analytics"],
    trustSummary: "Pragmatique sur les canaux marketing : il aide a choisir quoi tester, mesurer et abandonner.",
    avatarUrl: "/experts/omar-alaoui.png"
  },
  {
    id: "exp-009",
    profileId: "usr-expert-data-001",
    firstName: "Adam",
    lastName: "Chraibi",
    title: "Consultant data & IA appliquee",
    city: "Rabat",
    bio:
      "Consultant data specialise en tableaux de bord, scoring, automatisation IA et cadrage de cas d'usage. Il aide les equipes a distinguer ce qui est faisable rapidement de ce qui demande une vraie strategie data.",
    domains: ["IT & Cybersecurite", "Education"],
    certifications: ["Machine Learning Specialization", "Power BI Data Analyst", "Prompt engineering avance"],
    hourlyRate: 590,
    languages: ["fr", "en", "ar"],
    yearsExperience: 7,
    responseTime: "Moins de 20 min",
    nextAvailableSlot: "Aujourd'hui 17:45",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 31,
    totalConsultations: 119,
    completionRate: 97,
    responseRate: 95,
    verifiedBadges: ["Identite verifiee", "IA appliquee", "Data privacy"],
    trustSummary: "Tres utile pour transformer une idee IA en feuille de route realiste, mesurable et defendable.",
    avatarUrl: "/experts/adam-chraibi.png"
  },
  {
    id: "exp-010",
    profileId: "usr-expert-tax-001",
    firstName: "Hicham",
    lastName: "Ouazzani",
    title: "Fiscaliste entreprises",
    city: "Casablanca",
    bio:
      "Fiscaliste oriente PME et independants, avec une forte experience en TVA, declaration, optimisation prudente et preparation de dossiers administratifs. Il privilegie les recommandations conformes et documentees.",
    domains: ["Finance", "Droit"],
    certifications: ["Master fiscalite", "Expertise comptable", "Fiscalite PME"],
    hourlyRate: 470,
    languages: ["fr", "ar"],
    yearsExperience: 13,
    responseTime: "Moins de 35 min",
    nextAvailableSlot: "Demain 10:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 44,
    totalConsultations: 154,
    completionRate: 96,
    responseRate: 92,
    verifiedBadges: ["Identite verifiee", "Fiscalite", "Documents sensibles"],
    trustSummary: "Recommande pour les questions fiscales qui doivent rester prudentes, tracees et comprehensibles.",
    avatarUrl: "/experts/hicham-ouazzani.png"
  },
  {
    id: "exp-011",
    profileId: "usr-expert-family-law-001",
    firstName: "Mariam",
    lastName: "Lahlou",
    title: "Juriste droit de la famille",
    city: "Fes",
    bio:
      "Juriste specialisee en droit de la famille, mediation, dossiers administratifs et accompagnement des situations sensibles. Elle adopte une approche calme, structuree et respectueuse de la confidentialite.",
    domains: ["Droit", "Coaching"],
    certifications: ["Master droit prive", "Mediation familiale", "Protection donnees personnelles"],
    hourlyRate: 340,
    languages: ["fr", "ar"],
    yearsExperience: 8,
    responseTime: "Moins de 25 min",
    nextAvailableSlot: "Aujourd'hui 19:00",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 58,
    totalConsultations: 201,
    completionRate: 98,
    responseRate: 97,
    verifiedBadges: ["Identite verifiee", "Mediation", "Confidentialite stricte"],
    trustSummary: "Profil rassurant pour les sujets familiaux sensibles, avec une excellente qualite d'ecoute.",
    avatarUrl: "/experts/mariam-lahlou.png"
  },
  {
    id: "exp-012",
    profileId: "usr-expert-nutrition-001",
    firstName: "Sofia",
    lastName: "El Fassi",
    title: "Nutritionniste conseil",
    city: "Rabat",
    bio:
      "Nutritionniste specialisee en education alimentaire, suivi de routines et prevention. Elle aide les clients a construire des plans simples, progressifs et compatibles avec leur quotidien.",
    domains: ["Medecine & Sante", "Coaching"],
    certifications: ["Nutrition clinique", "Education therapeutique", "Prevention sante"],
    hourlyRate: 290,
    languages: ["fr", "ar"],
    yearsExperience: 6,
    responseTime: "Moins de 40 min",
    nextAvailableSlot: "Demain 12:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.6,
    totalReviews: 27,
    totalConsultations: 86,
    completionRate: 94,
    responseRate: 90,
    verifiedBadges: ["Identite verifiee", "Nutrition", "Suivi progressif"],
    trustSummary: "Adaptee aux clients qui veulent un accompagnement concret, doux et durable.",
    avatarUrl: "/experts/sofia-el-fassi.png"
  },
  {
    id: "exp-013",
    profileId: "usr-expert-realestate-001",
    firstName: "Nabil",
    lastName: "Berrada",
    title: "Ingenieur immobilier & pathologies batiment",
    city: "Tanger",
    bio:
      "Ingenieur specialise en diagnostic technique, humidite, fissures, reception de travaux et estimation de risques avant achat. Il vulgarise les problemes batiment sans dramatiser ni minimiser.",
    domains: ["Architecture & Ingenierie", "Droit"],
    certifications: ["Ingenieur genie civil", "Diagnostic batiment", "Gestion des risques chantier"],
    hourlyRate: 560,
    languages: ["fr", "ar"],
    yearsExperience: 14,
    responseTime: "Moins de 1 h",
    nextAvailableSlot: "Jeudi 16:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 39,
    totalConsultations: 132,
    completionRate: 97,
    responseRate: 91,
    verifiedBadges: ["Identite verifiee", "Diagnostic", "Immobilier"],
    trustSummary: "Tres bon profil avant achat ou reception de travaux, quand il faut objectiver les risques.",
    avatarUrl: "/experts/nabil-berrada.png"
  },
  {
    id: "exp-014",
    profileId: "usr-expert-product-001",
    firstName: "Ines",
    lastName: "Slaoui",
    title: "Product strategist SaaS",
    city: "Casablanca",
    bio:
      "Strategiste produit pour startups et plateformes SaaS. Elle aide a clarifier proposition de valeur, parcours utilisateur, priorisation MVP, onboarding et metriques d'adoption.",
    domains: ["Marketing", "IT & Cybersecurite", "Coaching"],
    certifications: ["Product Management", "UX Research", "Growth strategy"],
    hourlyRate: 620,
    languages: ["fr", "en"],
    yearsExperience: 9,
    responseTime: "Moins de 15 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 46,
    totalConsultations: 177,
    completionRate: 98,
    responseRate: 96,
    verifiedBadges: ["Identite verifiee", "Produit SaaS", "UX"],
    trustSummary: "Particulierement forte pour transformer une idee en parcours produit credible et testable.",
    avatarUrl: "/experts/ines-el-khattabi.png"
  },
  {
    id: "exp-015",
    profileId: "usr-expert-cyber-001",
    firstName: "Rania",
    lastName: "Boussaid",
    title: "Analyste cybersecurite",
    city: "Marrakech",
    bio:
      "Analyste cybersecurite specialisee en sensibilisation, audit de configuration, gestion des acces et hygiene numerique. Elle accompagne les petites structures qui veulent securiser sans complexifier.",
    domains: ["IT & Cybersecurite", "Education"],
    certifications: ["Security+", "ISO 27001", "Sensibilisation cyber"],
    hourlyRate: 430,
    languages: ["fr", "ar", "en"],
    yearsExperience: 5,
    responseTime: "Moins de 10 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 22,
    totalConsultations: 77,
    completionRate: 95,
    responseRate: 98,
    verifiedBadges: ["Identite verifiee", "Cyber hygiene", "Reponse rapide"],
    trustSummary: "Excellent choix pour une premiere securisation rapide, claire et actionnable.",
    avatarUrl: "/experts/rania-boussaid.png"
  },
  {
    id: "exp-016",
    profileId: "usr-expert-learning-001",
    firstName: "Tarek",
    lastName: "Mansouri",
    title: "Formateur e-learning & pedagogie digitale",
    city: "Agadir",
    bio:
      "Formateur specialise en creation de modules e-learning, scenarios pedagogiques, evaluation et digitalisation de contenus. Il aide les experts a transformer leur savoir en parcours vendable.",
    domains: ["Education", "Marketing"],
    certifications: ["Instructional Design", "Moodle", "Digital learning"],
    hourlyRate: 310,
    languages: ["fr", "ar"],
    yearsExperience: 7,
    responseTime: "Moins de 50 min",
    nextAvailableSlot: "Vendredi 09:30",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.5,
    totalReviews: 19,
    totalConsultations: 68,
    completionRate: 93,
    responseRate: 88,
    verifiedBadges: ["Identite verifiee", "E-learning", "Pedagogie"],
    trustSummary: "Utile pour les experts et organismes qui veulent structurer une offre de formation en ligne.",
    avatarUrl: "/experts/imane-najjar.png"
  },
  {
    id: "exp-017",
    profileId: "usr-expert-insurance-001",
    firstName: "Samir",
    lastName: "El Khatib",
    title: "Conseiller assurance & risques",
    city: "Casablanca",
    bio:
      "Conseiller specialise en contrats d'assurance, risques professionnels, responsabilite civile et lecture de clauses. Il aide les clients a comprendre ce qui est couvert, exclu ou negociable avant de signer.",
    domains: ["Finance", "Droit"],
    certifications: ["Courtier assurance", "Gestion des risques", "Conformite assurance"],
    hourlyRate: 390,
    languages: ["fr", "ar"],
    yearsExperience: 10,
    responseTime: "Moins de 30 min",
    nextAvailableSlot: "Aujourd'hui 16:30",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.6,
    totalReviews: 34,
    totalConsultations: 124,
    completionRate: 96,
    responseRate: 94,
    verifiedBadges: ["Identite verifiee", "Assurance", "Lecture de contrats"],
    trustSummary: "Particulierement utile avant signature, quand les exclusions et garanties doivent etre comprises.",
    avatarUrl: "/experts/samir-el-khatib.png"
  },
  {
    id: "exp-018",
    profileId: "usr-expert-ux-001",
    firstName: "Yasmine",
    lastName: "Kabbaj",
    title: "UX researcher",
    city: "Rabat",
    bio:
      "UX researcher specialisee en entretiens utilisateurs, tests de maquettes, parcours d'onboarding et diagnostic d'ergonomie. Elle rend les retours utilisateurs concrets et directement exploitables par une equipe produit.",
    domains: ["Marketing", "IT & Cybersecurite"],
    certifications: ["UX Research", "Design Thinking", "Analytics comportemental"],
    hourlyRate: 440,
    languages: ["fr", "en", "ar"],
    yearsExperience: 6,
    responseTime: "Moins de 20 min",
    nextAvailableSlot: "Demain 11:30",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.8,
    totalReviews: 28,
    totalConsultations: 93,
    completionRate: 97,
    responseRate: 93,
    verifiedBadges: ["Identite verifiee", "UX research", "Tests utilisateurs"],
    trustSummary: "Aide a comprendre ce que les utilisateurs font vraiment, pas seulement ce qu'ils disent vouloir.",
    avatarUrl: "/experts/yasmine-kabbaj.png"
  },
  {
    id: "exp-019",
    profileId: "usr-expert-compliance-001",
    firstName: "Badr",
    lastName: "Mouline",
    title: "Consultant conformite CNDP/RGPD",
    city: "Tanger",
    bio:
      "Consultant conformite specialise en donnees personnelles, cartographie des traitements, registres, mentions legales et bonnes pratiques de conservation. Il aide a transformer la conformite en plan d'action lisible.",
    domains: ["Droit", "IT & Cybersecurite"],
    certifications: ["DPO Foundation", "RGPD", "Protection donnees personnelles"],
    hourlyRate: 580,
    languages: ["fr", "ar", "en"],
    yearsExperience: 9,
    responseTime: "Moins de 25 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 37,
    totalConsultations: 148,
    completionRate: 98,
    responseRate: 97,
    verifiedBadges: ["Identite verifiee", "DPO", "Confidentialite stricte"],
    trustSummary: "Tres pertinent pour les plateformes manipulant fichiers, profils et donnees sensibles.",
    avatarUrl: "/experts/badr-mouline.png"
  },
  {
    id: "exp-020",
    profileId: "usr-expert-devops-001",
    firstName: "Anas",
    lastName: "Zeroual",
    title: "Ingenieur DevOps",
    city: "Fes",
    bio:
      "Ingenieur DevOps specialise en CI/CD, Docker, monitoring, deploiement cloud et observabilite. Il aide les projets a sortir du prototype fragile vers une infrastructure plus stable et surveillee.",
    domains: ["IT & Cybersecurite", "Architecture & Ingenierie"],
    certifications: ["Docker", "GitHub Actions", "Cloud monitoring"],
    hourlyRate: 540,
    languages: ["fr", "en", "ar"],
    yearsExperience: 8,
    responseTime: "Moins de 15 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 26,
    totalConsultations: 104,
    completionRate: 96,
    responseRate: 96,
    verifiedBadges: ["Identite verifiee", "DevOps", "Monitoring"],
    trustSummary: "Bon choix pour stabiliser un projet avant une soutenance, une demo client ou un lancement pilote.",
    avatarUrl: "/experts/anas-zeroual.png"
  },
  {
    id: "exp-021",
    profileId: "usr-expert-invest-001",
    firstName: "Kenza",
    lastName: "Rahmani",
    title: "Analyste investissement",
    city: "Casablanca",
    bio:
      "Analyste investissement specialisee en pitch decks, valorisation simple, lecture de risques et preparation de rendez-vous financeurs. Elle aide a rendre un dossier credible sans le sur-vendre.",
    domains: ["Finance", "Marketing"],
    certifications: ["Corporate finance", "Startup valuation", "Pitch deck"],
    hourlyRate: 610,
    languages: ["fr", "en", "ar"],
    yearsExperience: 9,
    responseTime: "Moins de 45 min",
    nextAvailableSlot: "Jeudi 10:30",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 32,
    totalConsultations: 121,
    completionRate: 97,
    responseRate: 91,
    verifiedBadges: ["Identite verifiee", "Investissement", "Pitch"],
    trustSummary: "Aide les fondateurs a parler finance avec precision, sans perdre le cote narratif du projet.",
    avatarUrl: "/experts/kenza-rahmani.png"
  },
  {
    id: "exp-022",
    profileId: "usr-expert-mental-001",
    firstName: "Nour",
    lastName: "Belaid",
    title: "Psychologue du travail",
    city: "Rabat",
    bio:
      "Psychologue du travail specialisee en stress professionnel, conflits d'equipe, fatigue decisionnelle et retour au travail. Ses consultations sont orientees ecoute, clarification et prochaines actions.",
    domains: ["Coaching", "RH & Recrutement", "Medecine & Sante"],
    certifications: ["Psychologie du travail", "Risques psychosociaux", "Mediation"],
    hourlyRate: 360,
    languages: ["fr", "ar"],
    yearsExperience: 11,
    responseTime: "Moins de 1 h",
    nextAvailableSlot: "Demain 18:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 61,
    totalConsultations: 218,
    completionRate: 98,
    responseRate: 92,
    verifiedBadges: ["Identite verifiee", "Ecoute", "Confidentialite stricte"],
    trustSummary: "Profil tres humain pour les situations professionnelles sensibles ou chargees emotionnellement.",
    avatarUrl: "/experts/nour-belaid.png"
  },
  {
    id: "exp-023",
    profileId: "usr-expert-tech-recruit-001",
    firstName: "Ayoub",
    lastName: "Lmrini",
    title: "Recruteur tech",
    city: "Casablanca",
    bio:
      "Recruteur tech specialise en profils developpeurs, data, cloud et product. Il aide les candidats a ameliorer CV, portfolio, entretiens techniques et positionnement salarial.",
    domains: ["RH & Recrutement", "IT & Cybersecurite", "Coaching"],
    certifications: ["Tech recruiting", "Assessment", "Sourcing IT"],
    hourlyRate: 330,
    languages: ["fr", "en", "ar"],
    yearsExperience: 7,
    responseTime: "Moins de 10 min",
    nextAvailableSlot: "Aujourd'hui 21:30",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "standard",
    averageRating: 4.6,
    totalReviews: 40,
    totalConsultations: 156,
    completionRate: 95,
    responseRate: 97,
    verifiedBadges: ["Identite verifiee", "Recrutement tech", "CV"],
    trustSummary: "Tres utile pour transformer un profil technique en candidature claire et credible.",
    avatarUrl: "/experts/ayoub-lmrini.png"
  },
  {
    id: "exp-024",
    profileId: "usr-expert-notary-001",
    firstName: "Latifa",
    lastName: "Ait Omar",
    title: "Conseil actes notariaux",
    city: "Marrakech",
    bio:
      "Conseillere specialisee en preparation d'actes, achat immobilier, donation, succession et documents administratifs. Elle aide a preparer les questions avant rendez-vous notarial.",
    domains: ["Droit", "Architecture & Ingenierie"],
    certifications: ["Droit notarial", "Immobilier", "Succession"],
    hourlyRate: 430,
    languages: ["fr", "ar"],
    yearsExperience: 12,
    responseTime: "Moins de 40 min",
    nextAvailableSlot: "Demain 15:30",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 35,
    totalConsultations: 138,
    completionRate: 97,
    responseRate: 92,
    verifiedBadges: ["Identite verifiee", "Immobilier", "Succession"],
    trustSummary: "Aide a arriver prepare devant un notaire, avec les bons documents et les bonnes questions.",
    avatarUrl: "/experts/latifa-ait-omar.png"
  },
  {
    id: "exp-025",
    profileId: "usr-expert-export-001",
    firstName: "Mounir",
    lastName: "Sefrioui",
    title: "Consultant commerce international",
    city: "Tanger",
    bio:
      "Consultant en import-export, incoterms, documentation douaniere, sourcing et risques logistiques. Il accompagne les PME qui veulent structurer une premiere operation internationale.",
    domains: ["Finance", "Droit", "Marketing"],
    certifications: ["Commerce international", "Douane", "Supply chain"],
    hourlyRate: 500,
    languages: ["fr", "en", "ar"],
    yearsExperience: 15,
    responseTime: "Moins de 35 min",
    nextAvailableSlot: "Vendredi 14:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 43,
    totalConsultations: 165,
    completionRate: 96,
    responseRate: 93,
    verifiedBadges: ["Identite verifiee", "Import-export", "Logistique"],
    trustSummary: "Bon profil pour eviter les erreurs couteuses lors d'une premiere operation internationale.",
    avatarUrl: "/experts/mounir-sefrioui.png"
  },
  {
    id: "exp-026",
    profileId: "usr-expert-interior-001",
    firstName: "Ghita",
    lastName: "Bennis",
    title: "Designer interieur",
    city: "Agadir",
    bio:
      "Designer interieur specialisee en optimisation d'espaces, choix de materiaux, budget renovation et coherence visuelle. Elle aide a arbitrer entre envie, contraintes et couts reels.",
    domains: ["Architecture & Ingenierie", "Marketing"],
    certifications: ["Design interieur", "Materiaux", "Gestion budget travaux"],
    hourlyRate: 350,
    languages: ["fr", "ar"],
    yearsExperience: 8,
    responseTime: "Moins de 1 h",
    nextAvailableSlot: "Samedi 10:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.6,
    totalReviews: 24,
    totalConsultations: 87,
    completionRate: 94,
    responseRate: 89,
    verifiedBadges: ["Identite verifiee", "Design interieur", "Budget"],
    trustSummary: "Aide les clients a clarifier un projet d'espace avant de depenser trop vite.",
    avatarUrl: "/experts/ghita-bennis.png"
  },
  {
    id: "exp-027",
    profileId: "usr-expert-growth-001",
    firstName: "Reda",
    lastName: "Amrani",
    title: "Growth marketer B2B",
    city: "Casablanca",
    bio:
      "Growth marketer specialise en prospection B2B, landing pages, emails, CRM et experimentation rapide. Il aide a construire une machine d'acquisition simple avant d'augmenter les budgets.",
    domains: ["Marketing", "IT & Cybersecurite", "Finance"],
    certifications: ["Growth marketing", "CRM", "Cold outreach"],
    hourlyRate: 530,
    languages: ["fr", "en"],
    yearsExperience: 8,
    responseTime: "Moins de 15 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "standard",
    averageRating: 4.7,
    totalReviews: 38,
    totalConsultations: 143,
    completionRate: 96,
    responseRate: 96,
    verifiedBadges: ["Identite verifiee", "Growth B2B", "CRM"],
    trustSummary: "Aide les entreprises B2B a tester des canaux sans transformer le marketing en usine a gaz.",
    avatarUrl: "/experts/reda-amrani.png"
  },
  {
    id: "exp-028",
    profileId: "usr-expert-admin-ops-001",
    firstName: "Soukaina",
    lastName: "Jabri",
    title: "Assistante administrative senior",
    city: "Fes",
    bio:
      "Specialiste des demarches administratives, preparation de dossiers, organisation documentaire et suivi de procedures. Elle accompagne les clients qui veulent gagner du temps sans rater une piece importante.",
    domains: ["Education", "Droit", "RH & Recrutement"],
    certifications: ["Gestion administrative", "Archivage numerique", "Relation usager"],
    hourlyRate: 220,
    languages: ["fr", "ar"],
    yearsExperience: 10,
    responseTime: "Moins de 20 min",
    nextAvailableSlot: "Aujourd'hui 18:00",
    validationStatus: "validated",
    isAvailableImmediately: true,
    confidentialityPolicy: "standard",
    averageRating: 4.5,
    totalReviews: 29,
    totalConsultations: 116,
    completionRate: 95,
    responseRate: 95,
    verifiedBadges: ["Identite verifiee", "Administratif", "Organisation"],
    trustSummary: "Profil simple et efficace pour preparer un dossier administratif sans se perdre.",
    avatarUrl: "/experts/soukaina-jabri.png"
  },
  {
    id: "exp-029",
    profileId: "usr-expert-psych-002",
    firstName: "Hajar",
    lastName: "El Mansouri",
    title: "Psychologue clinicienne",
    city: "Rabat",
    bio:
      "Psychologue clinicienne orientee anxiete, epuisement, decisions familiales et accompagnement de transition. Elle propose un cadre calme, clair et confidentiel.",
    domains: ["Medecine & Sante", "Coaching"],
    certifications: ["Psychologie clinique", "Gestion du stress", "Ecoute active"],
    hourlyRate: 360,
    languages: ["fr", "ar"],
    yearsExperience: 11,
    responseTime: "Moins de 25 min",
    nextAvailableSlot: "Aujourd'hui 20:00",
    validationStatus: "pending",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 64,
    totalConsultations: 238,
    completionRate: 98,
    responseRate: 97,
    verifiedBadges: ["Identite verifiee", "Sante mentale", "Confidentialite stricte"],
    trustSummary: "Tres appreciee pour les sujets personnels ou le client a besoin d'un cadre rassurant.",
    avatarUrl: "/experts/hajar-el-mansouri.png"
  },
  {
    id: "exp-030",
    profileId: "usr-expert-energy-001",
    firstName: "Tarik",
    lastName: "Bouziane",
    title: "Ingenieur energie solaire",
    city: "Ouarzazate",
    bio:
      "Ingenieur specialise en dimensionnement solaire, audit energetique, rentabilite d'installation et choix de materiel pour particuliers, hotels et petites usines.",
    domains: ["Architecture & Ingenierie", "Finance"],
    certifications: ["Energie solaire", "Audit energetique", "ROI projets"],
    hourlyRate: 620,
    flatRate: 2400,
    languages: ["fr", "ar", "en"],
    yearsExperience: 14,
    responseTime: "Moins de 45 min",
    nextAvailableSlot: "Jeudi 11:30",
    validationStatus: "pending",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.8,
    totalReviews: 49,
    totalConsultations: 171,
    completionRate: 97,
    responseRate: 92,
    verifiedBadges: ["Identite verifiee", "Ingenieur energie", "Etudes ROI"],
    trustSummary: "Bon choix pour comparer devis, production attendue et retour sur investissement.",
    avatarUrl: "/experts/tarik-bouziane.png"
  },
  {
    id: "exp-031",
    profileId: "usr-expert-tax-001",
    firstName: "Maha",
    lastName: "Serghini",
    title: "Conseillere fiscale independants",
    city: "Casablanca",
    bio:
      "Conseillere fiscale pour freelances, professions liberales et petites societes. Elle aide a comprendre TVA, charges, facturation, declarations et risques de regularisation.",
    domains: ["Finance", "Droit"],
    certifications: ["Fiscalite PME", "TVA", "Comptabilite simplifiee"],
    hourlyRate: 540,
    languages: ["fr", "ar"],
    yearsExperience: 13,
    responseTime: "Moins de 20 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "pending",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 58,
    totalConsultations: 219,
    completionRate: 98,
    responseRate: 96,
    verifiedBadges: ["Identite verifiee", "Fiscalite", "PME"],
    trustSummary: "Rend les questions fiscales comprehensibles avec des prochaines actions tres concretes.",
    avatarUrl: "/experts/maha-serghini.png"
  },
  {
    id: "exp-032",
    profileId: "usr-expert-ai-ops-001",
    firstName: "Othmane",
    lastName: "Lahlou",
    title: "Consultant IA operationnelle",
    city: "Tanger",
    bio:
      "Consultant IA specialise dans l'automatisation de processus, qualification de besoins, choix d'outils et prototypes simples pour equipes commerciales, support et operations.",
    domains: ["IT & Cybersecurite", "Marketing", "Education"],
    certifications: ["Automatisation IA", "No-code", "Process operations"],
    hourlyRate: 700,
    flatRate: 3200,
    languages: ["fr", "en", "ar"],
    yearsExperience: 9,
    responseTime: "Moins de 10 min",
    nextAvailableSlot: "Disponible maintenant",
    validationStatus: "pending",
    isAvailableImmediately: true,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.9,
    totalReviews: 45,
    totalConsultations: 154,
    completionRate: 97,
    responseRate: 98,
    verifiedBadges: ["Identite verifiee", "IA", "Automatisation"],
    trustSummary: "Transforme une idee IA vague en flux utile, mesurable et raisonnable a maintenir.",
    avatarUrl: "/experts/othmane-lahlou.png"
  },
  {
    id: "exp-033",
    profileId: "usr-expert-translation-001",
    firstName: "Rim",
    lastName: "Alaoui",
    title: "Traductrice juridique FR-AR-EN",
    city: "Fes",
    bio:
      "Traductrice specialisee en documents juridiques, dossiers administratifs, contrats et communications sensibles entre francais, arabe et anglais.",
    domains: ["Droit", "Education", "RH & Recrutement"],
    certifications: ["Traduction juridique", "Arabe francais anglais", "Documents officiels"],
    hourlyRate: 300,
    languages: ["fr", "ar", "en"],
    yearsExperience: 12,
    responseTime: "Moins de 30 min",
    nextAvailableSlot: "Demain 09:30",
    validationStatus: "pending",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.7,
    totalReviews: 41,
    totalConsultations: 133,
    completionRate: 97,
    responseRate: 94,
    verifiedBadges: ["Identite verifiee", "Traduction juridique", "Confidentialite"],
    trustSummary: "Utile lorsque le sens exact d'un document compte autant que la langue.",
    avatarUrl: "/experts/rim-alaoui.png"
  },
  {
    id: "exp-034",
    profileId: "usr-expert-events-001",
    firstName: "Nizar",
    lastName: "Essafi",
    title: "Producteur evenementiel",
    city: "Marrakech",
    bio:
      "Producteur evenementiel pour conferences, lancements de produit et evenements culturels. Il structure budget, planning, prestataires et gestion des risques terrain.",
    domains: ["Marketing", "Finance", "Coaching"],
    certifications: ["Production evenementielle", "Budget", "Experience client"],
    hourlyRate: 460,
    languages: ["fr", "ar", "en"],
    yearsExperience: 16,
    responseTime: "Moins de 1 h",
    nextAvailableSlot: "Vendredi 16:30",
    validationStatus: "pending",
    isAvailableImmediately: false,
    confidentialityPolicy: "standard",
    averageRating: 4.6,
    totalReviews: 36,
    totalConsultations: 128,
    completionRate: 95,
    responseRate: 90,
    verifiedBadges: ["Identite verifiee", "Evenementiel", "Budget"],
    trustSummary: "Aide a transformer une idee d'evenement en plan realiste, chiffre et coordonne.",
    avatarUrl: "/experts/nizar-essafi.png"
  },
  {
    id: "exp-035",
    profileId: "usr-expert-logistics-001",
    firstName: "Sofia",
    lastName: "Benjelloun",
    title: "Experte logistique e-commerce",
    city: "Kenitra",
    bio:
      "Experte en livraison e-commerce, stockage, retours, choix de transporteurs et indicateurs operationnels. Elle aide les marques a reduire les frictions apres la vente.",
    domains: ["Finance", "Marketing", "IT & Cybersecurite"],
    certifications: ["Logistique e-commerce", "Operations", "Tableaux de bord"],
    hourlyRate: 520,
    languages: ["fr", "ar"],
    yearsExperience: 10,
    responseTime: "Moins de 35 min",
    nextAvailableSlot: "Aujourd'hui 19:30",
    validationStatus: "pending",
    isAvailableImmediately: true,
    confidentialityPolicy: "standard",
    averageRating: 4.7,
    totalReviews: 33,
    totalConsultations: 112,
    completionRate: 96,
    responseRate: 95,
    verifiedBadges: ["Identite verifiee", "Logistique", "E-commerce"],
    trustSummary: "Tres utile pour diagnostiquer les pertes invisibles entre commande, livraison et retour.",
    avatarUrl: "/experts/sofia-benjelloun.png"
  },
  {
    id: "exp-036",
    profileId: "usr-expert-mediation-001",
    firstName: "Driss",
    lastName: "Kettani",
    title: "Mediateur conflits professionnels",
    city: "Rabat",
    bio:
      "Mediateur specialise en tensions d'equipe, conflits associes, communication difficile et preparation de discussions sensibles avant escalade juridique.",
    domains: ["RH & Recrutement", "Coaching", "Droit"],
    certifications: ["Mediation professionnelle", "Communication non violente", "RH"],
    hourlyRate: 480,
    languages: ["fr", "ar"],
    yearsExperience: 18,
    responseTime: "Moins de 40 min",
    nextAvailableSlot: "Jeudi 17:00",
    validationStatus: "validated",
    isAvailableImmediately: false,
    confidentialityPolicy: "strict_ok",
    averageRating: 4.8,
    totalReviews: 52,
    totalConsultations: 186,
    completionRate: 97,
    responseRate: 93,
    verifiedBadges: ["Identite verifiee", "Mediation", "RH"],
    trustSummary: "Bon profil quand la solution depend autant du relationnel que du cadre contractuel.",
    avatarUrl: "/experts/driss-kettani.png"
  }
];

export const expertValidationCases: ExpertValidationCase[] = [
  {
    id: "case-exp-029",
    expertId: "exp-029",
    submittedAt: "2026-06-16 08:40",
    priority: "critical",
    currentStep: "documents_review",
    aiRiskScore: 74,
    aiRecommendation: "manual_review",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier la concordance entre CNI, nom public et compte de paiement."
      },
      {
        id: "license",
        label: "Diplome et droit d'exercer",
        description: "Confirmer le diplome, le numero professionnel et les limites de teleconseil."
      },
      {
        id: "ethics",
        label: "Charte ethique signee",
        description: "Verifier la mention de non-urgence et la confidentialite des donnees sante."
      }
    ],
    documents: [
      {
        id: "doc-psy-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Nom et ville coherents avec le profil."
      },
      {
        id: "doc-psy-diploma",
        label: "Diplome psychologie clinique",
        status: "pending",
        note: "Attente de confirmation du numero de diplome."
      },
      {
        id: "doc-psy-charter",
        label: "Charte sante mentale",
        status: "verified",
        note: "Charte signee avec clause non-urgence."
      }
    ],
    redFlags: [
      "Domaine sensible : l'expert doit afficher les limites du conseil en ligne.",
      "Un justificatif de diplome reste a confirmer."
    ],
    adminNotes: [
      {
        author: "Leila Conformite",
        body: "Profil solide, mais validation impossible sans confirmation du diplome.",
        at: "Il y a 18 min"
      }
    ]
  },
  {
    id: "case-exp-030",
    expertId: "exp-030",
    submittedAt: "2026-06-15 16:10",
    priority: "normal",
    currentStep: "profile_review",
    aiRiskScore: 28,
    aiRecommendation: "approve_with_checks",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier l'identite et l'adresse professionnelle."
      },
      {
        id: "references",
        label: "References projet controlees",
        description: "Verifier au moins deux projets solaires cites dans le dossier."
      },
      {
        id: "pricing",
        label: "Tarifs coherents",
        description: "Controler que les forfaits ne promettent pas de resultat garanti."
      }
    ],
    documents: [
      {
        id: "doc-energy-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Controle automatique OK."
      },
      {
        id: "doc-energy-engineer",
        label: "Diplome ingenieur",
        status: "verified",
        note: "Document lisible et coherent."
      },
      {
        id: "doc-energy-references",
        label: "References chantier",
        status: "pending",
        note: "Deux references envoyees, verification manuelle restante."
      }
    ],
    redFlags: [],
    adminNotes: [
      {
        author: "Mehdi Qualite",
        body: "A verifier surtout sur les promesses de ROI dans la bio et les livrables.",
        at: "Hier"
      }
    ]
  },
  {
    id: "case-exp-031",
    expertId: "exp-031",
    submittedAt: "2026-06-16 09:25",
    priority: "high",
    currentStep: "interview",
    aiRiskScore: 46,
    aiRecommendation: "manual_review",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier CNI, compte bancaire et email professionnel."
      },
      {
        id: "tax_scope",
        label: "Perimetre fiscal clarifie",
        description: "Confirmer que les conseils restent informatifs et traces."
      },
      {
        id: "interview",
        label: "Entretien qualite effectue",
        description: "Simuler un cas freelance et evaluer la pedagogie."
      }
    ],
    documents: [
      {
        id: "doc-tax-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Controle manuel OK."
      },
      {
        id: "doc-tax-cert",
        label: "Certificat fiscalite PME",
        status: "verified",
        note: "Certificat coherent avec le CV."
      },
      {
        id: "doc-tax-sample",
        label: "Exemple de livrable anonymise",
        status: "pending",
        note: "Livrable demande pour juger la clarte des recommandations."
      }
    ],
    redFlags: ["Le profil mentionne TVA et regularisation : decision a documenter clairement."],
    adminNotes: [
      {
        author: "Imane Operations",
        body: "Entretien prevu aujourd'hui pour tester la qualite d'explication.",
        at: "Il y a 35 min"
      }
    ]
  },
  {
    id: "case-exp-032",
    expertId: "exp-032",
    submittedAt: "2026-06-15 11:50",
    priority: "high",
    currentStep: "decision",
    aiRiskScore: 52,
    aiRecommendation: "approve_with_checks",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier identite, entreprise et moyen de paiement."
      },
      {
        id: "data_privacy",
        label: "Confidentialite IA validee",
        description: "Confirmer les regles de donnees client, prompts et fichiers sensibles."
      },
      {
        id: "deliverables",
        label: "Livrables cadres",
        description: "Verifier que les prototypes IA n'impliquent pas de promesse de resultat automatique."
      }
    ],
    documents: [
      {
        id: "doc-ai-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Controle OK."
      },
      {
        id: "doc-ai-portfolio",
        label: "Portfolio projets IA",
        status: "verified",
        note: "Trois cas anonymises fournis."
      },
      {
        id: "doc-ai-privacy",
        label: "Engagement confidentialite",
        status: "verified",
        note: "Clause fichiers sensibles acceptee."
      }
    ],
    redFlags: ["Surveiller la formulation commerciale autour de l'IA pour eviter les promesses excessives."],
    adminNotes: [
      {
        author: "Leila Conformite",
        body: "Dossier complet. Validation possible si la note admin justifie les garde-fous IA.",
        at: "Il y a 12 min"
      }
    ]
  },
  {
    id: "case-exp-033",
    expertId: "exp-033",
    submittedAt: "2026-06-14 17:05",
    priority: "normal",
    currentStep: "documents_review",
    aiRiskScore: 31,
    aiRecommendation: "approve_with_checks",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier la piece d'identite et les langues annoncees."
      },
      {
        id: "samples",
        label: "Echantillons controles",
        description: "Comparer deux traductions anonymisees FR-AR-EN."
      },
      {
        id: "confidentiality",
        label: "Confidentialite documents",
        description: "Verifier l'engagement de non-conservation des documents sensibles."
      }
    ],
    documents: [
      {
        id: "doc-translation-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Controle OK."
      },
      {
        id: "doc-translation-samples",
        label: "Echantillons traduction",
        status: "verified",
        note: "Qualite suffisante pour documents administratifs."
      },
      {
        id: "doc-translation-confidentiality",
        label: "Engagement confidentialite",
        status: "missing",
        note: "Document manquant, validation bloquee."
      }
    ],
    redFlags: ["Document de confidentialite manquant pour des dossiers juridiques."],
    adminNotes: [
      {
        author: "Mehdi Qualite",
        body: "Bon profil, mais il faut demander la charte signee avant toute validation.",
        at: "Hier"
      }
    ]
  },
  {
    id: "case-exp-034",
    expertId: "exp-034",
    submittedAt: "2026-06-13 12:20",
    priority: "normal",
    currentStep: "profile_review",
    aiRiskScore: 37,
    aiRecommendation: "manual_review",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier l'identite et l'historique professionnel."
      },
      {
        id: "portfolio",
        label: "Portfolio evenementiel controle",
        description: "Verifier les references annoncees sur trois evenements."
      },
      {
        id: "insurance",
        label: "Responsabilite clarifiee",
        description: "Verifier que les conseils evenementiels ne couvrent pas l'execution terrain sans contrat."
      }
    ],
    documents: [
      {
        id: "doc-event-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Controle automatique OK."
      },
      {
        id: "doc-event-portfolio",
        label: "Portfolio",
        status: "pending",
        note: "Besoin de verifier deux references."
      },
      {
        id: "doc-event-insurance",
        label: "Responsabilite civile",
        status: "inconsistent",
        note: "Le document fourni est expire."
      }
    ],
    redFlags: ["Assurance expiree : ne pas valider avant correction."],
    adminNotes: [
      {
        author: "Imane Operations",
        body: "Demander un document d'assurance a jour avant decision.",
        at: "Il y a 2 h"
      }
    ]
  },
  {
    id: "case-exp-035",
    expertId: "exp-035",
    submittedAt: "2026-06-16 10:05",
    priority: "normal",
    currentStep: "interview",
    aiRiskScore: 34,
    aiRecommendation: "approve_with_checks",
    requiredChecks: [
      {
        id: "identity",
        label: "Identite confirmee",
        description: "Verifier l'identite, la ville et le compte de paiement."
      },
      {
        id: "references",
        label: "References operations controlees",
        description: "Verifier deux experiences logistiques citees dans le profil."
      },
      {
        id: "scope",
        label: "Perimetre conseil clarifie",
        description: "Confirmer que l'experte conseille les processus sans engager les transporteurs."
      }
    ],
    documents: [
      {
        id: "doc-logistics-identity",
        label: "Piece d'identite",
        status: "verified",
        note: "Controle OK."
      },
      {
        id: "doc-logistics-references",
        label: "References e-commerce",
        status: "pending",
        note: "Une reference confirmee, une reference restante."
      },
      {
        id: "doc-logistics-sample",
        label: "Exemple tableau de bord",
        status: "verified",
        note: "Livrable anonymise lisible et exploitable."
      }
    ],
    redFlags: [],
    adminNotes: [
      {
        author: "Mehdi Qualite",
        body: "Profil prometteur. Prevoir un court entretien sur la gestion des litiges livraison.",
        at: "Il y a 9 min"
      }
    ]
  }
];

export const missions: Mission[] = [
  {
    id: "mis-001",
    clientId: "usr-client-001",
    title: "Audit securite d'une plateforme de consultation",
    description:
      "Nous voulons auditer une application web de mise en relation avec paiement, fichiers sensibles et sessions video. Il faut identifier les risques, proposer une architecture securisee et prioriser les correctifs.",
    domain: "IT & Cybersecurite",
    mode: "crowdsourcing",
    budgetAmount: 8500,
    budgetPreference: "high",
    preferredLanguage: "fr",
    urgency: "within_week",
    confidentiality: "strict",
    complexityScore: 8.7,
    status: "in_progress",
    createdAt: "2026-06-14"
  },
  {
    id: "mis-002",
    clientId: "usr-client-001",
    title: "Creation d'entreprise et contrat commercial",
    description:
      "J'ai besoin d'un avis rapide sur la creation d'une SARL et la relecture d'un contrat commercial avant signature.",
    domain: "Droit",
    mode: "immediate",
    budgetAmount: 700,
    budgetPreference: "medium",
    preferredLanguage: "fr",
    urgency: "immediate",
    confidentiality: "strict",
    complexityScore: 4.2,
    status: "recommended",
    createdAt: "2026-06-15"
  },
  {
    id: "mis-003",
    clientId: "usr-client-001",
    title: "Business plan pour une application SaaS",
    description:
      "Je prepare un dossier de financement pour une plateforme SaaS. Il me faut une validation du modele economique, des hypotheses de revenu et du budget marketing.",
    domain: "Finance",
    mode: "scheduled",
    budgetAmount: 1200,
    budgetPreference: "medium",
    preferredLanguage: "fr",
    urgency: "within_24h",
    confidentiality: "standard",
    complexityScore: 6.4,
    status: "in_consultation",
    createdAt: "2026-06-12"
  },
  {
    id: "mis-004",
    clientId: "usr-client-001",
    title: "Orientation post-licence informatique",
    description:
      "Je cherche un avis sur les options apres une licence informatique : master, alternance, certification cloud ou lancement d'un projet personnel.",
    domain: "Education",
    mode: "scheduled",
    budgetAmount: 350,
    budgetPreference: "low",
    preferredLanguage: "fr",
    urgency: "flexible",
    confidentiality: "standard",
    complexityScore: 3.1,
    status: "completed",
    createdAt: "2026-06-05"
  },
  {
    id: "mis-005",
    clientId: "usr-client-005",
    title: "Verifier une promesse de vente immobiliere",
    description:
      "Je veux comprendre les clauses sensibles d'une promesse de vente et verifier les points techniques avant de m'engager.",
    domain: "Droit",
    mode: "scheduled",
    budgetAmount: 950,
    budgetPreference: "medium",
    preferredLanguage: "fr",
    urgency: "within_24h",
    confidentiality: "strict",
    complexityScore: 6.8,
    status: "recommended",
    createdAt: "2026-06-16"
  },
  {
    id: "mis-006",
    clientId: "usr-client-006",
    title: "Mettre en place une premiere hygiene cyber",
    description:
      "Notre petite equipe partage beaucoup de fichiers et nous voulons securiser les acces, les mots de passe et les sauvegardes sans gros projet technique.",
    domain: "IT & Cybersecurite",
    mode: "immediate",
    budgetAmount: 900,
    budgetPreference: "medium",
    preferredLanguage: "ar",
    urgency: "immediate",
    confidentiality: "strict",
    complexityScore: 5.9,
    status: "in_consultation",
    createdAt: "2026-06-16"
  },
  {
    id: "mis-007",
    clientId: "usr-client-007",
    title: "Structurer une offre e-learning",
    description:
      "Je suis expert metier et je veux transformer mes contenus en formation en ligne vendable avec modules, evaluation et parcours progressif.",
    domain: "Education",
    mode: "crowdsourcing",
    budgetAmount: 6200,
    budgetPreference: "high",
    preferredLanguage: "fr",
    urgency: "within_week",
    confidentiality: "standard",
    complexityScore: 7.9,
    status: "pending_ai",
    createdAt: "2026-06-15"
  },
  {
    id: "mis-008",
    clientId: "usr-client-008",
    title: "Optimiser une campagne B2B",
    description:
      "Nous avons une landing page, un CRM et une liste de prospects, mais peu de reponses. Je veux un audit rapide du message et du canal.",
    domain: "Marketing",
    mode: "scheduled",
    budgetAmount: 1100,
    budgetPreference: "medium",
    preferredLanguage: "en",
    urgency: "within_week",
    confidentiality: "standard",
    complexityScore: 4.9,
    status: "recommended",
    createdAt: "2026-06-14"
  },
  {
    id: "mis-009",
    clientId: "usr-client-009",
    title: "Comprendre mes obligations fiscales de freelance",
    description:
      "Je viens de commencer une activite independante et je veux savoir comment facturer, declarer et eviter les erreurs de TVA ou de charges.",
    domain: "Finance",
    mode: "immediate",
    budgetAmount: 780,
    budgetPreference: "medium",
    preferredLanguage: "ar",
    urgency: "within_24h",
    confidentiality: "strict",
    complexityScore: 5.6,
    status: "in_consultation",
    createdAt: "2026-06-16"
  },
  {
    id: "mis-010",
    clientId: "usr-client-010",
    title: "Evaluer un devis solaire pour mon atelier",
    description:
      "J'ai recu deux devis pour installer des panneaux solaires. Je veux comparer production, materiel, garanties, retour sur investissement et risques caches.",
    domain: "Architecture & Ingenierie",
    mode: "scheduled",
    budgetAmount: 1450,
    budgetPreference: "medium",
    preferredLanguage: "fr",
    urgency: "within_week",
    confidentiality: "standard",
    complexityScore: 6.7,
    status: "recommended",
    createdAt: "2026-06-15"
  },
  {
    id: "mis-011",
    clientId: "usr-client-011",
    title: "Automatiser le suivi des demandes clients",
    description:
      "Notre equipe support perd du temps entre emails, tableur et CRM. Je veux un prototype IA simple pour trier les demandes et proposer les prochaines actions.",
    domain: "IT & Cybersecurite",
    mode: "crowdsourcing",
    budgetAmount: 7200,
    budgetPreference: "high",
    preferredLanguage: "fr",
    urgency: "within_week",
    confidentiality: "strict",
    complexityScore: 8.1,
    status: "in_progress",
    createdAt: "2026-06-13"
  },
  {
    id: "mis-012",
    clientId: "usr-client-012",
    title: "Preparer une discussion difficile avec mon associe",
    description:
      "Nous avons un conflit sur les responsabilites et la repartition du travail. Je veux preparer une discussion constructive avant que la situation se bloque.",
    domain: "RH & Recrutement",
    mode: "scheduled",
    budgetAmount: 900,
    budgetPreference: "medium",
    preferredLanguage: "ar",
    urgency: "within_24h",
    confidentiality: "strict",
    complexityScore: 6.2,
    status: "recommended",
    createdAt: "2026-06-16"
  }
];

export const lots: CrowdsourcingLot[] = [
  {
    id: "lot-001",
    number: 1,
    title: "Audit applicatif et authentification",
    description: "Analyser les risques lies aux sessions, roles, JWT et acces aux donnees.",
    domain: "IT & Cybersecurite",
    budget: 2600,
    deadline: "2026-06-22",
    status: "in_progress",
    expertId: "exp-002"
  },
  {
    id: "lot-002",
    number: 2,
    title: "Conformite donnees sensibles",
    description: "Identifier les exigences CNDP/RGPD pour fichiers, consultations et profils.",
    domain: "Droit",
    budget: 2200,
    deadline: "2026-06-22",
    status: "accepted",
    expertId: "exp-001"
  },
  {
    id: "lot-003",
    number: 3,
    title: "Plan de priorisation et couts",
    description: "Consolider les correctifs selon impact, urgence, effort et budget.",
    domain: "Finance",
    budget: 1800,
    deadline: "2026-06-23",
    status: "assigned",
    expertId: "exp-004"
  },
  {
    id: "lot-004",
    number: 4,
    title: "Synthese UX et parcours confiance",
    description: "Verifier que le parcours client explique les recommandations IA et les garanties.",
    domain: "Marketing",
    budget: 1900,
    deadline: "2026-06-23",
    status: "created"
  },
  {
    id: "lot-005",
    number: 1,
    title: "Architecture pedagogique du parcours",
    description: "Transformer les contenus bruts en modules, objectifs, prerequis et progression mesurable.",
    domain: "Education",
    budget: 1800,
    deadline: "2026-06-24",
    status: "assigned",
    expertId: "exp-016"
  },
  {
    id: "lot-006",
    number: 2,
    title: "Plateforme et automatisation e-learning",
    description: "Comparer les outils, definir le tunnel d'inscription et automatiser les relances apprenants.",
    domain: "IT & Cybersecurite",
    budget: 2100,
    deadline: "2026-06-24",
    status: "created"
  },
  {
    id: "lot-007",
    number: 1,
    title: "Prototype IA de tri des tickets",
    description: "Proposer un flux simple pour classifier les demandes clients et suggerer la prochaine action.",
    domain: "IT & Cybersecurite",
    budget: 3200,
    deadline: "2026-06-21",
    status: "in_progress",
    expertId: "exp-032"
  },
  {
    id: "lot-008",
    number: 2,
    title: "Mesure ROI et adoption equipe",
    description: "Definir les indicateurs, le plan de test et les garde-fous pour que l'equipe utilise vraiment l'outil.",
    domain: "Coaching",
    budget: 1900,
    deadline: "2026-06-22",
    status: "accepted",
    expertId: "exp-036"
  }
];

export const consultations: Consultation[] = [
  {
    id: "con-001",
    missionId: "mis-003",
    clientId: "usr-client-001",
    expertId: "exp-004",
    modality: "video",
    status: "scheduled",
    scheduledAt: "2026-06-16 10:30",
    durationMinutes: 0,
    estimatedAmount: 0,
    messages: [
      { id: "msg-001", sender: "client", body: "Bonjour, je vous ai ajoute le brouillon du business plan.", at: "09:12" },
      { id: "msg-002", sender: "expert", body: "Bien recu. Je preparerai une grille d'hypotheses avant l'appel.", at: "09:18" }
    ]
  },
  {
    id: "con-002",
    missionId: "mis-002",
    clientId: "usr-client-001",
    expertId: "exp-001",
    modality: "chat",
    status: "in_session",
    startedAt: "2026-06-15 18:05",
    durationMinutes: 18,
    estimatedAmount: 135,
    messages: [
      { id: "msg-003", sender: "client", body: "Je veux verifier deux clauses avant signature.", at: "18:05" },
      { id: "msg-004", sender: "expert", body: "Envoyez-moi les clauses. Je vous reponds point par point.", at: "18:07" }
    ]
  },
  {
    id: "con-003",
    missionId: "mis-004",
    clientId: "usr-client-001",
    expertId: "exp-006",
    modality: "audio",
    status: "completed",
    startedAt: "2026-06-07 15:00",
    endedAt: "2026-06-07 15:45",
    durationMinutes: 45,
    estimatedAmount: 195,
    messages: [
      { id: "msg-005", sender: "expert", body: "Je vous ai resume les trois pistes conseillees.", at: "15:44" },
      { id: "msg-006", sender: "client", body: "Merci, c'est tres clair.", at: "15:45" }
    ]
  },
  {
    id: "con-004",
    missionId: "mis-006",
    clientId: "usr-client-006",
    expertId: "exp-015",
    modality: "video",
    status: "in_session",
    startedAt: "2026-06-16 11:10",
    durationMinutes: 26,
    estimatedAmount: 225,
    messages: [
      { id: "msg-007", sender: "client", body: "On veut commencer par les acces et les sauvegardes.", at: "11:10" },
      { id: "msg-008", sender: "expert", body: "Parfait. Je vais separer les actions urgentes de ce qui peut attendre.", at: "11:13" }
    ]
  },
  {
    id: "con-005",
    missionId: "mis-009",
    clientId: "usr-client-009",
    expertId: "exp-031",
    modality: "chat",
    status: "scheduled",
    scheduledAt: "2026-06-16 17:30",
    durationMinutes: 0,
    estimatedAmount: 0,
    messages: [
      { id: "msg-009", sender: "client", body: "Je peux vous envoyer mes trois premieres factures ?", at: "12:04" },
      { id: "msg-010", sender: "expert", body: "Oui, masquez les informations sensibles inutiles. Je regarderai la structure.", at: "12:09" }
    ]
  },
  {
    id: "con-006",
    missionId: "mis-010",
    clientId: "usr-client-010",
    expertId: "exp-030",
    modality: "video",
    status: "accepted",
    scheduledAt: "2026-06-17 09:00",
    durationMinutes: 0,
    estimatedAmount: 0,
    messages: [
      { id: "msg-011", sender: "expert", body: "Ajoutez les devis et une facture d'electricite recente si possible.", at: "14:22" },
      { id: "msg-012", sender: "client", body: "C'est fait. Je veux surtout comprendre le vrai retour sur investissement.", at: "14:31" }
    ]
  },
  {
    id: "con-007",
    missionId: "mis-008",
    clientId: "usr-client-008",
    expertId: "exp-027",
    modality: "audio",
    status: "completed",
    startedAt: "2026-06-14 16:00",
    endedAt: "2026-06-14 16:38",
    durationMinutes: 38,
    estimatedAmount: 336,
    messages: [
      { id: "msg-013", sender: "expert", body: "Le probleme vient moins du canal que de la promesse initiale.", at: "16:22" },
      { id: "msg-014", sender: "client", body: "Je comprends, on va tester un angle plus concret cette semaine.", at: "16:38" }
    ]
  },
  {
    id: "con-008",
    missionId: "mis-012",
    clientId: "usr-client-012",
    expertId: "exp-036",
    modality: "video",
    status: "scheduled",
    scheduledAt: "2026-06-16 19:00",
    durationMinutes: 0,
    estimatedAmount: 0,
    messages: [
      { id: "msg-015", sender: "client", body: "Je veux rester ferme sans casser la relation.", at: "10:18" },
      { id: "msg-016", sender: "expert", body: "Nous allons preparer les faits, les limites et une proposition de sortie.", at: "10:26" }
    ]
  }
];

export const payments: Payment[] = [
  {
    id: "pay-001",
    consultationId: "con-003",
    clientId: "usr-client-001",
    expertId: "exp-006",
    amount: 195,
    commission: 29,
    payout: 166,
    status: "paid",
    createdAt: "2026-06-07"
  },
  {
    id: "pay-002",
    lotId: "lot-001",
    clientId: "usr-client-001",
    expertId: "exp-002",
    amount: 2600,
    commission: 390,
    payout: 2210,
    status: "pending",
    createdAt: "2026-06-15"
  },
  {
    id: "pay-003",
    consultationId: "con-004",
    clientId: "usr-client-006",
    expertId: "exp-015",
    amount: 225,
    commission: 34,
    payout: 191,
    status: "pending",
    createdAt: "2026-06-16"
  },
  {
    id: "pay-004",
    consultationId: "con-007",
    clientId: "usr-client-008",
    expertId: "exp-027",
    amount: 336,
    commission: 50,
    payout: 286,
    status: "paid",
    createdAt: "2026-06-14"
  },
  {
    id: "pay-005",
    lotId: "lot-007",
    clientId: "usr-client-011",
    expertId: "exp-032",
    amount: 3200,
    commission: 480,
    payout: 2720,
    status: "pending",
    createdAt: "2026-06-15"
  },
  {
    id: "pay-006",
    consultationId: "con-005",
    clientId: "usr-client-009",
    expertId: "exp-031",
    amount: 270,
    commission: 41,
    payout: 229,
    status: "pending",
    createdAt: "2026-06-16"
  },
  {
    id: "pay-007",
    lotId: "lot-003",
    clientId: "usr-client-001",
    expertId: "exp-004",
    amount: 1800,
    commission: 270,
    payout: 1530,
    status: "paid",
    createdAt: "2026-06-15"
  },
  {
    id: "pay-008",
    consultationId: "con-008",
    clientId: "usr-client-012",
    expertId: "exp-036",
    amount: 240,
    commission: 36,
    payout: 204,
    status: "pending",
    createdAt: "2026-06-16"
  }
];

export const reviews: Review[] = [
  {
    id: "rev-001",
    consultationId: "con-003",
    clientId: "usr-client-001",
    expertId: "exp-006",
    rating: 5,
    comment: "Conseils tres pratiques et plan d'action clair pour choisir la suite de mon parcours.",
    createdAt: "2026-06-07"
  },
  {
    id: "rev-002",
    consultationId: "con-002",
    clientId: "usr-client-001",
    expertId: "exp-001",
    rating: 5,
    comment: "Reponses rapides et tres rassurantes sur les clauses sensibles.",
    createdAt: "2026-06-15"
  },
  {
    id: "rev-003",
    consultationId: "con-001",
    clientId: "usr-client-002",
    expertId: "exp-014",
    rating: 5,
    comment: "Ines a transforme notre idee vague en vrai parcours MVP. On savait enfin quoi construire en premier.",
    createdAt: "2026-06-10"
  },
  {
    id: "rev-004",
    consultationId: "con-001",
    clientId: "usr-client-003",
    expertId: "exp-015",
    rating: 5,
    comment: "Rania a explique la securite simplement, avec une liste courte d'actions a faire tout de suite.",
    createdAt: "2026-06-11"
  },
  {
    id: "rev-005",
    consultationId: "con-003",
    clientId: "usr-client-004",
    expertId: "exp-011",
    rating: 5,
    comment: "Approche tres humaine pour un sujet familial sensible. Je me suis senti ecoute et oriente.",
    createdAt: "2026-06-13"
  },
  {
    id: "rev-006",
    consultationId: "con-003",
    clientId: "usr-client-002",
    expertId: "exp-013",
    rating: 4,
    comment: "Diagnostic clair avant achat immobilier. Les risques etaient enfin objectifs.",
    createdAt: "2026-06-14"
  },
  {
    id: "rev-007",
    consultationId: "con-007",
    clientId: "usr-client-008",
    expertId: "exp-027",
    rating: 5,
    comment: "Reda a change notre maniere d'expliquer l'offre. En 40 minutes, le message etait plus net.",
    createdAt: "2026-06-14"
  },
  {
    id: "rev-008",
    consultationId: "con-004",
    clientId: "usr-client-006",
    expertId: "exp-015",
    rating: 5,
    comment: "Rania a donne une checklist cyber simple, sans faire peur et sans nous vendre un chantier enorme.",
    createdAt: "2026-06-16"
  },
  {
    id: "rev-009",
    consultationId: "con-005",
    clientId: "usr-client-009",
    expertId: "exp-031",
    rating: 5,
    comment: "Maha explique la fiscalite avec des exemples proches de ma situation. J'ai enfin une feuille de route.",
    createdAt: "2026-06-16"
  },
  {
    id: "rev-010",
    consultationId: "con-006",
    clientId: "usr-client-010",
    expertId: "exp-030",
    rating: 5,
    comment: "Tarik a repere deux hypotheses trop optimistes dans le devis solaire. Tres utile avant signature.",
    createdAt: "2026-06-15"
  },
  {
    id: "rev-011",
    consultationId: "con-008",
    clientId: "usr-client-012",
    expertId: "exp-036",
    rating: 5,
    comment: "Driss aide a poser les mots justes. Je suis sorti avec un plan de conversation, pas seulement des conseils.",
    createdAt: "2026-06-16"
  },
  {
    id: "rev-012",
    consultationId: "con-001",
    clientId: "usr-client-011",
    expertId: "exp-032",
    rating: 5,
    comment: "Othmane a ramene notre idee IA a un prototype testable en une semaine. Tres pragmatique.",
    createdAt: "2026-06-13"
  },
  {
    id: "rev-013",
    consultationId: "con-002",
    clientId: "usr-client-005",
    expertId: "exp-024",
    rating: 4,
    comment: "Latifa a simplifie la lecture des documents immobiliers et m'a signale les questions a poser au notaire.",
    createdAt: "2026-06-15"
  },
  {
    id: "rev-014",
    consultationId: "con-003",
    clientId: "usr-client-007",
    expertId: "exp-016",
    rating: 5,
    comment: "Imane a structure mon contenu de formation sans perdre ma facon d'expliquer. C'etait fluide.",
    createdAt: "2026-06-15"
  },
  {
    id: "rev-015",
    consultationId: "con-003",
    clientId: "usr-client-010",
    expertId: "exp-035",
    rating: 4,
    comment: "Sofia a identifie les vrais couts de livraison que notre tableau cachait. Tres concret.",
    createdAt: "2026-06-12"
  }
];

export const notifications: Notification[] = [
  {
    id: "not-001",
    userId: "usr-client-001",
    type: "crowdsourcing",
    title: "Lot accepte",
    body: "Youssef Bennani a accepte le Lot 1 de votre mission complexe.",
    actionUrl: "/missions/mis-001/crowdsource",
    read: false,
    createdAt: "Il y a 12 min"
  },
  {
    id: "not-002",
    userId: "usr-client-001",
    type: "consultation",
    title: "Rendez-vous confirme",
    body: "Karim Haddad a confirme la consultation video du 16/06 a 10:30.",
    actionUrl: "/consultations/con-001",
    read: false,
    createdAt: "Il y a 1 h"
  },
  {
    id: "not-003",
    userId: "usr-expert-001",
    type: "crowdsourcing",
    title: "Nouveau Lot assigne",
    body: "Vous avez ete selectionne pour l'audit applicatif d'une plateforme de consultation.",
    actionUrl: "/lots/lot-001",
    read: false,
    createdAt: "Il y a 20 min"
  },
  {
    id: "not-004",
    userId: "usr-admin-001",
    type: "system",
    title: "Validation en attente",
    body: "7 dossiers experts attendent une decision administrateur.",
    actionUrl: "/admin/experts/pending",
    read: false,
    createdAt: "Aujourd'hui"
  },
  {
    id: "not-005",
    userId: "usr-client-006",
    type: "consultation",
    title: "Consultation cyber en cours",
    body: "Rania Boussaid vous a envoye la premiere checklist d'actions prioritaires.",
    actionUrl: "/consultations/con-004",
    read: false,
    createdAt: "Il y a 8 min"
  },
  {
    id: "not-006",
    userId: "usr-client-009",
    type: "consultation",
    title: "Creneau fiscal confirme",
    body: "Maha Serghini a confirme votre session de 17:30 sur les obligations freelance.",
    actionUrl: "/consultations/con-005",
    read: false,
    createdAt: "Il y a 24 min"
  },
  {
    id: "not-007",
    userId: "usr-client-011",
    type: "crowdsourcing",
    title: "Lot IA demarre",
    body: "Othmane Lahlou a demarre le prototype de tri des tickets support.",
    actionUrl: "/lots/lot-007",
    read: false,
    createdAt: "Il y a 31 min"
  },
  {
    id: "not-008",
    userId: "usr-expert-002",
    type: "consultation",
    title: "Nouvelle demande compatible",
    body: "Une mission juridique immobiliere correspond a vos criteres stricts de confidentialite.",
    actionUrl: "/missions/mis-005",
    read: true,
    createdAt: "Hier"
  },
  {
    id: "not-009",
    userId: "usr-admin-003",
    type: "payment",
    title: "Paiements a rapprocher",
    body: "3 nouvelles transactions attendent le rapprochement commission et payout expert.",
    actionUrl: "/admin/payments",
    read: false,
    createdAt: "Aujourd'hui"
  },
  {
    id: "not-010",
    userId: "usr-admin-004",
    type: "system",
    title: "Activite reseau en hausse",
    body: "Le fil reseau a recu 6 nouvelles publications et 42 reponses cette semaine.",
    actionUrl: "/network",
    read: false,
    createdAt: "Aujourd'hui"
  }
];

export const successStories: SuccessStory[] = [
  {
    id: "story-001",
    clientName: "Sara Benali",
    clientRole: "Fondatrice SaaS",
    expertId: "exp-014",
    title: "Un MVP clarifie en 48 heures",
    summary:
      "La mission a commence par une question simple : que faut-il construire en premier ? L'experte a transforme le besoin en parcours MVP, criteres de validation et backlog priorise.",
    outcome: "Backlog MVP pret, 3 risques produits identifies, prochain test utilisateur planifie.",
    domain: "Marketing"
  },
  {
    id: "story-002",
    clientName: "Omar Naciri",
    clientRole: "Gerant PME",
    expertId: "exp-015",
    title: "Premiere securisation sans jargon",
    summary:
      "Le client voulait securiser ses acces et ses fichiers sans lancer un gros projet. La consultation a donne une feuille de route courte et applicable.",
    outcome: "MFA active, droits nettoyes, sauvegarde et checklist cyber mises en place.",
    domain: "IT & Cybersecurite"
  },
  {
    id: "story-003",
    clientName: "Ilham Bakkali",
    clientRole: "Particulier",
    expertId: "exp-011",
    title: "Un sujet sensible traite avec calme",
    summary:
      "La plateforme a permis de trouver une juriste capable d'ecouter, cadrer les options et orienter les prochaines demarches.",
    outcome: "Documents classes, prochaines etapes juridiques clarifiees, niveau de stress reduit.",
    domain: "Droit"
  },
  {
    id: "story-004",
    clientName: "Adil Fassi",
    clientRole: "Responsable commercial B2B",
    expertId: "exp-027",
    title: "Une campagne B2B remise sur de bons rails",
    summary:
      "Le client avait des outils mais peu de reponses. L'expert a retravaille la promesse, les segments et le premier message de prospection.",
    outcome: "2 nouvelles sequences testees, taux de reponse pilote passe de 3% a 11%.",
    domain: "Marketing"
  },
  {
    id: "story-005",
    clientName: "Khadija Mernissi",
    clientRole: "Freelance design",
    expertId: "exp-031",
    title: "La fiscalite rendue respirable",
    summary:
      "La mission portait sur les premieres factures, la TVA et les obligations annuelles. L'experte a transforme l'anxiete administrative en calendrier clair.",
    outcome: "Modele de facture corrige, calendrier fiscal pose, points de vigilance notes.",
    domain: "Finance"
  },
  {
    id: "story-006",
    clientName: "Safae Mokhtari",
    clientRole: "Responsable support",
    expertId: "exp-032",
    title: "Un prototype IA utile, pas magique",
    summary:
      "L'equipe voulait automatiser le tri des demandes sans perdre le controle humain. La mission a produit un flux simple et testable.",
    outcome: "Prototype de qualification pret, 5 categories support definies, garde-fous documentes.",
    domain: "IT & Cybersecurite"
  },
  {
    id: "story-007",
    clientName: "Walid Rhazali",
    clientRole: "Associe PME",
    expertId: "exp-036",
    title: "Un conflit prepare avant l'escalade",
    summary:
      "La consultation a aide le client a formuler les faits, les limites et une proposition d'accord sans attaquer la relation.",
    outcome: "Plan de discussion, points non negociables et prochaine reunion cadree.",
    domain: "RH & Recrutement"
  }
];

export const expertCollections: ExpertCollection[] = [
  {
    id: "collection-001",
    title: "Lancer une plateforme digitale",
    description: "Produit, architecture, securite, finance et acquisition pour passer de l'idee a un prototype credible.",
    domain: "IT & Cybersecurite",
    expertIds: ["exp-002", "exp-014", "exp-009", "exp-004", "exp-008"]
  },
  {
    id: "collection-002",
    title: "Creer et proteger son entreprise",
    description: "Contrats, fiscalite, business plan et confidentialite pour demarrer avec moins d'angles morts.",
    domain: "Droit",
    expertIds: ["exp-001", "exp-010", "exp-004", "exp-011"]
  },
  {
    id: "collection-003",
    title: "Sante, coaching et decisions personnelles",
    description: "Des profils doux et verifies pour comprendre, preparer et avancer sur des sujets sensibles.",
    domain: "Medecine & Sante",
    expertIds: ["exp-005", "exp-012", "exp-003", "exp-006"]
  },
  {
    id: "collection-004",
    title: "Immobilier et travaux sans mauvaise surprise",
    description: "Diagnostic technique, faisabilite, lecture de plans et risques juridiques avant de signer.",
    domain: "Architecture & Ingenierie",
    expertIds: ["exp-007", "exp-013", "exp-001"]
  },
  {
    id: "collection-005",
    title: "Freelance, fiscalite et documents propres",
    description: "Facturation, declarations, traduction de documents et organisation administrative pour travailler plus sereinement.",
    domain: "Finance",
    expertIds: ["exp-031", "exp-010", "exp-033", "exp-028"]
  },
  {
    id: "collection-006",
    title: "Automatiser une equipe sans la brusquer",
    description: "IA operationnelle, securite, conduite du changement et mesure de ROI pour introduire les bons outils.",
    domain: "IT & Cybersecurite",
    expertIds: ["exp-032", "exp-015", "exp-036", "exp-004"]
  },
  {
    id: "collection-007",
    title: "Lancer, vendre et livrer une offre e-commerce",
    description: "Acquisition, logistique, finance et experience client pour eviter les pertes apres la commande.",
    domain: "Marketing",
    expertIds: ["exp-027", "exp-035", "exp-021", "exp-018"]
  },
  {
    id: "collection-008",
    title: "Projet solaire ou renovation technique",
    description: "Comparer devis, risques techniques, budget et rentabilite avant de s'engager.",
    domain: "Architecture & Ingenierie",
    expertIds: ["exp-030", "exp-013", "exp-026", "exp-007"]
  }
];

export const networkPosts: NetworkPost[] = [
  {
    id: "post-001",
    authorName: "Rania Boussaid",
    authorRole: "Analyste cybersecurite",
    avatarUrl: "/experts/rania-boussaid.png",
    type: "insight",
    title: "Avant de payer un audit complet, verifiez deja ces 4 points",
    body:
      "MFA, droits admin, sauvegardes et partage de fichiers. Sur beaucoup de PME, 80% du risque visible vient de ces points simples.",
    domain: "IT & Cybersecurite",
    createdAt: "Il y a 18 min",
    replies: 6,
    initials: "RB"
  },
  {
    id: "post-002",
    authorName: "Mariam Lahlou",
    authorRole: "Juriste droit de la famille",
    avatarUrl: "/experts/mariam-lahlou.png",
    type: "availability",
    title: "Deux creneaux ouverts ce soir pour dossiers sensibles",
    body:
      "Consultations courtes possibles en francais ou arabe. Les informations restent limitees au cadre de la mission.",
    domain: "Droit",
    createdAt: "Il y a 42 min",
    replies: 3,
    initials: "ML"
  },
  {
    id: "post-003",
    authorName: "Sara Benali",
    authorRole: "Cliente SaaS",
    avatarUrl: undefined,
    type: "success",
    title: "Retour d'experience : le matching m'a evite trois rendez-vous inutiles",
    body:
      "J'ai surtout apprecie les raisons de recommandation. On comprend pourquoi tel expert est propose, pas seulement son score.",
    domain: "Marketing",
    createdAt: "Hier",
    replies: 11,
    initials: "SB"
  },
  {
    id: "post-004",
    authorName: "Adam Chraibi",
    authorRole: "Consultant data & IA",
    avatarUrl: "/experts/adam-chraibi.png",
    type: "question",
    title: "Question du jour : quel livrable IA attendez-vous vraiment ?",
    body:
      "Un rapport, un prototype, une automatisation, ou une decision ? Bien nommer le livrable change completement le matching.",
    domain: "IT & Cybersecurite",
    createdAt: "Hier",
    replies: 8,
    initials: "AC"
  },
  {
    id: "post-005",
    authorName: "Maha Serghini",
    authorRole: "Conseillere fiscale independants",
    avatarUrl: "/experts/maha-serghini.png",
    type: "insight",
    title: "Freelances : la premiere erreur fiscale est souvent une erreur de calendrier",
    body:
      "Avant d'optimiser quoi que ce soit, notez les dates, les seuils et les justificatifs. La clarte administrative vaut souvent plus qu'une astuce.",
    domain: "Finance",
    createdAt: "Il y a 1 h",
    replies: 9,
    initials: "MS"
  },
  {
    id: "post-006",
    authorName: "Tarik Bouziane",
    authorRole: "Ingenieur energie solaire",
    avatarUrl: "/experts/tarik-bouziane.png",
    type: "question",
    title: "Devis solaire : vous regardez le prix ou la production garantie ?",
    body:
      "Deux devis au meme prix peuvent raconter deux projets tres differents. Puissance, orientation, garanties et maintenance changent tout.",
    domain: "Architecture & Ingenierie",
    createdAt: "Il y a 2 h",
    replies: 7,
    initials: "TB"
  },
  {
    id: "post-007",
    authorName: "Othmane Lahlou",
    authorRole: "Consultant IA operationnelle",
    avatarUrl: "/experts/othmane-lahlou.png",
    type: "insight",
    title: "Un bon prototype IA doit pouvoir etre abandonne sans regret",
    body:
      "Commencez petit : une categorie, un flux, un indicateur. Si le test ne prouve rien, le prototype etait deja trop gros.",
    domain: "IT & Cybersecurite",
    createdAt: "Aujourd'hui",
    replies: 14,
    initials: "OL"
  },
  {
    id: "post-008",
    authorName: "Safae Mokhtari",
    authorRole: "Cliente support",
    type: "success",
    title: "On a enfin nomme notre probleme support",
    body:
      "Je pensais demander une IA. En realite, il fallait d'abord classer nos demandes et clarifier qui decide quoi.",
    domain: "IT & Cybersecurite",
    createdAt: "Aujourd'hui",
    replies: 12,
    initials: "SM"
  },
  {
    id: "post-009",
    authorName: "Driss Kettani",
    authorRole: "Mediateur conflits professionnels",
    avatarUrl: "/experts/driss-kettani.png",
    type: "availability",
    title: "Creneaux courts pour preparer une discussion sensible",
    body:
      "Une heure suffit souvent pour clarifier les faits, les limites et une proposition acceptable avant une reunion difficile.",
    domain: "RH & Recrutement",
    createdAt: "Il y a 3 h",
    replies: 5,
    initials: "DK"
  },
  {
    id: "post-010",
    authorName: "Sofia Benjelloun",
    authorRole: "Experte logistique e-commerce",
    avatarUrl: "/experts/sofia-benjelloun.png",
    type: "insight",
    title: "Le cout d'un retour client ne se limite jamais au transport",
    body:
      "Stock, temps support, remboursement, reconditionnement, perte de confiance : mesurez tout avant de juger un transporteur.",
    domain: "Marketing",
    createdAt: "Hier",
    replies: 6,
    initials: "SB"
  },
  {
    id: "post-011",
    authorName: "Hajar El Mansouri",
    authorRole: "Psychologue clinicienne",
    avatarUrl: "/experts/hajar-el-mansouri.png",
    type: "availability",
    title: "Deux sessions disponibles pour sujets personnels urgents",
    body:
      "Cadre confidentiel, rythme calme, consultation possible en francais ou arabe selon ce qui vous met le plus a l'aise.",
    domain: "Medecine & Sante",
    createdAt: "Hier",
    replies: 4,
    initials: "HM"
  },
  {
    id: "post-012",
    authorName: "Rim Alaoui",
    authorRole: "Traductrice juridique FR-AR-EN",
    type: "question",
    title: "Traduire un contrat, c'est parfois expliquer une intention",
    body:
      "Quand une clause parait floue, je recommande de clarifier le sens avant de chercher le mot parfait.",
    domain: "Droit",
    createdAt: "Lundi",
    replies: 8,
    initials: "RA"
  }
];
