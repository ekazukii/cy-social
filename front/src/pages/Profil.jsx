import HeaderProfil from '../components/Header-profil/Header-profil';
import Banner from '../components/Banner/Banner';
import Navbar from '../components/Navbar/Navbar';
import Poste from '../components/Poste/Poste';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSession } from '../hooks/useSession';
import classes from './profil.module.css';
import CreatePoste from '../components/Poste/CreatePoste';
import Recap from '../components/Recap/Recap';
import RecapFav from '../components/Recap/RecapFav';

export default function Profil(props) {
  const { user, isLoggedIn, setSession, login, refreshData, logout } = useSession();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numGroups, setNumGroups] = useState(3); // Nombre de groupes affichés par défaut

  const { id_other_user } = useParams();

  useEffect(() => {
    if (isLoggedIn == true) {
      const infoUserConnected = fetch(`http://localhost:3000/user/${user.id}`).then(response => response.json());
      const groupUserConnected = fetch(`http://localhost:3000/group?user=${user.id}`).then(response => response.json());
      if (props.otherProfil && id_other_user > 0) {
        const userProfil = fetch(`http://localhost:3000/user/${id_other_user}`).then(response => response.json());
        const postUserProfil = fetch(`http://localhost:3000/post?user=${id_other_user}`).then(response =>
          response.json()
        );
        Promise.all([infoUserConnected, userProfil, groupUserConnected, postUserProfil])
          .then(([userConnectedData, userData, groupData, postDataUserProfil]) => {
            const data = {
              userConnected: userConnectedData[0],
              user: userData[0],
              group: groupData,
              posts: postDataUserProfil
            };
            setData(data);
            setIsLoading(false);
          })
          .catch(error => setError(error));
      } else {
        const postUserConnected = fetch(`http://localhost:3000/post?user=${user.id}`).then(response => response.json());
        Promise.all([infoUserConnected, groupUserConnected, postUserConnected])
          .then(([userConnectedData, groupData, postData]) => {
            const data = {
              userConnected: userConnectedData[0],
              user: userConnectedData[0],
              group: groupData,
              posts: postData
            };
            setData(data);
            setIsLoading(false);
          })
          .catch(error => setError(error));
      }
    } else if (isLoggedIn == false) {
      window.location.replace(`/`);
    }
  }, [isLoggedIn, user]);
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
                <div className={classes['recapBox']}>
                  <RecapFav post={data.posts[0]} indice={0} />
                  <RecapFav post={data.posts[0]} indice={1} />
                  <RecapFav post={data.posts[0]} indice={2} />
                </div>
              </div>
            </div>

            {/* conteneur flex central  */}
            <div className={classes['container_body_center']}>
              <div className={classes['banner']}>
                <Banner user={data.user} />
              </div>

              <div className={classes['postes']}>
                <h3 className={classes['titre']}>Les postes de @{data.user.username}</h3>

                <div className={classes['list-post']}>
                  {data.posts.map((item, index) => (
                    <div className={classes['poste']}>
                      <Poste key={index} poste={item} user={data.user} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* conteneur flex gauche  */}
            {/* <div className={classes["container_body_right"]}></div> */}
          </div>
        </>
      )}
    </>
  );
}
