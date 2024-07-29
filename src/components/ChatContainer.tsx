import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Message } from "@/App";

import { cn } from "@/lib/utils";
import { getTimeFromNow } from "@/lib/time";
import { filterBadWords } from "@/lib/filterWords";

interface Props {
  data: Message;
}

const ChatContainer = ({ data }: Props) => {
  const user = useContext(AuthContext);

  const isSameUser = user?.id === data.user_id;

  const userStyles = cn(
    isSameUser ? "ml-auto mr-0 bg-primary" : "bg-primary/70",
    "w-full rounded-lg p-2 text-sm text-white",
    "flex flex-col gap-1",
  );

  return (
    <div className={cn(isSameUser && "ml-auto mr-0", "max-w-3/4 w-fit")}>
      <p className="mb-1 ml-1 text-xs text-neutral-500">
        {isSameUser ? "" : data.username}
      </p>

      <div className={userStyles}>
        <p>{filterBadWords(data.content)}</p>

        <p className={cn(!isSameUser && "ml-auto mr-0", "mt-1 hidden text-xs")}>
          {getTimeFromNow(data.created_at)}
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;
