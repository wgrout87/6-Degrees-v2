"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import getData from "@/firebase/firestore/getData";
import Collections from "@/firebase/firestore/collections";
import { useRouter } from "next/navigation";

const auth = getAuth(firebase_app);

export const AuthContext = createContext<{
  user: Record<string, unknown> | null | undefined;
  updateUser?: (user: Record<string, unknown> | null | undefined) => void;
  authDisplay: null | "signIn" | "signUp" | "reset";
  changeAuthDisplay: (
    authDisplay: null | "signIn" | "signUp" | "reset"
  ) => void;
}>({
  user: null,
  authDisplay: "signIn",
  changeAuthDisplay: (authDisplay) => console.log(authDisplay),
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<Record<string, unknown> | null | undefined>(
    null
  );
  const [authDisplay, setAuthDisplay] = useState<
    null | "signIn" | "signUp" | "reset"
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { result, error } = await getData(Collections.Users, user?.uid);
        if (error) return;
        setUser(result);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (authDisplay) router.push("/auth");
  }, [authDisplay]);

  const updateUser = (user: Record<string, unknown> | null | undefined) => {
    console.log("User Updated!");
    setUser(user);
  };

  const changeAuthDisplay = (
    authDisplay: null | "signIn" | "signUp" | "reset"
  ) => {
    setAuthDisplay(authDisplay);
  };

  const value = {
    user,
    updateUser,
    authDisplay,
    changeAuthDisplay,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
