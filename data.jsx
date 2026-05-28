/* global React */
// Chapter data + small reusable components

const CHAPTERS = [
  {
    id: "ch1",
    num: "01",
    tag: "L'ESSENTIEL",
    title: "Minimum vital.",
    lead: "5 gestes. 30 minutes chrono. La majorité des risques quotidiens.",
    variant: "default",
    callouts: [
      {
        kind: "tip",
        label: "À FAIRE AUJOURD'HUI",
        body: "Ces 5 actions valent à elles seules tous les autres conseils du kit réunis. Pose-toi 30 minutes ce soir, et coche-les."
      }
    ],
    actions: [
      { id: "v1", title: "Active la 2FA partout", when: "AUJOURD'HUI", time: "10 min", desc: "Email, banque, cloud, réseaux. Une app comme Authy, jamais le SMS. Même si quelqu'un connaît ton mot de passe, il ne pourra pas entrer sans le deuxième code." },
      { id: "v2", title: "Installe un gestionnaire de mots de passe", when: "AUJOURD'HUI", time: "5 min", desc: "Bitwarden (gratuit), 1Password ou Proton Pass. Il invente et retient tes mots de passe à ta place." },
      { id: "v3", title: "Mises à jour automatiques", when: "AUJOURD'HUI", time: "3 min", desc: "Téléphone, PC, apps. Chaque mise à jour ferme une faille. Reporter, c'est rester vulnérable." },
      { id: "v4", title: "VPN sur les Wi-Fi publics", when: "AUJOURD'HUI", time: "5 min", desc: "Sans VPN, les autres sur le réseau peuvent voir ton trafic. Café, hôtel, gare, aéroport. Proton VPN a une offre gratuite fiable." },
      { id: "v5", title: "Jamais ton mot de passe au téléphone", when: "AUJOURD'HUI", time: "0 min", desc: "Ni par SMS, ni par email. Aucune banque ne te le demandera. C'est toujours une arnaque." }
    ]
  },
  {
    id: "ch2",
    num: "02",
    tag: "IDENTIFIANTS",
    title: "Mots de passe.",
    lead: "Une porte qui en ouvre 10. Un mot de passe réutilisé sur 10 sites, c'est 10 portes ouvertes dès qu'un seul service fuit.",
    variant: "alt",
    callouts: [
      {
        kind: "warn",
        label: "ATTENTION",
        body: "Les mots de passe enregistrés dans Chrome ou Safari sont souvent les premiers récupérés quand un ordinateur est infecté. Sors-les de ton navigateur."
      },
      {
        kind: "tip",
        label: "ASTUCE",
        body: "Tu n'as plus besoin de retenir des dizaines de mots de passe. Le gestionnaire s'en charge : il crée, stocke et remplit automatiquement des mots de passe uniques."
      }
    ],
    actions: [
      { id: "m1", title: "Installer un gestionnaire", when: "AUJOURD'HUI", desc: "Bitwarden, 1Password ou Proton Pass. Il crée et retient des mots de passe uniques à ta place." },
      { id: "m2", title: "Générer un mot de passe unique par service", when: "AUJOURD'HUI", desc: "Une seule fuite ne compromet plus tous tes comptes." },
      { id: "m3", title: "Sortir les mots de passe enregistrés du navigateur", when: "AUJOURD'HUI", desc: "Les navigateurs sont souvent la première cible des logiciels espions." },
      { id: "m4", title: "Vérifier sur haveibeenpwned.com si tes données ont fuité", when: "CETTE SEMAINE", desc: "Tape ton email. Le site te dit si tes identifiants traînent quelque part." },
      { id: "m5", title: "Ne jamais partager un mot de passe par message", when: "CETTE SEMAINE", desc: "Ni WhatsApp, ni SMS, ni email. Si tu dois transmettre, utilise une fonction de partage sécurisée du gestionnaire." }
    ]
  },
  {
    id: "ch3",
    num: "03",
    tag: "DEUXIÈME PORTE",
    title: "2FA.",
    lead: "Un mur de plus. Même si quelqu'un découvre ton mot de passe, il reste dehors sans le code généré par ton téléphone.",
    variant: "default",
    scenario: "Quelqu'un connaît ton mot de passe LinkedIn. Sans 2FA : il entre en quelques secondes. Avec 2FA : il voit « code à 6 chiffres requis » et reste dehors.",
    compare: [
      { tag: "ÉVITER", kind: "bad", label: "2FA PAR SMS", body: "Quelqu'un peut récupérer ton numéro et recevoir tes codes à ta place. C'est le SIM swap." },
      { tag: "FAIRE", kind: "good", label: "APP D'AUTH", body: "Authy, Google Authenticator, Aegis. Le code est généré localement, change toutes les 30 secondes." }
    ],
    actions: [
      { id: "f1", title: "Activer la 2FA sur email, banque, cloud, réseaux", when: "AUJOURD'HUI", desc: "Par ordre de priorité. L'email d'abord. Il sert à réinitialiser tout le reste." },
      { id: "f2", title: "Choisir une app plutôt que le SMS", when: "AUJOURD'HUI", desc: "Authy synchronise entre appareils. Aegis est open-source. Google Authenticator marche aussi." },
      { id: "f3", title: "Sauvegarder les codes de récupération", when: "CETTE SEMAINE", desc: "Si tu perds ton téléphone, ils permettent de récupérer l'accès à tes comptes. Imprime-les, range-les." },
      { id: "f4", title: "Envisager une clé physique (YubiKey)", when: "BONUS", desc: "Pour ton email pro ou tes comptes critiques. La protection la plus solide qui existe aujourd'hui." }
    ]
  },
  {
    id: "ch4",
    num: "04",
    tag: "RECONNAÎTRE LE PIÈGE",
    title: "Phishing.",
    lead: "Ce n'est pas technique, c'est psychologique. Un email, un SMS qui imite ta banque, un livreur, les impôts. Le but : te faire cliquer avant que tu réfléchisses.",
    variant: "alt",
    scenario: "SMS reçu : « Votre colis est bloqué. Cliquez ici pour le débloquer. » Tu fais quoi ? Tu ne cliques pas. Tu ouvres l'app du transporteur et tu colles ton numéro de suivi à la main. Si rien : c'était une arnaque.",
    callouts: [
      {
        kind: "warn",
        label: "ATTENTION",
        body: "Aucune banque, aucune administration ne te demande un mot de passe ou un code 2FA au téléphone. Si on te le demande, raccroche, et rappelle le numéro officiel toi-même."
      }
    ],
    actions: [
      { id: "p1", title: "Ne jamais donner un code 2FA au téléphone", when: "AUJOURD'HUI", desc: "Aucun service légitime ne te le demandera. Si on te le demande, c'est une arnaque." },
      { id: "p2", title: "Vérifier l'expéditeur exact, pas le nom affiché", when: "AUJOURD'HUI", desc: "« Banque XYZ » peut très bien envoyer depuis support@arnaque.ru. Regarde l'adresse complète." },
      { id: "p3", title: "Vérifier l'URL avant de saisir des identifiants", when: "CETTE SEMAINE", desc: "amaz0n.com, paypa1.fr, impots.gouv-fr.com : à un caractère près, tu n'es plus chez eux." },
      { id: "p4", title: "Installer uBlock Origin", when: "CETTE SEMAINE", desc: "Filtre les liens et trackers malveillants directement dans le navigateur." },
      { id: "p5", title: "Signaler les tentatives sur signal-spam.fr", when: "BONUS", desc: "Chaque signalement aide à fermer la prochaine campagne plus vite." }
    ]
  },
  {
    id: "ch5",
    num: "05",
    tag: "TON TRAFIC",
    title: "VPN & réseaux.",
    lead: "Chiffrer, masquer, protéger. Sur un Wi-Fi public, ton trafic peut être lu par d'autres personnes sur le même réseau.",
    variant: "invert",
    compare: [
      { tag: "SANS", kind: "bad", label: "WI-FI SANS VPN", body: "Café, hôtel, aéroport. Ton mail, tes URLs, tes mots de passe : tout est lisible comme une carte postale." },
      { tag: "AVEC", kind: "good", label: "WI-FI + VPN", body: "Tout ton trafic sort déjà chiffré. Les autres voient juste qu'il y a du trafic, jamais son contenu." }
    ],
    pull: "Un VPN chiffre ta connexion avant qu'elle ne quitte ton appareil.",
    actions: [
      { id: "n1", title: "Installer Proton VPN ou Mullvad", when: "AUJOURD'HUI", desc: "Proton VPN est gratuit, ça prend 5 minutes. Avant ton prochain Wi-Fi public." },
      { id: "n2", title: "Désactiver la connexion auto aux Wi-Fi inconnus", when: "AUJOURD'HUI", desc: "Ton téléphone peut se connecter tout seul à un faux hotspot qui imite « Free Wi-Fi »." },
      { id: "n3", title: "Désactiver le Wi-Fi partagé de ta box", when: "AUJOURD'HUI", desc: "Ta box Free ou SFR diffuse par défaut un réseau public. Des inconnus peuvent l'utiliser depuis la rue." },
      { id: "n4", title: "Passer à Firefox ou Brave", when: "CETTE SEMAINE", desc: "Moins de traçage par défaut. Brave bloque pubs et trackers d'origine." },
      { id: "n5", title: "Ne plus faire d'opérations bancaires sur Wi-Fi public", when: "BONUS", desc: "Si tu dois absolument, passe en 4G/5G plutôt." }
    ]
  },
  {
    id: "ch6",
    num: "06",
    tag: "AU QUOTIDIEN",
    title: "Hygiène.",
    lead: "Réduire la surface d'attaque. Chaque app désinstallée, chaque compte supprimé, c'est une porte qu'on referme.",
    variant: "default",
    callouts: [
      {
        kind: "tip",
        label: "ASTUCE",
        body: "Ouvre ton téléphone. Toutes les apps que tu n'as pas utilisées depuis 3 mois : désinstalle-les. Chaque app inutile, c'est une porte ouverte de moins."
      }
    ],
    actions: [
      { id: "h1", title: "Mises à jour automatiques activées partout", when: "AUJOURD'HUI", desc: "iOS, Android, navigateurs, apps. Une faille corrigée à temps, c'est une intrusion évitée." },
      { id: "h2", title: "Verrouillage biométrique + PIN 6 chiffres min", when: "AUJOURD'HUI", desc: "Face ID ou empreinte. Plus de code à 4 chiffres, c'est cassable en quelques minutes." },
      { id: "h3", title: "Désinstaller les apps non utilisées depuis 3 mois", when: "CETTE SEMAINE", desc: "Moins d'apps, moins de permissions, moins de risques." },
      { id: "h4", title: "Vérifier les permissions (micro, caméra, localisation)", when: "CETTE SEMAINE", desc: "Une app météo n'a aucune raison d'accéder à tes contacts." },
      { id: "h5", title: "Activer le chiffrement disque (BitLocker / FileVault)", when: "CETTE SEMAINE", desc: "Même si ton ordinateur est volé, les données restent illisibles sans ton mot de passe." },
      { id: "h6", title: "Sauvegarde régulière (disque externe ou cloud chiffré)", when: "CETTE SEMAINE", desc: "Si tu te fais ransomwarer, tu redémarres au lieu de payer." },
      { id: "h7", title: "Supprimer les vieux comptes (justdelete.me)", when: "BONUS", desc: "Le compte que t'as oublié en 2014 fuite probablement encore." }
    ]
  },
  {
    id: "ch7",
    num: "07",
    tag: "CE QUE TU TAPES",
    title: "IA & données.",
    lead: "Quand c'est gratuit, tu es le produit. Tout ce que tu tapes dans un chatbot IA peut être stocké, analysé, ou utilisé pour entraîner le modèle.",
    variant: "alt",
    scenario: "Tu colles ton RIB dans ChatGPT pour rédiger un email. Que devient-il ? Selon les paramètres activés, il peut être stocké, lu par des humains pour le contrôle qualité, ou intégré aux données d'entraînement. Tu ne le sauras probablement jamais.",
    callouts: [
      {
        kind: "warn",
        label: "ATTENTION",
        body: "Évite d'envoyer dans un chatbot IA (ChatGPT, Gemini, etc.) : mots de passe, données bancaires, documents confidentiels, infos médicales. Une fois envoyées, ces données peuvent circuler hors de ton contrôle."
      }
    ],
    actions: [
      { id: "i1", title: "Ne jamais coller de données sensibles dans un chatbot IA", when: "AUJOURD'HUI", desc: "RIB, mots de passe, contrats, dossiers médicaux. Anonymise avant de coller." },
      { id: "i2", title: "Désactiver l'entraînement sur tes données", when: "CETTE SEMAINE", desc: "Dans les paramètres de ChatGPT, Claude, Gemini : opt-out de l'entraînement." },
      { id: "i3", title: "Vérifier les paramètres de confidentialité des outils IA", when: "CETTE SEMAINE", desc: "Historique, partage, mémoire. Désactive ce que tu ne contrôles pas." },
      { id: "i4", title: "Exercer ton droit RGPD : suppression de tes données", when: "BONUS", desc: "Tu peux demander la suppression complète. C'est ton droit." }
    ]
  }
];

const ERRORS = [
  { txt: "Réutiliser le même mot de passe partout", why: "Une fuite quelque part, et tous tes comptes basculent." },
  { txt: "Ignorer les mises à jour pendant des semaines", why: "Chaque jour de retard, c'est une faille connue laissée ouverte." },
  { txt: "Se connecter au Wi-Fi d'un hôtel ou café sans VPN", why: "Ton trafic devient lisible par n'importe qui sur le même réseau." },
  { txt: "Stocker ses mots de passe dans Notes ou un mail", why: "Premier dossier ouvert en cas d'intrusion." },
  { txt: "Accepter toutes les permissions d'une app sans les lire", why: "Une app de lampe torche n'a pas besoin de tes contacts." },
  { txt: "Cliquer sur un lien dans un SMS sans vérifier l'expéditeur", why: "La majorité des arnaques actuelles passe par SMS." },
  { txt: "Envoyer carte d'identité, RIB ou fiche de paie par WhatsApp", why: "Tes documents restent indexés sur des serveurs hors de ton contrôle." },
  { txt: "Donner un code 2FA par téléphone à un « conseiller bancaire »", why: "Aucune banque ne demande jamais ce code." },
  { txt: "Coller des données confidentielles dans un chatbot IA", why: "Une fois envoyées, tu ne peux plus les rappeler." },
  { txt: "Publier date de naissance, adresse ou téléphone sur les réseaux", why: "Tout ce qui sert à se faire passer pour toi devient public." },
  { txt: "Garder le Wi-Fi et le Bluetooth allumés en permanence en public", why: "Deux vecteurs d'attaque ouverts en continu, sans raison." },
  { txt: "Croire qu'on est « trop petit » pour être ciblé", why: "Les attaques sont automatisées. Personne n'est trop petit." }
];

const RESOURCES = [
  { tag: "GESTIONNAIRES DE MOTS DE PASSE", links: ["bitwarden.com", "1password.com", "proton.me/pass"] },
  { tag: "2FA · APPS D'AUTHENTIFICATION", links: ["authy.com", "getaegis.app"] },
  { tag: "VPN · EMAIL CHIFFRÉ", links: ["protonvpn.com", "mullvad.net", "tuta.com"] },
  { tag: "DONNÉES FUITÉES", links: ["haveibeenpwned.com", "bonjourlafuite.eu.org"] },
  { tag: "ALIAS EMAIL", links: ["simplelogin.io", "addy.io"] },
  { tag: "BLOQUEUR · TRACKERS", links: ["ublockorigin.com"] },
  { tag: "SIGNALEMENT · ASSISTANCE", links: ["signal-spam.fr", "phishing-initiative.fr", "cybermalveillance.gouv.fr"] }
];

const GLOSSARY = [
  { term: "2FA", def: "Un deuxième verrou après ton mot de passe." },
  { term: "VPN", def: "Un tunnel chiffré qui masque ton trafic sur les réseaux publics." },
  { term: "Phishing", def: "Un faux message conçu pour te faire cliquer ou paniquer trop vite." },
  { term: "Infostealer", def: "Un logiciel espion qui vole ce qui est enregistré dans ton navigateur." },
  { term: "SIM swap", def: "Quand quelqu'un récupère ton numéro de téléphone pour recevoir tes codes à ta place." },
  { term: "Chiffrement", def: "Transformer des données en version illisible sans la bonne clé." },
  { term: "Tracker", def: "Un outil qui suit ce que tu fais en ligne pour collecter des données sur toi." },
  { term: "Métadonnées", def: "Des informations sur ton activité : quand, où, avec qui, combien de temps." },
  { term: "Ransomware", def: "Un logiciel qui bloque tes fichiers puis demande une rançon." },
  { term: "Navigateur", def: "L'application que tu utilises pour aller sur internet (Chrome, Safari, Firefox…)." },
  { term: "Opt-out", def: "Refuser que tes données servent à entraîner un modèle IA." },
  { term: "Cloud", def: "Des fichiers stockés sur les serveurs d'une entreprise plutôt que sur ton appareil." }
];

window.KIT_DATA = { CHAPTERS, ERRORS, RESOURCES, GLOSSARY };
