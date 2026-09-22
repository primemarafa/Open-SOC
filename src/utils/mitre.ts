export interface MitreTechnique {
  id: string;
  name: string;
  tactic: string;
  description: string;
}

export const MITRE_TACTICS = [
  'Reconnaissance', 'Resource Development', 'Initial Access', 'Execution',
  'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access',
  'Discovery', 'Lateral Movement', 'Collection', 'Command and Control',
  'Exfiltration', 'Impact'
] as const;

export const MITRE_TECHNIQUES: Record<string, MitreTechnique> = {
  'T1566': { id: 'T1566', name: 'Phishing', tactic: 'Initial Access', description: 'Adversaries may send phishing messages to gain access to victim systems.' },
  'T1566.001': { id: 'T1566.001', name: 'Spearphishing Attachment', tactic: 'Initial Access', description: 'Adversaries may send spearphishing emails with a malicious attachment.' },
  'T1566.002': { id: 'T1566.002', name: 'Spearphishing Link', tactic: 'Initial Access', description: 'Adversaries may send spearphishing emails with a malicious link.' },
  'T1059': { id: 'T1059', name: 'Command and Scripting Interpreter', tactic: 'Execution', description: 'Adversaries may abuse command and script interpreters to execute commands.' },
  'T1059.001': { id: 'T1059.001', name: 'PowerShell', tactic: 'Execution', description: 'Adversaries may abuse PowerShell commands and scripts for execution.' },
  'T1053': { id: 'T1053', name: 'Scheduled Task/Job', tactic: 'Persistence', description: 'Adversaries may abuse task scheduling to facilitate execution.' },
  'T1547.001': { id: 'T1547.001', name: 'Registry Run Keys', tactic: 'Persistence', description: 'Adversaries may achieve persistence by adding a program to a startup folder or referencing it with a Registry run key.' },
  'T1003': { id: 'T1003', name: 'OS Credential Dumping', tactic: 'Credential Access', description: 'Adversaries may attempt to dump credentials to obtain account login and credential material.' },
  'T1021': { id: 'T1021', name: 'Remote Services', tactic: 'Lateral Movement', description: 'Adversaries may use Valid Accounts to log into a service specifically designed to accept remote connections.' },
  'T1071': { id: 'T1071', name: 'Application Layer Protocol', tactic: 'Command and Control', description: 'Adversaries may communicate using application layer protocols to avoid detection.' },
  'T1071.001': { id: 'T1071.001', name: 'Web Protocols', tactic: 'Command and Control', description: 'Adversaries may communicate using application layer protocols associated with web traffic.' },
  'T1048': { id: 'T1048', name: 'Exfiltration Over Alternative Protocol', tactic: 'Exfiltration', description: 'Adversaries may steal data by exfiltrating it over a different protocol than that of the existing command and control channel.' },
  'T1486': { id: 'T1486', name: 'Data Encrypted for Impact', tactic: 'Impact', description: 'Adversaries may encrypt data on target systems or on large numbers of systems in a network to interrupt availability.' },
  'T1027': { id: 'T1027', name: 'Obfuscated Files or Information', tactic: 'Defense Evasion', description: 'Adversaries may attempt to make an executable or file difficult to discover or analyze.' },
  'T1082': { id: 'T1082', name: 'System Information Discovery', tactic: 'Discovery', description: 'An adversary may attempt to get detailed information about the operating system and hardware.' },
  'T1057': { id: 'T1057', name: 'Process Discovery', tactic: 'Discovery', description: 'Adversaries may attempt to get information about running processes on a system.' },
  'T1083': { id: 'T1083', name: 'File and Directory Discovery', tactic: 'Discovery', description: 'Adversaries may enumerate files and directories or may search in specific locations.' },
  'T1078': { id: 'T1078', name: 'Valid Accounts', tactic: 'Persistence', description: 'Adversaries may obtain and abuse credentials of existing accounts as a means of gaining access.' },
  'T1190': { id: 'T1190', name: 'Exploit Public-Facing Application', tactic: 'Initial Access', description: 'Adversaries may attempt to take advantage of a weakness in an Internet-facing computer or program.' },
  'T1055': { id: 'T1055', name: 'Process Injection', tactic: 'Defense Evasion', description: 'Adversaries may inject code into processes in order to evade process-based defenses.' },
};

export function getTechniquesByTactic(tactic: string): MitreTechnique[] {
  return Object.values(MITRE_TECHNIQUES).filter(t => t.tactic === tactic);
}

export function getTechnique(id: string): MitreTechnique | undefined {
  return MITRE_TECHNIQUES[id];
}
