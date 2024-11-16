import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import { Provider } from "@/components/provider";

import { App } from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-z6t2oh6nmqknn0ih.us.auth0.com"
      clientId="RNghdHw4yXbKU1AuODAtWAPK7sw7b5dH"
      authorizationParams={{
        redirect_uri: `${window.location.origin}`,
      }}
    >
      <Provider>
        <App />
      </Provider>
    </Auth0Provider>
  </StrictMode>
);
