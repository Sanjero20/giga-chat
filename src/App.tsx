import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { supabase } from "./lib/supabase";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

import Header from "@/components/Header";
import MessageBox from "@/components/MessageBox";
import MessageField from "@/components/MessageField";

export interface Message {
  id: number;
  username: string;
  content: string;
  created_at: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePayload = (payload: RealtimePostgresInsertPayload<any>) => {
    const { new: data } = payload;

    setMessages([]);
  };

  // Realtime database
  useEffect(() => {
    supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        handlePayload,
      )
      .subscribe();

    return () => {
      supabase.channel("messages").unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("messages")
        .select("id, content, created_at, profiles(username)");

      if (data) {
        const transformedData = data.map((item) => {
          // convert the profiles.username to <string> instead of any
          const profile = Array.isArray(item.profiles)
            ? item.profiles[0]
            : item.profiles;

          // Check if profile is defined and has username
          return {
            id: item.id,
            username: profile.username,
            content: item.content,
            created_at: item.created_at,
          };
        });

        setMessages(transformedData);
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
