import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Message } from "@/App";
import { cn } from "@/lib/utils";

interface Props {
  data: Message;
}

const ChatContainer = ({ data }: Props) => {
  const user = useContext(AuthContext);

  const isSameUser = user?.id === data.user_id;

  const userStyles = cn(
    isSameUser ? "ml-auto mr-0 bg-primary" : "bg-neutral-400",
    "w-full rounded-lg p-2 text-sm text-white",
    "flex flex-col gap-1",
  );

  return (
    <div className={cn(isSameUser && "ml-auto mr-0", "w-3/4")}>
      <p className="mb-1 ml-1 text-xs text-neutral-500">
        {isSameUser ? "" : data.username}
      </p>

      <div className={userStyles}>
        <p>{data.content}</p>
        <p className={cn(!isSameUser && "ml-auto mr-0", "mt-1 text-xs")}>
          {data.created_at}
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;
