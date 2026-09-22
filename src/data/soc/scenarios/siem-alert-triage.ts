import type { SOCScenario } from '../../../types/soc';

export const siemAlertTriageScenario: SOCScenario = {
  id: 'siem-brute-force',
  module: 'soc',
  category: 'siem',
  titleKey: 'scenarios.siem-brute-force.title',
  descriptionKey: 'scenarios.siem-brute-force.description',
  difficulty: 'easy',
  estimatedTime: 15,
  mitreTechniques: ['T1078'],
  tags: ['SIEM', 'Brute Force', 'RDP', 'Alert Triage'],
  evidence: [
    {
      id: 'siem-alerts',
      type: 'log',
      titleKey: 'SIEM Alerts',
      data: {
        alerts: [
          {
            id: 'AL-101',
            timestamp: '2026-09-22T08:14:22Z',
            severity: 'low',
            source: 'Windows_Event_Log',
            ruleName: 'Successful Login',
            description: 'User successfully logged into WIN-SRV-01',
            sourceIP: '10.0.5.50',
            destIP: '10.0.1.10',
            user: 'jdoe',
            hostname: 'WIN-SRV-01',
            rawLog: 'EventCode=4624 AccountName=jdoe SourceNetworkAddress=10.0.5.50'
          },
          {
            id: 'AL-102',
            timestamp: '2026-09-22T10:05:11Z',
            severity: 'medium',
            source: 'Firewall',
            ruleName: 'Outbound SSH Connection',
            description: 'Internal host connecting to external IP over port 22',
            sourceIP: '10.0.5.50',
            destIP: '198.51.100.22',
            user: 'unknown',
            hostname: 'unknown',
            rawLog: 'Action=Allow SrcIP=10.0.5.50 DstIP=198.51.100.22 DstPort=22 Protocol=TCP'
          },
          {
            id: 'AL-103',
            timestamp: '2026-09-22T11:42:01Z',
            severity: 'high',
            source: 'Windows_Event_Log',
            ruleName: 'Multiple Failed Logins',
            description: 'Excessive failed login attempts detected',
            sourceIP: '203.0.113.45',
            destIP: '10.0.1.15',
            user: 'Administrator',
            hostname: 'DC-01',
            rawLog: 'EventCode=4625 AccountName=Administrator SourceNetworkAddress=203.0.113.45 FailureReason=Unknown user name or bad password. (count=55)'
          },
          {
            id: 'AL-104',
            timestamp: '2026-09-22T11:42:55Z',
            severity: 'critical',
            source: 'Windows_Event_Log',
            ruleName: 'Successful Login After Bruteforce',
            description: 'Successful login following multiple failed attempts',
            sourceIP: '203.0.113.45',
            destIP: '10.0.1.15',
            user: 'Administrator',
            hostname: 'DC-01',
            rawLog: 'EventCode=4624 AccountName=Administrator SourceNetworkAddress=203.0.113.45 LogonType=3'
          },
          {
            id: 'AL-105',
            timestamp: '2026-09-22T11:45:00Z',
            severity: 'high',
            source: 'EDR',
            ruleName: 'Suspicious Process Execution',
            description: 'PowerShell executed with encoded command',
            sourceIP: '10.0.1.15',
            destIP: 'unknown',
            user: 'Administrator',
            hostname: 'DC-01',
            rawLog: 'Process=powershell.exe CommandLine="powershell.exe -enc JABzAD0ATgBlAHcALQBPAGIAagBlAGMAdAAgAEkATwAuAE0AZQBtAG8AcgB5AFMAdAByAGUAYQBtACgAWwBDAG8AbgB2AGUAcgB0AF0AOgA6AEYAcgBvAG0AQgBhAHMAZQA2ADQAUwB0AHIAaQBuAGcAKAAiAEgA..." ParentProcess=cmd.exe'
          }
        ]
      }
    }
  ],
  questions: [
    {
      id: 'q1', type: 'multiple-choice', questionKey: 'scenarios.siem-brute-force.q1',
      options: [
        { key: 'scenarios.siem-brute-force.q1_opt1', value: 'true-positive' },
        { key: 'scenarios.siem-brute-force.q1_opt2', value: 'false-positive' },
        { key: 'scenarios.siem-brute-force.q1_opt3', value: 'benign' }
      ],
      correctAnswer: 'true-positive',
      explanationKey: 'scenarios.siem-brute-force.q1_exp',
      points: 25
    },
    {
      id: 'q2', type: 'multiple-choice', questionKey: 'scenarios.siem-brute-force.q2',
      options: [
        { key: 'scenarios.siem-brute-force.q2_opt1', value: '10.0.1.15' },
        { key: 'scenarios.siem-brute-force.q2_opt2', value: '203.0.113.45' },
        { key: 'scenarios.siem-brute-force.q2_opt3', value: '10.0.5.50' }
      ],
      correctAnswer: '203.0.113.45',
      explanationKey: 'scenarios.siem-brute-force.q2_exp',
      points: 25
    },
    {
      id: 'q3', type: 'multiple-choice', questionKey: 'scenarios.siem-brute-force.q3',
      options: [
        { key: 'scenarios.siem-brute-force.q3_opt1', value: 'jdoe' },
        { key: 'scenarios.siem-brute-force.q3_opt2', value: 'Administrator' },
        { key: 'scenarios.siem-brute-force.q3_opt3', value: 'SYSTEM' }
      ],
      correctAnswer: 'Administrator',
      explanationKey: 'scenarios.siem-brute-force.q3_exp',
      points: 25
    },
    {
      id: 'q4', type: 'multiple-choice', questionKey: 'scenarios.siem-brute-force.q4',
      options: [
        { key: 'scenarios.siem-brute-force.q4_opt1', value: 'isolate' },
        { key: 'scenarios.siem-brute-force.q4_opt2', value: 'ignore' },
        { key: 'scenarios.siem-brute-force.q4_opt3', value: 'monitor' }
      ],
      correctAnswer: 'isolate',
      explanationKey: 'scenarios.siem-brute-force.q4_exp',
      points: 25
    }
  ],
  socData: {
    alerts: []
  }
};
