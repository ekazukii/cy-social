import HeaderProfil from "../components/Header-profil/Header-profil";
import Banner from "../components/Banner/Banner";
import Navbar from "../components/Navbar/Navbar";
import Poste from "../components/Poste/Poste";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import classes from "./profil.module.css";
import CreatePoste from "../components/Poste/CreatePoste"
import Recap from "../components/Recap/Recap";
import RecapFav from "../components/Recap/RecapFav";

export default function Profil(props) {
  const { user, setSession, login, refreshData, logout } = useSession();
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState({});
  const [dataGroup, setDataGroup] = useState({});
  const [dataNotif, setDataNotif] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numGroups, setNumGroups] = useState(3); // Nombre de groupes affichés par défaut
  const [numFav, setNumFav] = useState(3);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/post?user=4").then(response => response.json()),
      fetch("http://localhost:3000/user/4").then(response => response.json()),
      fetch("http://localhost:3000/notif?user=1").then(response => response.json()),
      fetch("http://localhost:3000/group/?user=1").then(response => response.json()),
    ]).then(([postData, userData, notifData, groupData]) => {
      setData(postData);
      setDataUser(userData[0]);
      setDataNotif(notifData);
      setDataGroup(groupData);
      setIsLoading(false);
    }).catch(error => console.error(error));
  }, []);

  const isConnected = !!user?.id;

  console.log("user:", user);
  console.log("data:", data);
  console.log("dataUser:", dataUser);
  console.log("dataNotif:", dataNotif);
  console.log("dataGroup:", dataGroup);
  return (
    <>
      <Navbar isConnected={isConnected} notifs={dataNotif} />
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        // conteneur flex principale
        <div className={classes["container_body"]}>

          {/* conteneur flex droit  */}
          <div className={classes["container_body_left"]}>

            <div className={classes["nouveau_sondage"]}>
              <h3 className={classes["titre"]}>Nouveau Sondage</h3>
              <CreatePoste author={dataUser}/>
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
                <RecapFav post={data[0]} indice={0}/>
                <RecapFav post={data[0]} indice={1}/>
                <RecapFav post={data[0]} indice={2}/>
              </div>
            </div>

          </div>

          {/* conteneur flex central  */}
          <div className={classes["container_body_center"]}>

            <div className={classes["banner"]}>
              <Banner user={dataUser} />
            </div>

            <div className={classes["postes"]}>
            <h3 className={classes["titre"]}>Les postes de @{dataUser.username}</h3>
            {props.info === "with-post" && (
              <div className={classes["list-post"]}>
                {data.map((item, index) => (
                  <div className={classes["poste"]}>
                    <Poste key={index} poste={item} user={dataUser} />
                  </div>
                  ))}
              </div>
            )}
            </div>

          </div>

          {/* conteneur flex gauche  */}
          {/* <div className={classes["container_body_right"]}></div> */}

        </div>
      )}
    </>
  );
}
