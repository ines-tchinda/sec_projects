import Keycloak from "keycloak-js";


const keycloak = new Keycloak({
    realm: "digital-app",
    url: "http://keycloak.adcm.orangecm/auth",
    "ssl-required": "external",
    resource: "Grisk",
    clientId: "Grisk",
    "public-client": true,
    "verifie-token-audience": true,
    "use-resource-role-mappings": true,
    "confidential-port": 0
});

export default keycloak;