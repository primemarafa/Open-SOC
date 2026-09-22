import type { SOCScenario } from '../../../types/soc';

export const networkTrafficScenario: SOCScenario = {
  id: 'network-c2-beaconing',
  module: 'soc',
  category: 'network',
  titleKey: 'scenarios.network-c2-beaconing.title',
  descriptionKey: 'scenarios.network-c2-beaconing.description',
  difficulty: 'medium',
  estimatedTime: 25,
  mitreTechniques: ['T1071'],
  tags: ['Network', 'C2', 'Beaconing', 'PCAP'],
  evidence: [
    {
      id: 'net-flows',
      type: 'log',
      titleKey: 'Network Flow Logs',
      data: {
        logs: [
          '2026-09-22T10:00:00Z 10.0.2.45:49152 -> 198.51.100.5:443 TCP 1500B',
          '2026-09-22T10:00:30Z 10.0.2.45:49153 -> 198.51.100.5:443 TCP 1520B',
          '2026-09-22T10:01:00Z 10.0.2.45:49154 -> 198.51.100.5:443 TCP 1490B',
          '2026-09-22T10:01:15Z 10.0.2.45:51222 -> 8.8.8.8:53 UDP 75B',
          '2026-09-22T10:01:30Z 10.0.2.45:49155 -> 198.51.100.5:443 TCP 1515B',
          '2026-09-22T10:02:00Z 10.0.2.45:49156 -> 198.51.100.5:443 TCP 1505B',
          '2026-09-22T10:02:30Z 10.0.2.45:49157 -> 198.51.100.5:443 TCP 1500B',
          '2026-09-22T10:03:00Z 10.0.2.45:49158 -> 198.51.100.5:443 TCP 1510B',
          '2026-09-22T10:03:05Z 10.0.2.45:49159 -> 10.0.1.10:445 TCP 2000B',
          '2026-09-22T10:03:30Z 10.0.2.45:49160 -> 198.51.100.5:443 TCP 1495B',
          '2026-09-22T10:04:00Z 10.0.2.45:49161 -> 198.51.100.5:443 TCP 1500B',
          '2026-09-22T10:04:30Z 10.0.2.45:49162 -> 198.51.100.5:443 TCP 1505B',
        ]
      }
    }
  ],
  questions: [
    {
      id: 'q1', type: 'multiple-choice', questionKey: 'scenarios.network-c2-beaconing.q1',
      options: [
        { key: 'scenarios.network-c2-beaconing.q1_opt1', value: '198.51.100.5' },
        { key: 'scenarios.network-c2-beaconing.q1_opt2', value: '8.8.8.8' },
        { key: 'scenarios.network-c2-beaconing.q1_opt3', value: '10.0.1.10' }
      ],
      correctAnswer: '198.51.100.5',
      explanationKey: 'scenarios.network-c2-beaconing.q1_exp',
      points: 50
    },
    {
      id: 'q2', type: 'multiple-choice', questionKey: 'scenarios.network-c2-beaconing.q2',
      options: [
        { key: 'scenarios.network-c2-beaconing.q2_opt1', value: '30s' },
        { key: 'scenarios.network-c2-beaconing.q2_opt2', value: '60s' },
        { key: 'scenarios.network-c2-beaconing.q2_opt3', value: '15s' }
      ],
      correctAnswer: '30s',
      explanationKey: 'scenarios.network-c2-beaconing.q2_exp',
      points: 50
    }
  ],
  socData: {}
};
