import AuthRequired from "./AuthRequired";

export default function NewGame() {
  return (
    <AuthRequired>
      <h1>Select Game Mode:</h1>
      <button>Classic</button>
      <button>Random</button>
    </AuthRequired>
  );
}
