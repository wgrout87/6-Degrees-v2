export default function NewGame() {
  const setTheme = (theme: string) => document.documentElement.className = theme;
  return (
    <div>
      <h1>Settings</h1>
      <h3>Color Scheme:</h3>
      <button className="theme-btn" onClick={() => setTheme("")}>1</button>
      <button className="theme-btn" onClick={() => setTheme("theme_2")}>2</button>
      <button className="theme-btn" onClick={() => setTheme("theme_3")}>3</button>
    </div>
  );
}
