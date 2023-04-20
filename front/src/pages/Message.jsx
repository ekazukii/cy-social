import RecapConv from "../components/Message/RecapConv"
import Navbar from "../components/Navbar/Navbar"
import HeaderProfil from "../components/Header-profil/Header-profil"
import Conversation from "../components/Message/Conversation"
import "./Message.css"
import TextArea from "../components/TextArea/TextArea"


export default function Messagerie() {
  
  const [dataAuth, setDataAuth] = useState(null);
  const [dataRecapConv, setDataRecapConv] = useState(null);
  const [selectedConv, setSelectedConv] = useState(null);
  const [data_notif, setData_notif] = useState([]);
  const [dataSelectedConv, setdataSelectedConv] = useState([]);
  
  const changeConv = (conv) => {
    setSelectedConv(conv);
  }

  useEffect(() => {
    fetch("http://localhost:3000/auth/whoami", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(dataAuth => setDataAuth(dataAuth))
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (dataAuth && dataAuth.user) {
      fetch("http://localhost:3000/conversation?user=" + dataAuth.user.id.toString())
      .then(response => response.json())
      .then(dataRecapConv => setDataRecapConv(dataRecapConv))
      .catch(error => console.error(error));
    }
  }, [dataAuth]);

  useEffect(() => {
    if (dataRecapConv && dataRecapConv[0].id_conv) {
      setSelectedConv(dataRecapConv[0].id_conv);
    }
  }, [dataRecapConv]);
  
  useEffect(() => {
    if (selectedConv && dataSelectedConv) {
      fetch("http://localhost:3000/message?conv=" + selectedConv.toString())
      .then(response => response.json())
      .then(dataSelectedConv => setdataSelectedConv(dataSelectedConv))
      .catch(error => console.error(error));
    }
  }, [selectedConv, dataSelectedConv]);

useEffect(() => {
  if (dataAuth && dataAuth.user) {
    fetch("http://localhost:3000/notif?user=" + dataAuth.user.id.toString()) 
      .then(response => response.json())
      .then(data_notif => setData_notif(data_notif))
      .catch(error => console.error(error));
  }
  }, [dataAuth]);
 
      return (
      <>
      <Navbar isConnected={true} notifs={data_notif}/>
      <div className="contain-body">
        <div className="contain-left">
          <div className="list-conv">
            {(dataRecapConv && selectedConv) && (
              dataRecapConv.map((conv, index) => (
                  <RecapConv
                  key={index}
                  content={conv.content}
                  // author={conv.author}
                  // author="@Youbuze"
                  title={conv.title}
                  time={conv.date}
                  onClick={() => changeConv(conv.id_conv)}
                  />
                ))
              )}
            </div>
        </div>
        <div className="contain-right">
              <div className="conv-content">
                {(dataAuth && dataAuth.user.id && dataSelectedConv) && (
                  <Conversation author={dataAuth.user.id} messages={dataSelectedConv}/>
                )}
                <TextArea />
              </div>    
        </div>
      </div>
    </>
  );
}
