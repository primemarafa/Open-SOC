import type { SOCScenario } from '../../../types/soc';

export const incidentInvestigationScenario: SOCScenario = {
  id: 'incident-ransomware',
  module: 'soc',
  category: 'incident',
  titleKey: 'scenarios.incident-ransomware.title',
  descriptionKey: 'scenarios.incident-ransomware.description',
  difficulty: 'hard',
  estimatedTime: 40,
  mitreTechniques: ['T1486', 'T1059', 'T1110'],
  tags: ['Ransomware', 'Incident Response', 'Kill Chain'],
  evidence: [
    {
      id: 'incident-timeline',
      type: 'text',
      titleKey: 'Incident Timeline Logs',
      data: {
        content: `08:00 - VPN login success for user 'jsmith' from IP 185.20.10.5 (Anomalous Geo)
08:05 - 'jsmith' accesses network share \\\\FS01\\Finance
08:10 - Multiple failed RDP attempts from VPN IP to DC01
08:15 - Successful RDP login to DC01 using 'Administrator' credentials
08:20 - Execution of 'pscp.exe' on DC01 (transferring tools)
08:25 - Execution of 'vssadmin.exe delete shadows /all /quiet' on multiple endpoints via GPO
08:30 - CPU spikes across 50% of endpoints, files appended with '.locked' extension
08:35 - Ransom note 'HOW_TO_DECRYPT.txt' created on desktops`
      }
    }
  ],
  questions: [
    {
      id: 'q1', type: 'multiple-choice', questionKey: 'scenarios.incident-ransomware.q1',
      options: [
        { key: 'scenarios.incident-ransomware.q1_opt1', value: 'vpn-compromise' },
        { key: 'scenarios.incident-ransomware.q1_opt2', value: 'phishing' },
        { key: 'scenarios.incident-ransomware.q1_opt3', value: 'exploit' }
      ],
      correctAnswer: 'vpn-compromise',
      explanationKey: 'scenarios.incident-ransomware.q1_exp',
      points: 50
    },
    {
      id: 'q2', type: 'multiple-choice', questionKey: 'scenarios.incident-ransomware.q2',
      options: [
        { key: 'scenarios.incident-ransomware.q2_opt1', value: 'delete-shadow-copies' },
        { key: 'scenarios.incident-ransomware.q2_opt2', value: 'exfiltrate-data' },
        { key: 'scenarios.incident-ransomware.q2_opt3', value: 'establish-persistence' }
      ],
      correctAnswer: 'delete-shadow-copies',
      explanationKey: 'scenarios.incident-ransomware.q2_exp',
      points: 50
    }
  ],
  socData: {}
};
