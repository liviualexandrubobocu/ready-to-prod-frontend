// src/authConfig.js
import { Configuration } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: "3e151d4f-9432-4f6d-a0eb-bbd190daf5f1", // Your Azure AD Client ID
    authority:
      "https://login.microsoftonline.com/0b3fc178-b730-4e8b-9843-e81259237b77", // Your Azure AD Tenant ID
    redirectUri: "http://localhost:5173", // Set to your application's redirect URI
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your token cache is stored
    storeAuthStateInCookie: true, // Set to true if you have issues on IE11 or Edge
  },
};

export const aadScopes = {
  scopes: ["api://3e151d4f-9432-4f6d-a0eb-bbd190daf5f1/ready-to-prod"],
};
