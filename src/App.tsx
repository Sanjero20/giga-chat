import { useEffect, useRef, useState } from "react";

interface Message {
  id: number;
  content: string;
  date: Date;
}

const words = ["rock", "paper", "scissors"];

function App() {
  const [index, setIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);

  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const messageBox = messageBoxRef.current;

    if (!messageBox) return;

    const observer = new MutationObserver(() => {
      messageBox.scroll({ top: messageBox.scrollHeight, behavior: "smooth" });
    });

    observer.observe(messageBox, { childList: true });

    // Clean up the observer on component unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];

      const newMessage = {
        id: index,
        content: randomWord,
        date: new Date(),
      };

      addMessage(newMessage);
      setIndex(index + 1);
    }, 1000);
  }, [index]);

  const addMessage = (data: Message) => {
    setMessages([...messages, data]);
  };

  return (
    <div className="h-screen bg-neutral-100">
      <main className="mx-auto flex h-full max-w-lg flex-col gap-2 p-4">
        <header className="mt-2 flex items-center justify-between">
          <h1 className="text-xl font-bold uppercase">Giga Chat</h1>
          <input value={"@username"} className="w-[15ch] rounded p-2 shadow" />
        </header>

        {/* chat container */}
        <div
          ref={messageBoxRef}
          className="flex w-full flex-1 flex-col gap-2 overflow-y-auto rounded bg-white p-2 text-white shadow"
        >
          {messages.map((data) => (
            <div key={data.id} className="w-3/4 rounded bg-neutral-500 p-2">
              {data.content}
            </div>
          ))}
        </div>

        {/* Message box */}
        <fieldset className="flex gap-2">
          <textarea className="w-full resize-none rounded shadow" />
          <button className="w-32 rounded bg-gray-900 text-white shadow">
            Send
          </button>
        </fieldset>
      </main>
    </div>
  );
}

export default App;
