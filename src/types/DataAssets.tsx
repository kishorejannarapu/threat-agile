interface DataAssets {
  id: string;
  name: string;
  description: string;
  usage: "business" | "devops";
  tags?: string[];
  origin: string;
  owner: string;
  quantity: "very-few" | "few" | "many" | "very-many";
  confidentiality: "public" | "internal" | "restricted" | "confidential" | "strictly-confidential";
  integrity: "archive" | "operational" | "important" | "critical" | "mission-critical";
  availability: "archive" | "operational" | "important" | "critical" | "mission-critical";
  justification_cia_rating: string;
}
export default DataAssets;
