import "./button.css";

export default function Button({ text, type, handleClick }) {
  return (
    <button onClick={handleClick} className={type}>
      {text}
    </button>
  );
}
