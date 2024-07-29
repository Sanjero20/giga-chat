import { useContext, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MessageField = () => {
  const [value, setValue] = useState("");

  const user = useContext(AuthContext);

  const handleSendMessage = async () => {
    if (user) {
      await supabase
        .from("messages")
        .insert({ user_id: user.id, content: value });
      setValue("");
    } else {
      // retrieve a uuid v4 in local storage if there is one
      // else create a new uuid and save to local storage
    }
  };

  return (
    <fieldset className="flex gap-2" disabled={!user}>
      <Input
        className="h-10 min-h-10 w-full resize-none shadow"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Send a message..."
      />

      <Button
        className="w-32 shadow"
        onClick={handleSendMessage}
        disabled={value == ""}
      >
        Send
      </Button>
    </fieldset>
  );
};

export default MessageField;
