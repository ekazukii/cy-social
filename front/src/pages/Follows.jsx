import CreatePoste from "../components/Poste/CreatePoste"
import Navbar from "../components/Navbar/Navbar"
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Poste from "../components/Poste/Poste";
import classes from "./accueil.module.css";
import { useSession } from '../hooks/useSession';
import Recap from "../components/Recap/Recap";
import RecapFav from "../components/Recap/RecapFav";
import Banner from "../components/Banner/Banner";

export default function Follows() {
  const { id_user } = useParams();

  const { user, setSession, login, refreshData, logout } = useSession(); // Recup isConnected depuis useSession

  const [data_follow, setData_follow] = useState([]);
  const [data_follower, setData_follower] = useState([]);
  const [idUser, setId_user] = useState([]);
  const [data_notif, setData_notif] = useState([]);
  const [dataUser, setData_user] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // envoi des requêtes au serveur + récupération des réponses du serveur
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3000/user/${id_user}/following`).then(response => response.json()),
      fetch(`http://localhost:3000/user/${id_user}/followers`).then(response => response.json()),
      fetch("http://localhost:3000/auth/whoami?onlyId=true").then(response => response.json()),
    ]).then(([data_follow, data_follower, idUser]) => {
      setData_follow(data_follow);
      setData_follower(data_follower);
      setId_user(idUser);
      setIsLoading(false);
    }).catch(error => console.error(error));
  }, []);
    
  if(idUser.user != null){
    useEffect(() => {
        Promise.all([
          fetch(`http://localhost:3000/notif?user=${idUser.user[id]}`).then(response => response.json()),
          fetch(`http://localhost:3000/user/${idUser.user[id]}`).then(response => response.json()),
        ]).then(([data_notif, dataUser]) => {
          setData_notif(data_notif);
          setData_user(dataUser[0]);
        }).catch(error => console.error(error));
      }, []);
  }
  
  let isConnected= false;
  if(user?.id){isConnected=true;}
  return (
    <>
      <Navbar isConnected={isConnected} notifs={data_notif}/>
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <div className={classes["container_body"]}>
            <Banner user={dataUser} />
            <div className={classes["container_body_contain"]}>
                
            </div>
            
        </div>
      )}
    </>
  );
}
