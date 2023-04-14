import HeaderProfil from "../components/Header-profil/Header-profil";
import Banner from "../components/Banner/Banner";
import Navbar from "../components/Navbar/Navbar";
import Poste from "../components/Poste/Poste";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import classes from "./profil.module.css";

export default function Profil(props) {
  const { user, setSession, login, refreshData, logout } = useSession();
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [dataNotif, setDataNotif] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/post?user=4").then(response => response.json()),
      fetch("http://localhost:3000/user/1").then(response => response.json()),
      fetch("http://localhost:3000/notif?user=1").then(response => response.json()),
    ]).then(([postData, userData, notifData]) => {
      setData(postData);
      setDataUser(userData[0]);
      setDataNotif(notifData);
      setIsLoading(false);
    }).catch(error => console.error(error));
  }, []);

  const isConnected = !!user?.id;

  console.log("user:", user);
  console.log("data:", data);
  console.log("dataUser:", dataUser);
  console.log("dataNotif:", dataNotif);

  return (
    <>
      <Navbar isConnected={isConnected} notifs={dataNotif} />
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <div className={classes["container_body"]}>
          {/* Affichage des informations de l'utilisateur */}
          <div className={classes["container_body_left"]}>
            <h3>Nouveau Sondage</h3>
            <Banner user={dataUser} />
            <h3>Mon Recap</h3>
            <div className={classes["recapBox"]}>

            </div>
            <h3>Mes favoris</h3>
            <div className={classes["recapBox"]}>

            </div>
          </div>
          <div className={classes["container_body_center"]}>
            <h3>Ma Timeline</h3>
            {props.info === "with-post" && (
              <div className={classes["list-post"]}>
                {data.map((item, index) => (
                  <Poste key={index} poste={item} user={dataUser} />
                ))}
              </div>
            )}
          </div>
          <div className={classes["container_body_right"]}>
          </div>
        </div>
      )}
    </>
  );
}
