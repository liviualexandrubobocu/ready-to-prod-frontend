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
