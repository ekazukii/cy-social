import RecapConv from "../components/Message/RecapConv"
import Navbar from "../components/Navbar/Navbar"
import HeaderProfil from "../components/Header-profil/Header-profil"
import Conversation from "../components/Message/Conversation"
import "./Message.css"
import TextArea from "../components/TextArea/TextArea"

export default function Messagerie() {
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
