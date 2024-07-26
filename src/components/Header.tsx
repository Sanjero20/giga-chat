import { useContext } from "react";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/context/AuthContext";
import { Button } from "./ui/button";

const Header = () => {
  const user = useContext(AuthContext);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="mt-2 flex items-center justify-between">
      <h1 className="text-xl font-bold uppercase">Giga Chat</h1>

      {user ? (
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="outline" onClick={login}>
          Login via Github
        </Button>
      )}
    </header>
  );
};

export default Header;
