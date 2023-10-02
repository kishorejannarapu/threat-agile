interface IndividualRiskCategory {
  id: string;
  name: string;
  description: string;
  impact: string;
  asvs: string;
  cheat_sheet: string;
  action: string;
  mitigation: string;
  check: string;
  funciton: "business-side" | "architecture" | "development" | "operations";
  stride: "spoofing"|
  "tampering"|
  "repudiation"|
  "information-disclosure"|
  "denial-of-service"|
  "elevation-of-privilege";
  detection_logic: string;
  risk_assessment: string;
  false_positives: string;
  model_failure_possible_reason: false;
  cwe: string;
}
export default IndividualRiskCategory;
