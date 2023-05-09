import { useSession } from '../hooks/useSession';
import Modal from "../components/Modal/Modal";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

export default function Test() {
  const { user, setSession, login, refreshData, logout } = useSession();

  console.log(user);

  return (
    <>
      <h1>Bienvenue sur la page de Test</h1>
      <h3>Ici vous pouvez modifier totalement la page pour vos test</h3>
      <p>Mais attention ne surtout pas commit Test.jsx ni Test.css</p>
      <button onClick={() => login('test', 'test')}>Login</button>
      <button onClick={() => refreshData(console.log)}>Refresh</button>
      <button onClick={() => logout()}>Logout</button>
      <p>
        User id : {user?.id} - Username : {user?.username}
      </p>
    </>
  );
}