# Are you ready to prod frontend ?

This is a frontend project to sustain the initiative "Are you ready to prod?" course.

## 1. Create a react application with Vite and run it

`npm create vite@latest my-react-app --template react`
`cd my-react-app`
`npm i`
`npm run dev`

## 2. Install packages for frotend application for routing, forms, translations, react query, icons

`npm install react-router-dom formik react-i18next react-query react-icons`

## 3. Install prettier for formatting

`npm install --save-dev --save-exact prettier`

To use prettier you can do the following command:

`npx prettier . --write` will ensure formatting of all files

Also add this command to package json start

## 4. Setup Tailwind

We will use Tailwind as prefered library for frontend

### 4.1 Installation

`npm install -D postcss@latest autoprefixer@latest tailwindcss@latest @tailwindcss/forms@latest`

### 4.2 Init tailwind

`npx tailwindcss init -p`

### 4.3 Setup tailwind.config

module.exports = {
content: [
"./index.html",
"./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
],
theme: {
extend: {},
},
plugins: [],
}

Add in index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

### 4.4 Add postcss.config

// postcss.config.js
module.exports = {
plugins: {
tailwindcss: {},
autoprefixer: {},
}
}

## Setup backend connection

### 5.1 Setup Cors

In Nest.js App, in main.ts file set

```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

```

### 5.2 Setup reverse proxy

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, ""),
      },
    },
  },
});

```

## 6. Run for dev

npm run dev

## 7. Create architecture

/src
/api # Infrastructure layer for API calls
/components # Reusable UI components

/features # Feature modules (e.g., Users, Transactions)
/users
/components # User-specific components
/hooks # React Query hooks for fetching and mutating data
/pages # User pages (CRUD operations)
/api userService.js # Application services for users
/transactions
...

/models # Domain layer for entity definitions
/utils # Utility functions

App.js # Main application component
main.js # Entry point

## 8. Update App.tsx

```
// Internal
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { ErrorBoundary } from "./utils/errors/ErrorBoundary";

// External
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
import translationEn from "./utils/localization/en.json";

function App() {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEn,
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
  const { t } = useTranslation();
  return (
    <ErrorBoundary fallback={<p>{t("error-boundary-message")}</p>}>
      <Navigation />
    </ErrorBoundary>
  );
}

export default App;


```

## 9. Create ErrorBoundary for error handling

```
// External
import { Component, ErrorInfo, ReactNode } from "react";

export class ErrorBoundary extends Component<{
  children: ReactNode;
  fallback: ReactNode;
}> {
  state: { hasError: boolean };
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props?.fallback;
    }

    return this.props?.children;
  }
}

```

## 10. Create Navigation entry point

```

// External

import React, { Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Internal
import { queryClient } from "../../utils/queryClient/queryClient";

const MainLayout = React.lazy(
  () =>
    import(
      /*webpackPrefetch: true, webpackChunkName: "MainLayout"*/ "../../components/MainLayout/MainLayout"
    ),
);
const HomePage = React.lazy(
  () =>
    import(
      /*webpackPrefetch: true, webpackChunkName: "HomePage"*/ "../../features/home/pages/HomePage"
    ),
);
const UsersListPage = React.lazy(
  () =>
    import(
      /*webpackPrefetch: true, webpackChunkName: "UsersListPage"*/ "../../features/users/pages/UsersListPage"
    ),
);
const UsersCreatePage = React.lazy(
  () =>
    import(
      /*webpackPrefetch: true, webpackChunkName: "UsersCreatePage"*/ "../../features/users/pages/UsersCreatePage"
    ),
);
const UsersEditPage = React.lazy(
  () =>
    import(
      /*webpackPrefetch: true, webpackChunkName: "UsersEditPage"*/ "../../features/users/pages/UsersEditPage"
    ),
);
const TransactionsPage = React.lazy(
  () =>
    import(
      /*webpackPrefetch: true, webpackChunkName: "TransactionsPage"*/ "../../features/transactions/pages/TransactionsPage"
    ),
);

const Navigation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UsersListPage />} />
              <Route path="/users/create" element={<UsersCreatePage />} />
              <Route path="/users/:id" element={<UsersEditPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default Navigation;

```

## 11. Create MainLayout Outlet

```
// Internal
import { Outlet } from "react-router-dom";
import Menu from "../Menu/Menu";

const MainLayout = () => {
  return (
    <div>
      <Menu />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

```

## 12. Create Menu

```

// External
import { useState } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            />
          </button>
        </div>

        <ul
          className={`md:flex md:space-x-4 md:justify-center md:items-center ${isOpen ? "flex" : "hidden"} flex-col absolute md:relative bg-gray-800 w-full left-0`}
        >
          <li className="md:ml-6">
            <Link
              to="/users"
              className="hover:bg-gray-700 px-3 py-2 rounded block"
            >
              Users
            </Link>
          </li>
          <li className="md:ml-6">
            <Link
              to="/transactions"
              className="hover:bg-gray-700 px-3 py-2 rounded block"
            >
              Transactions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;

```

## 13. Create Users List Page

```
// Internal
import React from "react";
import { useUsers } from "../hooks/useUsers";
import User from "../models/Users";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const UsersPage = () => {
  const { data: users, isLoading } = useUsers();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;

  const handleCreateClick = () => {
    navigate("/users/create");
  };

  const handleEditClick = (userId: number) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={handleCreateClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 font-bold">
            <div>Id</div>
            <div>Username</div>
            <div>Email</div>
            <div>Edit</div> {/* Added column for edit icon */}
          </div>
        </div>
        <div className="bg-white">
          {users &&
            users.map((user: User) => (
              <div
                key={user.id}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 border-b last:border-b-0"
              >
                <div>{user.id}</div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>
                  <button
                    onClick={() => handleEditClick(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;

```

## 14. Create Users Create Page

```
import CreateUserForm from "../components/CreateUserForm";

const UsersCreatePage = () => {
  return <CreateUserForm />;
};

export default UsersCreatePage;
```

## 15. Create Users Edit Page

import EditUserForm from "../components/EditUserForm";

const UsersEditPage = () => {
return <EditUserForm />;
};

export default UsersEditPage;

## 16. Create Users Create Form

```
// External
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Internal
import User from "../models/Users";
import createUser from "../apis/createUser";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const mutation = useMutation((newUser: Partial<User>) =>
    createUser(newUser as BodyInit),
  );
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <Formik
        initialValues={{ username: "", email: "" }}
        onSubmit={(values: Partial<User>, { setSubmitting }) => {
          mutation.mutate(values, {
            onSuccess: () => {
              setSubmitting(false);
            },
          });
          navigate("/users");
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="username"
                className="input border-gray-300 rounded p-2 w-full"
                placeholder="Username"
              />
            </div>
            <div>
              <Field
                name="email"
                type="email"
                className="input border-gray-300 rounded p-2 w-full"
                placeholder="Email"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              {t("create")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUserForm;

```

## 17. Create Users Edit Form

```

// External
import { Formik, Form, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";

// Internal
import User from "../models/Users";
import { useGetUser } from "../hooks/useGetUser";
import updateUser from "../apis/updateUser";

const EditUserForm = () => {
  const { id } = useParams();
  const { data: user } = useGetUser(id as string);
  const navigate = useNavigate();

  const mutation = useMutation(
    ({ id, userData }: { id: string; userData: Partial<User> }) =>
      updateUser(id, userData as BodyInit),
  );
  return (
    <div className="p-4">
      <Formik
        enableReinitialize
        initialValues={user ?? { username: "", email: "" }}
        onSubmit={(values: Partial<User>, { setSubmitting }) => {
          mutation &&
            mutation.mutate(
              { id: id as string, userData: values },
              {
                onSuccess: () => {
                  setSubmitting(false);
                },
              },
            );
          navigate("/users");
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="username"
                className="input border-gray-300 rounded p-2 w-full"
                placeholder="Username"
                value={values.username}
              />
            </div>
            <div>
              <Field
                name="email"
                type="email"
                className="input border-gray-300 rounded p-2 w-full"
                placeholder="Email"
                value={values.email}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUserForm;
```

## 18. Create api for create user

```
// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const createUser = async (body: BodyInit) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users`, {
    ...getOptions("POST"),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw Error("An error occured while creating users");
  }
  return await response.json();
};

export default createUser;

```

## 19. Create api for getting users

```
// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const getUser = async (id: string) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, getOptions("GET"));
  if (!response.ok) {
    throw Error("An error occured while fetching user");
  }
  return await response.json();
};

export default getUser;

```

## 20. Create api for getting single user

```
// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const getUser = async (id: string) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, getOptions("GET"));
  if (!response.ok) {
    throw Error("An error occured while fetching user");
  }
  return await response.json();
};

export default getUser;

```

## 21. Create api for updating user

```
// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const updateUser = async (id: string, body: BodyInit | null | undefined) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, {
    ...getOptions("PUT"),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw Error("An error occured while updating users");
  }
  return await response.json();
};

export default updateUser;

```

## 22. Create api for deleting user

```
// Internal
import getOptions from "../../../utils/middleware/getOptions";
import URL from "../../../utils/constants/URLs";

const deleteUser = async (id: string) => {
  const API_URL = URL.API_URL;

  const response = await fetch(`${API_URL}/v1/users/${id}`, {
    ...getOptions("DELETE"),
  });
  if (!response.ok) {
    throw Error("An error occured while deleting users");
  }
  return await response.json();
};

export default deleteUser;

```

## 23. Create middleware

```
const getOptions = (method: string): RequestInit => {
  const headers = new Headers();
  if (method === "POST" || method === "PUT") {
    headers.set("Content-type", "application/json");
  }
  headers.set("Accept", "text/plain");

  const options = {
    mode: "cors",
    method: method,
    headers,
  } as RequestInit;

  return options;
};

export default getOptions;
```

## 24. Create react query client

```
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

```

## 25. Create constants

```

const URL = {
  API_URL: "http://localhost:3000",
};

export default URL;

```

## 26. Create get users hook

```
// External
import { useQuery } from "react-query";

// Internal
import getUsers from "../apis/getUsers";

export const useUsers = () => {
  return useQuery("users", getUsers);
};
```

## 27. Create get single user hook

```
// External
import { useQuery } from "react-query";

// Internal
import getUser from "../apis/getUser";

export const useGetUser = (id: string) => {
  return useQuery(["users", id], () => getUser(id));
};

```

# Session 3 Authentication and Authorization

## 1. Install Necessary Packages

`npm i @azure/msal-browser @azure/msal-react

## 2. Redefine App to use MSAL Provider

```

// Internal
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { ErrorBoundary } from "./utils/errors/ErrorBoundary";
import translationEn from "./utils/localization/en.json";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

// External
import { initReactI18next, useTranslation } from "react-i18next";
import i18n from "i18next";
import { msalConfig } from "./infrastructure/auth.config";

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translationEn,
      },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
  const { t } = useTranslation();
  return (
    <ErrorBoundary fallback={<p>{t("error-boundary-message")}</p>}>
      <MsalProvider instance={msalInstance}>
        <Navigation />
      </MsalProvider>
    </ErrorBoundary>
  );
}

export default App;

```

## 3. Create A LoggedOut Error Component

```
const LoggedOut = () => {
  return <>Logged Out</>;
};

export default LoggedOut;

```

## 4. Redefine Navigation

Navigation needs to use MsalAuthenticationTemplate in order to protect routes from being accessed

```
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
  () =>
    import(
      "../../components/MainLayout/MainLayout"
    ),
);
const HomePage = React.lazy(
  () =>
    import(
      "../../features/home/pages/HomePage"
    ),
);
const UsersListPage = React.lazy(
  () =>
    import(
      "../../features/users/pages/UsersListPage"
    ),
);
const UsersCreatePage = React.lazy(
  () =>
    import(
      "../../features/users/pages/UsersCreatePage"
    ),
);
const UsersEditPage = React.lazy(
  () =>
    import(
      "../../features/users/pages/UsersEditPage"
    ),
);
const TransactionsPage = React.lazy(
  () =>
    import(
      "../../features/transactions/pages/TransactionsPage"
    ),
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

```

## 4. Create a local configuration for authentication and authorization from App Registration in Azure

```
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
```

## 5. Create a custom useToken hook in order to save access token

```
import {
  InteractionRequiredAuthError,
  InteractionStatus,
  SilentRequest,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { aadScopes } from "../auth.config";

const useToken = (): string[] => {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      loading &&
      inProgress === InteractionStatus.None &&
      accounts.length !== 0
    ) {
      const tokenRequest = {
        account: accounts[0],
        scopes: aadScopes.scopes,
      };

      instance
        .acquireTokenSilent(tokenRequest as SilentRequest)
        .then((response: { accessToken: string }) => {
          setAccessToken(response.accessToken);
          setLoading(false);
        })
        .catch(async (e: unknown) => {
          if (e instanceof InteractionRequiredAuthError) {
            await instance.acquireTokenSilent(tokenRequest as SilentRequest);
          }
          throw e;
        });
    }
  }, [inProgress, accounts, instance, loading]);

  return [accessToken];
};

export default useToken;

```

## 6. Redefine getOptions method to use Authorization Header with Bearer Token

```
const getOptions = (method: string): RequestInit => {
  const headers = new Headers();
  if (method === "POST" || method === "PUT") {
    headers.set("Content-type", "application/json");
  }

  headers.set("Accept", "text/plain");

  const accessToken = sessionStorage.getItem("AccessToken");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const options = {
    mode: "cors",
    method: method,
    headers,
  } as RequestInit;

  return options;
};

export default getOptions;

```

# Session 5: Testing

# 5.0 E2E Testing

## 5.1. Setting up Playwright setup for e2e testing

`npm init playwright@latest`

`npx playwright test`

## 5.2. Write Navigation without Azure MSAL

```
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

```

## 5.3 Write Script to swap files when running tests

```
const fs = require('fs');

const path = require('path');

const projectRoot = path.resolve(__dirname, '../');

const swapFiles = [
    {
        original: path.join(projectRoot, 'src/components/Navigation/Navigation.tsx'),
        swap: path.join(projectRoot, 'src/components/Navigation/Navigation.swap.tsx')
    }
];

swapFiles.forEach(({ original, swap }) => {
    const fd = fs.openSync(original);
    const originalContent = fs.readFileSync(original, 'utf8');
    fs.writeFileSync(`${original}.bak`, originalContent);
    console.log('wrote on bak');
    fs.closeSync(fd);
    const fdS = fs.openSync(swap);
    const swapContent = fs.readFileSync(swap, 'utf8');
    fs.writeFileSync(original, swapContent);
    console.log('wrote on original');
    fs.closeSync(fdS);
    fs.writeFileSync(swap, originalContent);
    console.log('wrote on swap');
    fs.unlinkSync(`${original}.bak`);
    console.log('Removed backup file');
    console.log('Files swapped for testing');
});
```

## 5.4 Write commands in package.json

```
"swap": "node test-scripts/swap.cjs",
"integration-test": "npx playwright test --reporter=list",
"integration-test-debug": "PWDEBUG=1 npx playwright test --reporter=list",
"integration": "npm run swap && npm run integration-test && npm run swap"

```


## 5.5 Add integration tests

```
import { test, chromium, expect } from '@playwright/test';

test.describe("Users Test Suite", () => {
    test('should go to /users page when selecting user from the menu', async () => {
        const context = await chromium.launchPersistentContext('', {
            headless: true,
            ignoreHTTPSErrors: true
        });
    
        const page = await context.newPage();

        await page.goto("http://localhost:5173");
        await page.click('a.users-link');
        await expect(page).toHaveURL('http://localhost:5173/users');
    })
    
});

```

## 5.6 Add users-link class in menu link

```
className="hover:bg-gray-700 px-3 py-2 rounded block users-link"

```

## 5.7 Run tests
