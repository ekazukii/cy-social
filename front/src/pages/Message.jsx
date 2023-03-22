import RecapConv from "../components/Message/RecapConv"
import Navbar from "../components/Navbar/Navbar"
import HeaderProfil from "../components/Header-profil/Header-profil"
import Conversation from "../components/Message/Conversation"
import "./Message.css"
import TextArea from "../components/TextArea/TextArea"

export default function Messagerie() {
    const conversation = [
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
    ]

    const recapConv = [
    {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sit minima nam non? Deleniti veritatis esse possimus illum aperiam, reprehenderit unde. Culpa, impedit laudantium! Soluta vero cumque quaerat reiciendis similique?",
        author: "@Youbuze",
        title: "Test",
        time: "15/05/2005"
    },
    {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sit minima nam non? Deleniti veritatis esse possimus illum aperiam, reprehenderit unde. Culpa, impedit laudantium! Soluta vero cumque quaerat reiciendis similique?",
        author: "@Youbuze",
        title: "Test",
        time: "15/05/2005"
    },
    {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sit minima nam non? Deleniti veritatis esse possimus illum aperiam, reprehenderit unde. Culpa, impedit laudantium! Soluta vero cumque quaerat reiciendis similique?",
        author: "@Youbuze",
        title: "Test",
        time: "15/05/2005"
    },
    {
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sit minima nam non? Deleniti veritatis esse possimus illum aperiam, reprehenderit unde. Culpa, impedit laudantium! Soluta vero cumque quaerat reiciendis similique?",
        author: "@Youbuze",
        title: "Test",
        time: "15/05/2005"
    },
    ];
    return (
    <>
      <Navbar isConnected={true}/>
      <div class="contain-body">
        <div class="contain-left">
          <div class="list-conv">
            {recapConv.map((conv, index) => (
                <RecapConv
                    key={index}
                    content={conv.content}
                    author={conv.author}
                    title={conv.title}
                    time={conv.time}
                />
            ))}
                <RecapConv author="@Youbuze" content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit sit minima nam non? Deleniti veritatis esse possimus illum aperiam, reprehenderit unde. Culpa, impedit laudantium! Soluta vero cumque quaerat reiciendis similique?" title="Test" time="15/08/2005"/>            
            </div>
        </div>
        <div class="contain-right">
              <div class="conv-content">
                <Conversation author={"user1"} messages={conversation}/>
                <TextArea />
              </div>    
        </div>
      </div>
    </>
  );
}
