import { useState, useEffect } from "react";
import { getProfile } from "../services/user";

type AuthState = {
  loading: boolean;
  authenticated: boolean;
  user: string | null;
};

const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({
    loading: true,
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    getProfile().then((resp) => {
      if (resp) {
        if (resp?.message) {
          setAuth({ loading: false, authenticated: true, user: resp?.message });
        } else {
          setAuth({ loading: false, authenticated: false, user: null });
        }
      }
    });
  }, []);

  return auth;
};

export default useAuth;
