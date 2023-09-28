interface RiskTracking {
  id: string;
  name: string;
  status:
    | "unchecked"
    | "in-discussion"
    | "accepted"
    | "in-progress"
    | "mitigated"
    | "false-positive";
  justification: string;
  ticket: string;
  date: string; // You might want to use a Date type here if you need to work with dates
  checked_by: string;
}

export default RiskTracking;