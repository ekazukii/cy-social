import CreatePoste from "../components/Poste/CreatePoste"
import Navbar from "../components/Navbar/Navbar"
import React, { useEffect, useState } from 'react';
import Poste from "../components/Poste/Poste";
import classes from "./accueil.module.css";
import { useSession } from '../hooks/useSession';

export default function Accueil() {
  const { user, setSession, login, refreshData, logout } = useSession(); // Recup isConnected depuis useSession
  console.log(user);

  const [data_tl, setData_tl] = useState([]);
  const [data_notif, setData_notif] = useState([]);

  // envoi des requêtes au serveur + récupération des réponses du serveur
  useEffect(() => {
    fetch("http://localhost:3000/post/tl?user=1") // remplacez l'URL par celle de votre API
      .then(response => response.json())
      .then(data_tl => setData_tl(data_tl))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/notif?user=1") // remplacez l'URL par celle de votre API
      .then(response => response.json())
      .then(data_notif => setData_notif(data_notif))
      .catch(error => console.error(error));
  }, []);

  const author = 
  {
    "id": 1,
    "username": "Johnpaul_Connelly1",
    "name": "Ervin",
    "mail": "Joany20@gmail.com",
    "tel": "04 97 15 29 77",
    "adresse": "68253 Kuhlman Points Glendale",
    "date_bday": "2022-09-01T22:00:00.000Z",
    "role": 2,
    "profile_pic": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1018.jpg",
    "nbFollowers": 0,
    "nbFollows": 0,
    "nbPosts": 1,
    "nbGroups": 1
}

  // let [postes, setPostes] = useState(null);

  // useEffect(() => {
  //   fetch("http://localhost:3000/post")
  //   .then(response => response.json())
  //   .then(data => setPostes(data))
  // },[])

  // const notif_test = [
  //   {
  //     author: "@Youbuze",
  //     time: "15/05/2001",
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.",
  //   },
  //   {
  //     author: "@Youbuze",
  //     time: "15/05/2001",
  //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis libero dolorum ad.",
  //   },
  // ]
  let isConnected= false;
  if(user?.id){isConnected=true;}
  return (
    <>
      <Navbar isConnected={isConnected} notifs={data_notif}/>
      <div className={classes["container_body"]}>
            <div className={classes["container_body_left"]}>
              <h3>Nouveau Sondage</h3>
              <CreatePoste author={author}/>
              <h3>Mon Recap</h3>
              <div className={classes["recapBox"]}>

              </div>
              <h3>Mes favoris</h3>
              <div className={classes["recapBox"]}>

              </div>
            </div>
            <div className={classes["container_body_center"]}>
              <h3>Ma Timeline</h3>
                {data_tl.posts && data_tl.posts.map((item) => (
                  <Poste poste={item} user={data_tl.users[item.id_user]}/>
                ))}
            </div>
            <div className={classes["container_body_right"]}>
            </div>
        </div>
    </>
  );
}
