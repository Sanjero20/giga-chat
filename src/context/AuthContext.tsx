import { useState, useEffect, createContext } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for auth state change
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session?.user || null);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
      {/*  */}
    </AuthContext.Provider>
  );
};
