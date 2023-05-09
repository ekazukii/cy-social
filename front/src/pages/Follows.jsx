import { getBaseUrl } from '../utils/config';
import Navbar from '../components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import { useParams } from 'react-router-dom';
import classes from './follows.module.css';
import CreatePoste from '../components/Poste/CreatePoste';
import RecapFollow from '../components/Recap/RecapFollow';
import Recap from '../components/Recap/Recap';

export default function Follows({ isFollow }) {
  const { user, isLoggedIn, setSession, login, refreshData, logout } = useSession();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numGroups, setNumGroups] = useState(3); // Nombre de groupes affichés par défaut
  const { id_user } = useParams();

  useEffect(() => {
    if (isLoggedIn == true) {
      const infoUserConnected = fetch(`${getBaseUrl()}/user/${user.id}`).then(response => response.json());
      const notifUserConnected = fetch(`${getBaseUrl()}/notif?user=${user.id}`).then(response => response.json());
      const groupUserConnected = fetch(`${getBaseUrl()}/group?user=${user.id}`).then(response => response.json());
      const followUserConnected = fetch(`${getBaseUrl()}/user/${id_user}/${isFollow ? 'following' : 'followers'}`).then(
        response => response.json()
      );
      const followUserPage = fetch(`${getBaseUrl()}/user/${user.id}/followers`).then(response => response.json());
      Promise.all([infoUserConnected, notifUserConnected, groupUserConnected, followUserConnected, followUserPage])
        .then(([userConnectedData, notifData, groupData, followData, followMeData]) => {
          const data = {
            userConnected: userConnectedData[0],
            notif: notifData,
            group: groupData,
            follow: followData,
            followMeData: followMeData
          };
          setData(data);
          setIsLoading(false);
        })
        .catch(error => setError(error));
    } else if (isLoggedIn == false) {
      window.location.replace(`/`);
    }
  });
  console.log(data);
  return (
    <>
      {isLoading ? (
        <div>Chargement des données...</div>
      ) : (
        <>
          <Navbar isConnected={isLoggedIn} notifs={data.notif} />
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
            <div className={classes['container_body_center']} style={{ marginTop: '2rem' }}>
              <nav className={classes['nav']}>
                <div onClick={() => window.location.replace(`/follows/${id_user}`)}>Abonnés</div>
                <div onClick={() => window.location.replace(`/followers/${id_user}`)}>Abonnements</div>
              </nav>
              {data.follow &&
                data.follow.map((item, key) => (
                  <RecapFollow
                    user={item}
                    follower={data.userConnected}
                    indice={key}
                    addButton={true}
                    isFollow={data.followMeData.some(followMeData => followMeData.id === item.id)}
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
