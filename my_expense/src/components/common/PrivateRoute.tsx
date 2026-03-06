import { Outlet, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { getProfile } from "../../services/user";

type AuthContextProps = {
  email: string;
  full_name: string;
}

export const AuthContext = createContext<AuthContextProps>({email: "", full_name:""});


const PrivateRoute = () => {

  const [user, setUser] = useState<AuthContextProps>({email: "", full_name:""});
  const [loading, setLoading] = useState<Boolean>(true);

  const navigate = useNavigate()

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    getProfile().then((data) => {
      if (!data.message) {
        redirectToLogin();
        return;
      }
      const cookies = Object.fromEntries(
        document.cookie.split("; ").map((c) => c.split("=")),
      );
      setUser({ email: data, full_name: cookies?.full_name });
    });
    setLoading(false);
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={user}>
      {!loading && user.email ? <Outlet/> : null}
    </AuthContext.Provider>
  );
};

export default PrivateRoute;
