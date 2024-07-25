const Header = () => {
  return (
    <header className="mt-2 flex items-center justify-between">
      <h1 className="text-xl font-bold uppercase">Giga Chat</h1>
      <input value={"@username"} className="w-[15ch] rounded p-2 shadow" />
    </header>
  );
};

export default Header;
