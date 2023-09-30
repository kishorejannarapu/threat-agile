interface CommunicationLinks {
  id: string;
  name:string;
  target: string;
  description: string;
  protocol:
    | "unknown-protocol"
    | "http"
    | "https"
    | "ws"
    | "wss"
    | "reverse-proxy-web-protocol"
    | "reverse-proxy-web-protocol-encrypted"
    | "mqtt"
    | "jdbc"
    | "jdbc-encrypted"
    | "odbc"
    | "odbc-encrypted"
    | "sql-access-protocol"
    | "sql-access-protocol-encrypted"
    | "nosql-access-protocol"
    | "nosql-access-protocol-encrypted"
    | "binary"
    | "binary-encrypted"
    | "text"
    | "text-encrypted"
    | "ssh"
    | "ssh-tunnel"
    | "smtp"
    | "smtp-encrypted"
    | "pop3"
    | "pop3-encrypted"
    | "imap"
    | "imap-encrypted"
    | "ftp"
    | "ftps"
    | "sftp"
    | "scp"
    | "ldap"
    | "ldaps"
    | "jms"
    | "nfs"
    | "smb"
    | "smb-encrypted"
    | "local-file-access"
    | "nrpe"
    | "xmpp"
    | "iiop"
    | "iiop-encrypted"
    | "jrmp"
    | "jrmp-encrypted"
    | "in-process-library-call"
    | "container-spawning";
  authentication:
    | "none"
    | "credentials"
    | "session-id"
    | "token"
    | "client-certificate"
    | "two-factor"
    | "externalized";
  authorization: "none" | "technical-user" | "enduser-identity-propagation";
  tags: string[];
  vpn: true;
  ip_filtered: false;
  readonly: false;
  usage: "business" | "devops";
  data_assets_sent: string[];
  data_assets_received: string[];
}

export default CommunicationLinks;
