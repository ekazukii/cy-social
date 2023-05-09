import Navbar from '../components/Navbar/Navbar';
import HeaderProfil from '../components/Header-profil/Header-profil';
import Notifications from '../components/Notifications/Notifications';
import './notif.css';

export default function Notif(props) {
  const Notif = [
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    },
    {
      author: '@Youbuze',
      time: '15/05/2001',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.'
    }
  ];

  return (
    <>
      <Navbar isConnected={true} />
      <div className="container">
        <HeaderProfil username="@Youbuze" nbPoste="12" nbFollow="1212" nbFollower="1" />
        <div className="notif-container">
          {Notif.map((notifications, index) => (
            <Notifications
              key={index}
              content={notifications.content}
              author={notifications.author}
              time={notifications.time}
              type={notifications.type}
              link={notifications.link}
              id={notifications.id_notif}
            />
          ))}
        </div>
      </div>
    </>
  );
}
