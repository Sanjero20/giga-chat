import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const MessageField = () => {
  return (
    <fieldset className="flex gap-2">
      <Textarea
        className="min-h-10 w-full resize-none shadow"
        placeholder="Send a message..."
      />
      <Button className="w-32 shadow">Send</Button>
    </fieldset>
  );
};

export default MessageField;
