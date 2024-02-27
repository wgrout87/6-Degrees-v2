import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AuthRequired({ children }: { children: ReactNode }): JSX.Element {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/signup");
  }, [user, navigate]);

  return (<>
  {user ? children : null}
  </>)
}

export default AuthRequired;
