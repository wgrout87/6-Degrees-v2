import { useEffect } from "react";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
// import Reset from "../components/Reset";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Page() {
  const { user, authDisplay } = useAuthContext();
  const navigate = useNavigate();

  // This works, but it's slow
  useEffect(() => {
    if (user) navigate("/admin");
  }, [user, navigate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {authDisplay === "signUp" && <SignUp />}
          {(!authDisplay || authDisplay === "signIn") && <SignIn />}
          {/* {authDisplay === "reset" && <Reset />} */}
        </div>
      </div>
    </div>
  );
}

export default Page;
