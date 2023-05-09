import RecapConv from '../components/Message/RecapConv';
import Navbar from '../components/Navbar/Navbar';
import HeaderProfil from '../components/Header-profil/Header-profil';
import Conversation from '../components/Message/Conversation';
import './Message.css';
import TextArea from '../components/TextArea/TextArea';
import { useSession } from '../hooks/useSession';
import { getBaseUrl } from '../utils/config';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

export default function Messagerie() {
  const { user, isLoggedIn, setSession, login, refreshData, logout } = useSession();

  const [dataAuth, setDataAuth] = useState(null);
  const [dataRecapConv, setDataRecapConv] = useState(null);
  const [selectedConv, setSelectedConv] = useState(null);
  const [dataSelectedConv, setdataSelectedConv] = useState(null);
  const [messageContent, setMessageContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const changeConv = conv => {
    setSelectedConv(conv);
  };

  useEffect(() => {
    if (isLoggedIn == true) {
      const infoUserConnected = fetch(`http://localhost:3000/user/${user.id}`).then(response => response.json());
      const conversationUserConnected = fetch(`http://localhost:3000/conversation?user=${user.id}`).then(response =>
        response.json()
      );

      Promise.all([infoUserConnected, conversationUserConnected])
        .then(([promiseResultUserConnectedData, promiseResultConversationUserConnected]) => {
          setDataAuth(promiseResultUserConnectedData[0]);
          setDataRecapConv(promiseResultConversationUserConnected);
          setIsLoading(false);
        })
        .catch(error => setError(error));
    } else if (isLoggedIn == false) {
      // setIsLoading(false);
      window.location.replace(`/`);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (dataRecapConv && dataRecapConv.length > 0 && dataRecapConv[0].id_conv) {
      setSelectedConv(dataRecapConv[0].id_conv);
    }
  }, [dataRecapConv]);

  useEffect(() => {
    if (selectedConv) {
      fetch('http://localhost:3000/message?conv=' + selectedConv.toString())
        .then(response => response.json())
        .then(dataSelectedConv => setdataSelectedConv(dataSelectedConv))
        .catch(error => console.error(error));
    }
  }, [selectedConv]);

  const sendMessage = async () => {
    const data = await fetch(`${getBaseUrl()}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_conv: selectedConv.toString(),
        id_user: dataAuth.id.toString(),
        content: messageContent
      })
    });

    const newMessageData = {
      id_user: dataAuth.id,
      content: messageContent,
      date: moment().format('LLL')
    };

    const newDataSelectedConv = [...dataSelectedConv, newMessageData];
    setdataSelectedConv(newDataSelectedConv);
  };

  function handleSubmit(e) {
    sendMessage();
    setMessageContent(null);
  }

  function handleChange(value) {
    setMessageContent(value);
  }

  return (
    <>
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <>
          <Navbar />
          <div className="contain-body">
            <div className="contain-left">
              <div className="list-conv">
                {dataRecapConv &&
                  selectedConv &&
                  dataRecapConv.map((conv, index) => (
                    <RecapConv
                      key={index}
                      content={conv.content}
                      image={dataAuth.profile_pic}
                      // author={conv.author}
                      // author="@Youbuze"
                      title={conv.title}
                      time={conv.date}
                      onClick={() => changeConv(conv.id_conv)}
                    />
                  ))}
              </div>
            </div>
            <div className="contain-right">
              <div className="conv-content">
                {dataAuth && dataAuth.id && dataSelectedConv && (
                  <div className="conv-msgs">
                    <Conversation author={dataAuth.id} messages={dataSelectedConv} />
                  </div>
                )}
                <TextArea className="conv-textarea" onSubmit={handleSubmit} onChange={handleChange} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
