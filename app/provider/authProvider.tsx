import { useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import { getAuth } from "firebase/auth";
import { User } from "firebase/auth";
import firebase_app from "@/lib/firebase";

interface Props {
    children: React.ReactNode;
  }

const auth = getAuth(firebase_app)

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};