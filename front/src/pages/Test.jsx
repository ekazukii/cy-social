import { useSession } from '../hooks/useSession';

export default function Test() {
  const { user, setSession, login, refreshData, logout } = useSession();

  return (
    <>
      <h1>Bienvenue sur la page de Test</h1>
      <h3>Ici vous pouvez modifier totalement la page pour vos test</h3>
      <p>Mais attention ne surtout pas commit Test.jsx ni Test.css</p>
      <button onClick={() => login('test', 'test')}>Login</button>
      <button onClick={() => refreshData()}>Refresh</button>
      <button onClick={() => logout()}>Logout</button>
      <p>
        User id : {user?.id} - Username : {user?.username}
      </p>
    </>
  );
}
