function App() {
  return (
    <div className="h-screen bg-neutral-100">
      <main className="mx-auto flex h-full max-w-lg flex-col gap-2 bg-sky-400 p-4">
        <header className="flex justify-between">
          <h1 className="text-xl font-bold uppercase">Giga Chat</h1>

          <input value={"@username"} className="w-[15ch]" />
        </header>

        {/* chat container */}
        <div className="w-full flex-1 rounded bg-white">
          {/*  */}
          {/*  */}
        </div>

        {/* Message box */}
        <fieldset className="flex gap-2">
          <textarea className="w-full resize-none rounded" />
          <button className="w-32 rounded bg-blue-700">Send</button>
        </fieldset>
      </main>
    </div>
  );
}

export default App;
