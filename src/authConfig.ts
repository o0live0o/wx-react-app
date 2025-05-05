import { Configuration, PopupRequest } from "@azure/msal-browser";

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "a7c66bf1-300f-462a-8258-f57414f21ec2",
        authority: "https://login.microsoftonline.com/f9ffb96b-5c70-45eb-884f-caeadd571298",
        redirectUri: "/backend",
    },
    system: {
        allowPlatformBroker: false, // Disables WAM Broker
    },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest: PopupRequest = {
    scopes: ["User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
