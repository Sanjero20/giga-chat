import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext";

import Header from "@/components/Header";
import MessageBox from "@/components/MessageBox";
import MessageField from "@/components/MessageField";

export interface Message {
  id: number;
  content: string;
  date: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

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
