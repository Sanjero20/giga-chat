import { Message } from "@/App";
import { useRef, useEffect } from "react";
import ChatContainer from "./ChatContainer";
import Spinner from "./Spinner";

interface Props {
  messages: Message[];
  isLoading: boolean;
}

const MessageBox = ({ messages, isLoading }: Props) => {
  const messageBoxRef = useRef<HTMLDivElement | null>(null);

  // Automatic scroll effect on new chat
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

  return (
    <div
      ref={messageBoxRef}
      className="flex w-full flex-1 flex-col gap-2 overflow-y-auto rounded bg-white p-2 text-black shadow"
    >
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <Spinner />
          <p>Retrieving messages...</p>
        </div>
      ) : (
        messages.map((data) => <ChatContainer key={data.id} data={data} />)
      )}
    </div>
  );
};

export default MessageBox;
