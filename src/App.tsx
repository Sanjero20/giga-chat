import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";

import Header from "@/components/Header";
import MessageBox from "@/components/MessageBox";
import MessageField from "@/components/MessageField";
import { supabase } from "./lib/supabase";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

export interface Message {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePayload = (payload: RealtimePostgresInsertPayload<any>) => {
    const { new: data } = payload;
    setMessages([...messages, data]);
  };

  // Realtime database
  useEffect(() => {
    supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "message" },
        handlePayload,
      )
      .subscribe();

    return () => {
      supabase.channel("messages").unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("message").select("*");

      console.log(data);
      if (data) {
        setMessages(data);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthProvider>
      <div className="h-screen bg-neutral-100">
        <main className="mx-auto flex h-full max-w-lg flex-col gap-2 p-4">
          <Header />
          <MessageBox messages={messages} />
          <MessageField />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
