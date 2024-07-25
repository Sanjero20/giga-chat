const MessageField = () => {
  return (
    <fieldset className="flex gap-2">
      <textarea className="w-full resize-none rounded p-1 shadow" />
      <button className="w-32 rounded bg-gray-900 text-white shadow">
        Send
      </button>
    </fieldset>
  );
};

export default MessageField;
