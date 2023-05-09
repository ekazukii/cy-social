import Navbar from '../components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import classes from './listgroup.module.css';
import CreatePoste from '../components/Poste/CreatePoste';
import Recap from '../components/Recap/Recap';
import RecapFav from '../components/Recap/RecapFav';
import { getBaseUrl } from '../utils/config';

export default function ListGroup() {
  const { user, isLoggedIn, setSession, login, refreshData, logout } = useSession();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numGroups, setNumGroups] = useState(3); // Nombre de groupes affichés par défaut

  useEffect(() => {
    if (isLoggedIn == true) {
      const infoUserConnected = fetch(`${getBaseUrl()}/user/${user.id}`).then(response => response.json());
      const groupUserConnected = fetch(`${getBaseUrl()}/group?user=${user.id}`).then(response => response.json());
      const groupAllPublic = fetch(`${getBaseUrl()}/group/all`).then(response => response.json());
      Promise.all([infoUserConnected, groupUserConnected, groupAllPublic])
        .then(([userConnectedData, groupData, groupAllData]) => {
          const data = {
            userConnected: userConnectedData[0],
            group: groupData,
            allGroups: groupAllData
          };
          setData(data);
          setIsLoading(false);
        })
        .catch(error => setError(error));
    } else if (isLoggedIn == false) {
      window.location.replace(`/`);
    }
  }, [user]);
  return (
    <>
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <>
          <Navbar />
          <div className={classes['container_body']}>
            {/* conteneur flex droit  */}
            <div className={classes['container_body_left']}>
              <div className={classes['nouveau_sondage']}>
                <h3 className={classes['titre']}>Nouveau Sondage</h3>
                <CreatePoste author={data.userConnected} />
              </div>

              <div className={classes['mes_groupes']}>
                <h3 className={classes['titre']}>Mes groupes</h3>
                <div className={classes['recapBox']}>
                  {data.group.groups &&
                    data.group.groups
                      .slice(0, numGroups)
                      .map((item, key) => <Recap group={item} indice={key} isLinkToGroup={true} />)}
                  {data.group.groups && data.group.groups.length > numGroups && (
                    <span className={classes['voirPlus']} onClick={() => setNumGroups(numGroups + 3)}>
                      Voir plus
                    </span>
                  )}
                </div>
              </div>

              <div className={classes['mes_favories']}>
                <h3 className={classes['titre']}>Mes favoris</h3>
                {/* <div className={classes["recapBox"]}>
                <RecapFav post={data.posts[0]} indice={0}/>
                <RecapFav post={data.posts[0]} indice={1}/>
                <RecapFav post={data.posts[0]} indice={2}/>
              </div> */}
              </div>
            </div>

            {/* conteneur flex central  */}
            <div className={classes['container_body_center']}>
              {data.allGroups.groups &&
                data.allGroups.groups.map((item, key) => (
                  <Recap
                    group={item}
                    indice={key}
                    isLinkToGroup={false}
                    addButton={true}
                    user={user}
                    isInGroup={data.group.groups.find(group => group.id === item.id)}
                  />
                ))}
            </div>

            {/* conteneur flex gauche  */}
            {/* <div className={classes["container_body_right"]}></div> */}
          </div>
        </>
      )}
    </>
  );
}
