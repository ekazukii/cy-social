import ParamConv from "../components/Message/paramConv"

export default function Test() {
  let [postes, setPostes] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/post")
    .then(response => response.json())
    .then(data => setPostes(data))
  },[])

  return (
    <>
      <h1>Bienvenue sur la page de Test</h1>
      <h3>Ici vous pouvez modifier totalement la page pour vos test</h3>
      <p>Mais attention ne surtout pas commit Test.jsx ni Test.css</p>
    </>
  );
}