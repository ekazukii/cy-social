import CreatePoste from "../components/Poste/CreatePoste"

export default function Test() {
  const author = 
    {
      "id": 1,
      "name": "Baillet Tom",
      "username": "@Youbuze",
      "img" : "/img/avatar.png",
      "nbPoste": 12,
      "nbFollow": 13,
      "nbFollower": 14,
    }
  // let [postes, setPostes] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3000/post")
  //   .then(response => response.json())
  //   .then(data => setPostes(data))
  // },[])

  return (
    <>
      <CreatePoste author={author}/>
    </>
  );
}