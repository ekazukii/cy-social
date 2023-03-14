import { useState } from "react";
import reactLogo from "../assets/react.svg";
import Navbar from "../components/Navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar isConnected={true} />
    </div>
  );
}

export default App;
