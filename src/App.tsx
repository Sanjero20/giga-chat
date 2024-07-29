import { useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";

import Header from "@/components/Header";
import MessageBox from "@/components/MessageBox";
import MessageField from "@/components/MessageField";

export interface Message {
  id: number;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePayload = async (payload: RealtimePostgresInsertPayload<any>) => {
    const { new: message } = payload;

    // Cant find a way to get the username directly
    // so I just query the db for the username
    const { data: user } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", message.user_id)
      .single();

    if (user) {
      const { username } = user;
      setMessages((prev) => [...prev, { ...message, username }]);
    }
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
        .select("id, user_id, content, created_at, profiles(username)");

      if (data) {
        const transformedData = data.map((item) => {
          // convert the profiles.username to <string> instead of any
          const profile = Array.isArray(item.profiles)
            ? item.profiles[0]
            : item.profiles;

          // Check if profile is defined and has username
          return {
            id: item.id,
            user_id: item.user_id,
            username: profile.username,
            content: item.content,
            created_at: item.created_at,
          };
        });

        setMessages(transformedData);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthProvider>
      <div className="h-screen bg-neutral-300">
        <main className="mx-auto flex h-full max-w-lg flex-col gap-2 p-4">
          <Header />
          <MessageBox messages={messages} isLoading={isLoading} />
          <MessageField />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
