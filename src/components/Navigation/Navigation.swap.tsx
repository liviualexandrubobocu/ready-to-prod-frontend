// External

import React, { Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Internal
import { queryClient } from "../../utils/queryClient/queryClient";


const MainLayout = React.lazy(
  () => import("../MainLayout/MainLayout"),
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
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout />
              }
            >
              <Route
                path="/"
                element={
                  <HomePage />
                }
              />

              <Route
                path="/users"
                element={
                  <UsersListPage />
                }
              />
              <Route
                path="/users/create"
                element={
                  <UsersCreatePage />
                }
              />
              <Route
                path="/users/:id"
                element={
                  <UsersEditPage />
                }
              />
              <Route
                path="/transactions"
                element={
                    <TransactionsPage />
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
