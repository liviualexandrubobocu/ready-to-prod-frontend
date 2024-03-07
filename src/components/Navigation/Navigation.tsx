// External

import React, { Suspense, useEffect } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Internal
import { queryClient } from "../../utils/queryClient/queryClient";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { aadScopes } from "../../infrastructure/auth.config";
import LoggedOut from "../LoggedOut/LoggedOut";
import useToken from "../../infrastructure/hooks/useToken";

const MainLayout = React.lazy(
  () => import("../../components/MainLayout/MainLayout"),
);
const HomePage = React.lazy(() => import("../../features/home/pages/HomePage"));
const UsersListPage = React.lazy(
  () => import("../../features/users/pages/UsersListPage"),
);
const UsersCreatePage = React.lazy(
  () => import("../../features/users/pages/UsersCreatePage"),
);
const UsersEditPage = React.lazy(
  () => import("../../features/users/pages/UsersEditPage"),
);
const TransactionsPage = React.lazy(
  () => import("../../features/transactions/pages/TransactionsPage"),
);

const Navigation = () => {
  const [accessToken] = useToken();

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("AccessToken", accessToken);
    }
  }, [accessToken]);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <MsalAuthenticationTemplate
                  interactionType={InteractionType.Redirect}
                  authenticationRequest={aadScopes as { scopes: [] }}
                  errorComponent={LoggedOut}
                >
                  <MainLayout />
                </MsalAuthenticationTemplate>
              }
            >
              <Route
                path="/"
                element={
                  <MsalAuthenticationTemplate
                    interactionType={InteractionType.Redirect}
                    authenticationRequest={aadScopes as { scopes: [] }}
                    errorComponent={LoggedOut}
                  >
                    <HomePage />
                  </MsalAuthenticationTemplate>
                }
              />

              <Route
                path="/users"
                element={
                  <MsalAuthenticationTemplate
                    interactionType={InteractionType.Redirect}
                    authenticationRequest={aadScopes as { scopes: [] }}
                    errorComponent={LoggedOut}
                  >
                    <UsersListPage />
                  </MsalAuthenticationTemplate>
                }
              />
              <Route
                path="/users/create"
                element={
                  <MsalAuthenticationTemplate
                    interactionType={InteractionType.Redirect}
                    authenticationRequest={aadScopes as { scopes: [] }}
                    errorComponent={LoggedOut}
                  >
                    <UsersCreatePage />
                  </MsalAuthenticationTemplate>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <MsalAuthenticationTemplate
                    interactionType={InteractionType.Redirect}
                    authenticationRequest={aadScopes as { scopes: [] }}
                    errorComponent={LoggedOut}
                  >
                    <UsersEditPage />
                  </MsalAuthenticationTemplate>
                }
              />
              <Route
                path="/transactions"
                element={
                  <MsalAuthenticationTemplate
                    interactionType={InteractionType.Redirect}
                    authenticationRequest={aadScopes as { scopes: [] }}
                    errorComponent={LoggedOut}
                  >
                    <TransactionsPage />
                  </MsalAuthenticationTemplate>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default Navigation;
