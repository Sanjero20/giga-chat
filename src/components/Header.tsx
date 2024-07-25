import { useContext } from "react";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/context/AuthContext";

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

  console.log(user);

  return (
    <header className="mt-2 flex items-center justify-between">
      <h1 className="text-xl font-bold uppercase">Giga Chat</h1>

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </header>
  );
};

export default Header;
