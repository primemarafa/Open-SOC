import type { SOCScenario } from '../../../types/soc';

export const aitmPhishingScenario: SOCScenario = {
  id: 'soc-aitm-phishing',
  module: 'soc',
  category: 'phishing',
  titleKey: 'Campagne Phishing AiTM & Vol de Session Entra ID',
  descriptionKey: 'Investigation d\'une attaque Adversary-in-the-Middle (Evilginx) contournant le MFA par interception de session ESTSAUTH et exfiltration de mails.',
  difficulty: 'hard',
  estimatedTime: 20,
  mitreTechniques: ['T1566.002', 'T1539', 'T1114.003'],
  tags: ['Phishing', 'AiTM', 'Evilginx', 'MFA Bypass', 'Entra ID', 'Token Theft'],
  evidence: [
    {
      id: 'email-aitm',
      type: 'email',
      titleKey: 'Email Suspect : Notification Partage SharePoint',
      data: {
        from: 'notification@sharepoint-verify[.]com',
        to: 'cfo@entreprise-defense.fr',
        date: '2026-09-22T08:14:00Z',
        subject: 'URGENT : Révision des Accords Financiers Q3 2026',
        headers: {
          from: 'notification@sharepoint-verify[.]com',
          to: 'cfo@entreprise-defense.fr',
          date: '2026-09-22T08:14:00Z',
          subject: 'URGENT : Révision des Accords Financiers Q3 2026',
          spf: 'FAIL (ip=185.220.101.5)',
          replyTo: 'collector@security-verify[.]com'
        },
        body: `Bonjour Monsieur le Directeur Financier,\n\nUn document confidentiel concernant la clôture comptable Q3 a été partagé avec vous.\n\nVeuillez vous authentifier sur le portail Microsoft 365 pour consulter le document :\nhttps://login.microsoftonline.security-verify[.]com/auth/sso?id=94821\n\nCe lien expire dans 24 heures.\n\nCordialement,\nSupport Sécurité Informatique`
      }
    },
    {
      id: 'siem-alerts-aitm',
      type: 'log',
      titleKey: 'SIEM Explorer : Logs Entra ID & Exchange Online',
      data: {
        alerts: [
          {
            id: 'ALERT-M365-01',
            timestamp: '2026-09-22T08:15:30Z',
            severity: 'low',
            source: 'Entra ID Sign-ins',
            ruleName: 'User Interactive Sign-in (MFA Success)',
            description: 'Connexion utilisateur réussie avec authentification multifacteur (FIDO2/Authenticator)',
            sourceIP: '195.154.12.30',
            user: 'cfo@entreprise-defense.fr',
            hostname: 'PARIS-HQ-LAPTOP',
            rawLog: '{"EventID": 50125, "User": "cfo@entreprise-defense.fr", "IP": "195.154.12.30", "City": "Paris", "Country": "FR", "MFA": "Satisfied"}'
          },
          {
            id: 'ALERT-M365-02',
            timestamp: '2026-09-22T08:19:12Z',
            severity: 'critical',
            source: 'Entra ID Identity Protection',
            ruleName: 'Impossible Travel / Token Replay Detected',
            description: 'Utilisation simultanée de la session ESTSAUTH depuis une localisation anormale (Lagos, Nigéria)',
            sourceIP: '102.89.41.112',
            destIP: '40.126.31.2',
            user: 'cfo@entreprise-defense.fr',
            hostname: 'UNKNOWN-LINUX-CLIENT',
            rawLog: '{"Alert": "ImpossibleTravel", "User": "cfo@entreprise-defense.fr", "SourceCity": "Lagos", "IP": "102.89.41.112", "SessionID": "ESTSAUTH-9921", "UserAgent": "Python-requests/2.31.0"}'
          },
          {
            id: 'ALERT-M365-03',
            timestamp: '2026-09-22T08:21:45Z',
            severity: 'high',
            source: 'Exchange Online Audit',
            ruleName: 'New-InboxRule : Forwarding to External Domain',
            description: 'Création d\'une règle de redirection automatique de tous les courriels contenant "facture" ou "virement"',
            sourceIP: '102.89.41.112',
            user: 'cfo@entreprise-defense.fr',
            hostname: 'ExchangeOnline-Cloud',
            rawLog: '{"Cmdlet": "New-InboxRule", "Name": "AutoArchiveInvoices", "ForwardTo": "exfil-invoices@proton.me", "DeleteMessage": true, "User": "cfo@entreprise-defense.fr"}'
          }
        ]
      }
    }
  ],
  questions: [
    {
      id: 'q1',
      type: 'multiple-choice',
      questionKey: 'Quel mécanisme technique a permis aux attaquants de contourner l\'authentification multifacteur (MFA) du CFO ?',
      options: [
        { key: 'Brute-force du mot de passe de l\'utilisateur', value: 'brute-force' },
        { key: 'Proxy inverse AiTM (Adversary-in-the-Middle) interceptant le cookie de session ESTSAUTH', value: 'aitm' },
        { key: 'Clonage de la carte SIM (SIM Swapping)', value: 'sim-swap' },
        { key: 'Attaque par dictionnaire sur le contrôleur de domaine', value: 'kerberoasting' }
      ],
      correctAnswer: 'aitm',
      explanationKey: 'L\'attaque utilise un reverse proxy (type Evilginx) placé entre la victime et les serveurs Microsoft. Lorsque la victime résout son MFA légitime, le proxy capture le cookie de session authentifié (ESTSAUTH) et le rejoue sans avoir besoin du mot de passe ni du MFA.',
      points: 25
    },
    {
      id: 'q2',
      type: 'free-text',
      questionKey: 'Quelle est l\'adresse IP publique utilisée par l\'attaquant pour réutiliser le token de session volé ?',
      correctAnswer: '102.89.41.112',
      explanationKey: 'L\'adresse IP 102.89.41.112 (située à Lagos) a généré l\'alerte d\'Impossible Travel dans Entra ID 4 minutes après la connexion légitime de Paris.',
      points: 25
    },
    {
      id: 'q3',
      type: 'multiple-choice',
      questionKey: 'Quelle action de persistance l\'attaquant a-t-il immédiatement configurée dans la messagerie Exchange ?',
      options: [
        { key: 'Suppression définitive du compte utilisateur', value: 'delete-user' },
        { key: 'Création d\'une boîte aux lettres partagée sans autorisation', value: 'shared-mailbox' },
        { key: 'Création d\'une règle de transfert de boîte de réception vers un compte externe Proton', value: 'forwarding-rule' },
        { key: 'Changement du mot de passe administrateur global', value: 'change-global-admin' }
      ],
      correctAnswer: 'forwarding-rule',
      explanationKey: 'La commande New-InboxRule configure un transfert silencieux des courriels vers exfil-invoices@proton.me avec suppression locale pour éviter que la victime ne remarque la compromission.',
      points: 25
    },
    {
      id: 'q4',
      type: 'multiple-choice',
      questionKey: 'En tant qu\'analyste SOC, quelle action de confinement devez-vous ordonner immédiatement sur Entra ID ?',
      options: [
        { key: 'Attendre l\'expiration naturelle de la session (environ 8 heures)', value: 'wait' },
        { key: 'Révoquer immédiatement toutes les sessions actives (Revoke Refresh Tokens) et supprimer la règle de transfert', value: 'revoke-sessions' },
        { key: 'Désactiver le pare-feu du poste Paris-HQ', value: 'disable-firewall' },
        { key: 'Envoyer un email d\'avertissement à l\'adresse exfil-invoices@proton.me', value: 'send-email' }
      ],
      correctAnswer: 'revoke-sessions',
      explanationKey: 'Puisque l\'attaquant possède un cookie de session valide, changer le mot de passe ne suffit pas : il est impératif d\'invalider immédiatement tous les Refresh Tokens via Microsoft Graph / Entra ID et d\'éliminer la règle de messagerie frauduleuse.',
      points: 25
    }
  ]
};
