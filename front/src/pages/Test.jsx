import Poste from "../components/Poste/Poste"
import Navbar from "../components/Navbar/Navbar"
import Comment from "../components/Comment/Comment"

export default function Test() {
  const comments = [  {    name: "John",    content: "Great post!",    username : "Depp",    time : "15h",    recipient : "Jeff",    comments: [      {        name: "Jack",        content: "I totally agree with you!",        username : "Sparrow",        time : "15h",        recipient : "John",        comments: []
      },
      {
        name: "James",
        content: "This is an interesting post!",
        username : "Bond",
        time : "15h",
        recipient : "John",
        comments: [
          {
            name: "Jack",
            content: "I agree with you too, James!",
            username : "Sparrow",
            time : "15h",
            recipient : "James",
            comments: []
          }
        ]
      }
    ]
  },
  {
    name: "Mary",
    content: "Nice post, John!",
    username : "Poppins",
    time : "15h",
    recipient : "John",
    comments: [
      {
        name: "Anna",
        content: "I love your writing style, Mary!",
        username : "Frozen",
        time : "15h",
        recipient : "Mary",
        comments: []  
      }
    ]
  }
];
  return (
    <>
      <Navbar isConnected = {true}/>
      <h1>Bienvenue sur la page de Test</h1>
      <h3>Ici vous pouvez modifier totalement la page pour vos test</h3>
      <h3>Mais attention ne surtout pas commit Test.jsx ni Test.css</h3>
      <div style={{
        display: "flex",
        justifyContent: "center"
      }}>
      <div style={{
        width: "50rem",
        color: "white"
      }}>
        <Poste />
        {comments.map(comment => (
          <Comment name={comment.name} username={comment.username} time={comment.time} recipient={comment.recipient} content={comment.content} comments={comment.comments}/>
        ))}
        <Poste />
        {comments.map(comment => (
          <Comment name={comment.name} username={comment.username} time={comment.time} recipient={comment.recipient} content={comment.content} comments={comment.comments}/>
        ))}
      </div>
      </div>
    </>
  );
}
