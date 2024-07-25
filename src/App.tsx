import { useState } from "react";

import Header from "@/components/Header";
import MessageBox from "./components/MessageBox";
import MessageField from "./components/MessageField";

export interface Message {
  id: number;
  content: string;
  date: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <div className="h-screen bg-neutral-100">
      <main className="mx-auto flex h-full max-w-lg flex-col gap-2 p-4">
        <Header />
        <MessageBox />
        <MessageField />
      </main>
    </div>
  );
}

export default App;
