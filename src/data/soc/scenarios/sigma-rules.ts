import type { SOCScenario } from '../../../types/soc';

export const sigmaRulesScenario: SOCScenario = {
  id: 'sigma-powershell-encoded',
  module: 'soc',
  category: 'sigma',
  titleKey: 'scenarios.sigma-powershell-encoded.title',
  descriptionKey: 'scenarios.sigma-powershell-encoded.description',
  difficulty: 'medium',
  estimatedTime: 20,
  mitreTechniques: ['T1059.001', 'T1027'],
  tags: ['SIGMA', 'PowerShell', 'Obfuscation', 'Threat Hunting'],
  evidence: [
    {
      id: 'sigma-rule',
      type: 'text',
      titleKey: 'Proposed SIGMA Rule',
      data: {
        content: `title: Suspicious PowerShell Encoded Command
id: a2345678-1234-1234-1234-123456789012
status: experimental
description: Detects execution of powershell with encoded command parameter
logsource:
    category: process_creation
    product: windows
detection:
    selection:
        Image|endswith: '\\powershell.exe'
        CommandLine|contains:
            - ' -enc '
            - ' -EncodedCommand '
            - ' -ec '
    condition: selection
falsepositives:
    - Legitimate administrative scripts
level: high`
      }
    }
  ],
  questions: [
    {
      id: 'q1', type: 'multiple-choice', questionKey: 'scenarios.sigma-powershell-encoded.q1',
      options: [
        { key: 'scenarios.sigma-powershell-encoded.q1_opt1', value: 'missing-event-id' },
        { key: 'scenarios.sigma-powershell-encoded.q1_opt2', value: 'too-broad' },
        { key: 'scenarios.sigma-powershell-encoded.q1_opt3', value: 'valid-rule' }
      ],
      correctAnswer: 'valid-rule',
      explanationKey: 'scenarios.sigma-powershell-encoded.q1_exp',
      points: 100
    }
  ],
  socData: {}
};
