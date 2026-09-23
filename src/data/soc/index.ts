import type { SOCScenario } from '../../types/soc';
import { siemAlertTriageScenario } from './scenarios/siem-alert-triage';
import { phishingAnalysisScenario } from './scenarios/phishing-analysis';
import { networkTrafficScenario } from './scenarios/network-traffic';
import { incidentInvestigationScenario } from './scenarios/incident-investigation';
import { malwareAnalysisScenario } from './scenarios/malware-analysis';
import { sigmaRulesScenario } from './scenarios/sigma-rules';
import { threatIntelScenario } from './scenarios/threat-intel';
import { aitmPhishingScenario } from './scenarios/aitm-phishing';

export const socScenarios: SOCScenario[] = [
  siemAlertTriageScenario,
  aitmPhishingScenario,
  phishingAnalysisScenario,
  networkTrafficScenario,
  incidentInvestigationScenario,
  malwareAnalysisScenario,
  sigmaRulesScenario,
  threatIntelScenario,
];

export const getSOCScenarioById = (id: string): SOCScenario | undefined =>
  socScenarios.find(s => s.id === id);
