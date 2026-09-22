import type { Scenario } from './scenario';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type AlertStatus = 'new' | 'investigating' | 'resolved' | 'false-positive';
export type AlertVerdict = 'true-positive' | 'false-positive' | 'benign';

export interface SIEMAlert {
  id: string;
  timestamp: string;
  severity: AlertSeverity;
  source: string;
  ruleName: string;
  description: string;
  sourceIP?: string;
  destIP?: string;
  user?: string;
  hostname?: string;
  rawLog?: string;
}

export interface EmailHeader {
  from: string;
  to: string;
  subject: string;
  date: string;
  replyTo?: string;
  returnPath?: string;
  spf?: string;
  dkim?: string;
  dmarc?: string;
  xOriginalIP?: string;
  messageId?: string;
}

export interface PhishingEmail {
  headers: EmailHeader;
  body: string;
  attachments?: { name: string; type: string; hash: string; size: string }[];
  urls?: string[];
}

export interface NetworkFlow {
  timestamp: string;
  srcIP: string;
  srcPort: number;
  dstIP: string;
  dstPort: number;
  protocol: string;
  bytes: number;
  packets: number;
  duration: number;
  flags?: string;
}

export interface SIGMARule {
  title: string;
  description: string;
  status: string;
  level: string;
  logsource: { product?: string; service?: string; category?: string };
  detection: Record<string, unknown>;
}

export type SOCScenario = Scenario & {
  module: 'soc';
  socData?: {
    alerts?: SIEMAlert[];
    email?: PhishingEmail;
    networkFlows?: NetworkFlow[];
    sigmaRule?: SIGMARule;
  };
};
