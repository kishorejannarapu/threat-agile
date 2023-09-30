interface TechnicalAssets {
  id: string;
  name:string;
  description: string;
  type: "external-entity" | "process" | "datastore";
  usage: "business" | "devops";
  used_as_client_by_human: boolean;
  out_of_scope: boolean;
  justification_out_of_scope: string;
  size: "system" | "service" | "application" | "component";
  technology:
    | "unknown-technology"
    | "client-system"
    | "browser"
    | "desktop"
    | "mobile-app"
    | "devops-client"
    | "web-server"
    | "web-application"
    | "application-server"
    | "database"
    | "file-server"
    | "local-file-system"
    | "erp"
    | "cms"
    | "web-service-rest"
    | "web-service-soap"
    | "ejb"
    | "search-index"
    | "search-engine"
    | "service-registry"
    | "reverse-proxy"
    | "load-balancer"
    | "build-pipeline"
    | "sourcecode-repository"
    | "artifact-registry"
    | "code-inspection-platform"
    | "monitoring"
    | "ldap-server"
    | "container-platform"
    | "batch-processing"
    | "event-listener"
    | "identity-provider"
    | "identity-store-ldap"
    | "identity-store-database"
    | "tool"
    | "cli"
    | "task"
    | "function"
    | "gateway"
    | "iot-device"
    | "message-queue"
    | "stream-processing"
    | "service-mesh"
    | "data-lake"
    | "report-engine"
    | "ai"
    | "mail-server"
    | "vault"
    | "hsm"
    | "waf"
    | "ids"
    | "ips"
    | "scheduler"
    | "mainframe"
    | "block-storage"
    | "library";
  internet: boolean;
  machine: "physical" | "virtual" | "container" | "serverless";
  encryption:
    | "none"
    | "transparent"
    | "data-with-symmetric-shared-key"
    | "data-with-asymmetric-shared-key"
    | "data-with-enduser-individual-key";
  owner: string;
  confidentiality:
    | "public"
    | "internal"
    | "restricted"
    | "confidential"
    | "strictly-confidential";
  integrity:
    | "archive"
    | "operational"
    | "important"
    | "critical"
    | "mission-critical";
  availability:
    | "archive"
    | "operational"
    | "important"
    | "critical"
    | "mission-critical";
  justification_cia_rating: string;
  multi_tenant: boolean;
  redundant: boolean;
  custom_developed_parts: boolean;
  data_assets_processed: string[]; // Sequence of IDs to reference
  data_assets_stored: string[]; // Sequence of IDs to reference
  data_formats_accepted: string[];
  communication_links: string[];
}
export default TechnicalAssets;
