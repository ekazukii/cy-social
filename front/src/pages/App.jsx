import { useState } from "react";
import reactLogo from "../assets/react.svg";
import Modal from "../components/Login/Login";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Modal title={<img
        src="https://user-images.githubusercontent.com/28058068/225023680-440646b9-9f7f-45cd-993b-abfbdeb69ba1.png"
        alt="logo"
        width="80rem"
        onClick={() => setCount(count + 1)}
      />}>
        <p>Connectez vous pour en voir plus!</p>
        <Input id="user" label="Identifiant" type="text" placeholder="Entrez votre nom" />
        <Input id="password" label="Mot de passe" type="password" placeholder="Entrez votre mot de passe" />
        <Button text={"Se connecter"} type={"secondary"}/>
      </Modal>
    </div>
  );
}

export default App;
