import CreatePoste from "../components/Poste/CreatePoste"
import Navbar from "../components/Navbar/Navbar"
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Poste from "../components/Poste/Poste";
import classes from "./accueil.module.css";
import { useSession } from '../hooks/useSession';
import Recap from "../components/Recap/Recap";
import RecapFav from "../components/Recap/RecapFav";

export default function Accueil() {
  const { id_tl_group } = useParams();

  const { user, setSession, login, refreshData, logout } = useSession(); // Recup isConnected depuis useSession
  console.log(user);

  const [data_tl, setData_tl] = useState([]);
  const [dataGroup, setData_Group] = useState({});
  const [numGroups, setNumGroups] = useState(3);
  const [data_notif, setData_notif] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  id_tl_group && console.log("id tl groupe : "+id_tl_group);

  // envoi des requêtes au serveur + récupération des réponses du serveur
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/post/tl?${id_tl_group > 0 ? "group="+id_tl_group : "user=1"}`).then(response => response.json()),
      fetch("http://localhost:3000/group/?user=1").then(response => response.json()),
    ]).then(([dataTl, dataGroup]) => {
      setData_tl(dataTl);
      setData_Group(dataGroup);
      setIsLoading(false);
    }).catch(error => console.error(error));
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
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <div className={classes["container_body"]}>

          <div className={classes["container_body_left"]}>

            <div className={classes["nouveau_sondage"]}>
              <h3 className={classes["titre"]}>Nouveau Sondage</h3>
              <CreatePoste author={author}/>
            </div>

            
            <div className={classes["mes_groupes"]}>
              <h3 className={classes["titre"]}>Mes groupes</h3>
              <div className={classes["recapBox"]}>
                {dataGroup.groups && dataGroup.groups.slice(0, numGroups).map((item, key) =>
                  <Recap group={item} indice={key} isLinkToGroup={true}/>
                )}
                {dataGroup.groups && dataGroup.groups.length > numGroups && (
                  <span className={classes["voirPlus"]} onClick={() => setNumGroups(numGroups + 3)}>
                    Voir plus
                  </span>
                )}
              </div>
            </div>

            
            <div className={classes["mes_favories"]}>
              <h3 className={classes["titre"]}>Mes favoris</h3>
              <div className={classes["recapBox"]}>
                {/* <RecapFav post={data[0]} indice={0}/>
                <RecapFav post={data[0]} indice={1}/>
                <RecapFav post={data[0]} indice={2}/> */}
              </div>
            </div>

          </div>

          <div className={classes["container_body_center"]}>
            <div className={classes["postes"]}>
              <h3 className={classes["titre"]}>Ma Timeline</h3>
                {data_tl.posts && data_tl.posts.map((item) => (
                  <div className={classes["poste"]}>
                    <Poste poste={item} user={data_tl.users[item.id_user]}/>
                  </div>
                ))}
            </div>
          </div>

          <div className={classes["container_body_right"]}></div>

        </div>
      )}
    </>
  );
}
