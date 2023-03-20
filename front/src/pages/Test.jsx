import Conversation from "../components/Message/Conversation";

export default function Test() {
  return (
    <>
      <h1>Bienvenue sur la page de Test</h1>
      <h3>Ici vous pouvez modifier totalement la page pour vos test</h3>
      <p>Mais attention ne surtout pas commit Test.jsx ni Test.css</p>
      <Conversation
        author={"user1"}
        messages={[
          {
            content: "Hello comment ça va",
            author: "user1",
          },
          {
            content: "ça va nickel ça marche pas trop trop mal",
            author: "user2",
          },
          {
            content:
              "Bah ça me semble parfait (ptit message long sur plusieurs lignes)",
            author: "user1",
          },
          {
            content: "Msg court.",
            author: "user2",
          },
        ]}
      />
    </>
  );
}
