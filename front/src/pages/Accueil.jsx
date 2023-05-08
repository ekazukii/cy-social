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

  const { user, isLoggedIn, setSession, login, refreshData, logout } = useSession();
  console.log(user);

  const [data, setData] = useState([]);
  const [numGroups, setNumGroups] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  id_tl_group && console.log("id tl groupe : "+id_tl_group);


  useEffect(() => {
    if(isLoggedIn == true){
      const infoUserConnected = fetch(`http://localhost:3000/user/${user.id}`).then(response => response.json());
      const notifUserConnected = fetch(`http://localhost:3000/notif?user=${user.id}`).then(response => response.json());
      const groupUserConnected = fetch(`http://localhost:3000/group?user=${user.id}`).then(response => response.json());
      const tlUserConnected = fetch(`http://localhost:3000/post/tl?${id_tl_group > 0 ? "group="+id_tl_group : "user="+user.id}`).then(response => response.json());
        Promise.all([infoUserConnected, notifUserConnected, groupUserConnected, tlUserConnected])
          .then(([userConnectedData, notifData, groupData, postData]) => {
            const data = { userConnected : userConnectedData[0], notif : notifData, group : groupData, posts : postData };
            setData(data);
            setIsLoading(false);
          })
          .catch(error => setError(error));
    }
    else if(isLoggedIn == false){
      setIsLoading(false);
    }
  });  

  console.log(data);
  return (
    <>
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <>
        <Navbar isConnected={isLoggedIn} notifs={isLoggedIn && data.notif}/>
        <div className={classes["container_body"]}>
          {isLoggedIn && (
            <>
          <div className={classes["container_body_left"]}>

            <div className={classes["nouveau_sondage"]}>
              <h3 className={classes["titre"]}>Nouveau Sondage</h3>
              <CreatePoste author={data.userConnected}/>
            </div>

            
            <div className={classes["mes_groupes"]}>
              <h3 className={classes["titre"]}>Mes groupes</h3>
              <div className={classes["recapBox"]}>
                {data.group.groups && data.group.groups.slice(0, numGroups).map((item, key) =>
                  <Recap group={item} indice={key} isLinkToGroup={true}/>
                )}
                {data.group.groups && data.group.groups.length > numGroups && (
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
                {data.posts.posts && data.posts.posts.map((item) => (
                  <div className={classes["poste"]}>
                    <Poste poste={item} user={data.posts.users[item.id_user]}/>
                  </div>
                ))}
            </div>
          </div>

          <div className={classes["container_body_right"]}></div>
          </>
          )}
          <div className={classes["container_body_center"]}>
            <div className={classes["postes"]}>
              <h3 className={classes["titre"]}>Bienvenue sur SurveySphere!</h3>
              <p>Visiblement tu n'es pas connecté, quel dommage! Afin de profiter de SurveySphere, nous t'invitons soit à t'inscrire soit à te connecter.</p>
            </div>
          </div>
        </div>
        </>
      )}
    </>
  );
}
