import type { SOCScenario } from '../../../types/soc';

export const threatIntelScenario: SOCScenario = {
  id: 'threat-intel-apt29',
  module: 'soc',
  category: 'threat-intel',
  titleKey: 'scenarios.threat-intel-apt29.title',
  descriptionKey: 'scenarios.threat-intel-apt29.description',
  difficulty: 'hard',
  estimatedTime: 25,
  mitreTechniques: ['T1105', 'T1059.001'],
  tags: ['Threat Intel', 'APT29', 'Attribution', 'IOCs'],
  evidence: [
    {
      id: 'ioc-list',
      type: 'text',
      titleKey: 'Extracted IOCs from Incident',
      data: {
        content: `IP Addresses:
185.10.20.30
198.51.100.99

Domains:
login.microsoft-secure-auth.com
api.update-telemetry.net

Hashes (SHA256):
a1b2c3d4e5f6... (cozy_payload.dll)
9f8e7d6c5b4a... (dropper.exe)

TTPs Observed:
- Spearphishing with malicious ISO attachment
- Use of Cobalt Strike for lateral movement
- Exfiltration over web services (OneDrive)`
      }
    }
  ],
  questions: [
    {
      id: 'q1', type: 'multiple-choice', questionKey: 'scenarios.threat-intel-apt29.q1',
      options: [
        { key: 'scenarios.threat-intel-apt29.q1_opt1', value: 'apt29' },
        { key: 'scenarios.threat-intel-apt29.q1_opt2', value: 'lazarus' },
        { key: 'scenarios.threat-intel-apt29.q1_opt3', value: 'fin7' }
      ],
      correctAnswer: 'apt29',
      explanationKey: 'scenarios.threat-intel-apt29.q1_exp',
      points: 100
    }
  ],
  socData: {}
};
