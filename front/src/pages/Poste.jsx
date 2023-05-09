import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Poste from '../components/Poste/Poste';
import Navbar from '../components/Navbar/Navbar';
import Comment from '../components/Comment/Comment';
import './poste.css';
import WriteComment from '../components/Comment/WriteComment';
import { getBaseUrl } from '../utils/config';

export default function Post() {
  const { id } = useParams(); // extrait l'id de l'URL
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Ajout de l'état d'erreur

  const deleteComment = id => {
    setData({ ...data, comments: data.comments.filter(comm => comm.id != id) });
  };

  if (error) {
    // Si une erreur est survenue lors de la récupération des données
    // Redirection vers la page précédente
    window.history.back();
    return null; // On ne rend rien
  }

  const updatePosts = () => {
    // Récupération des données du post
    fetch(`${getBaseUrl()}/post/${id}`)
      .then(response => response.json())
      .then(postData => {
        // Récupération des données des utilisateurs associés
        const userId = postData.post.id_user;
        const userPromise = fetch(`${getBaseUrl()}/user/${userId}`).then(response => response.json());

        const userCommentPromises = Object.keys(postData.comments).map(commentId => {
          const userId = postData.comments[commentId].id_user;
          return fetch(`${getBaseUrl()}/user/${userId}`).then(response => response.json());
        });

        // Utilisation de Promise.all pour attendre que toutes les requêtes soient terminées
        Promise.all([userPromise, ...userCommentPromises])
          .then(([userData, ...userCommentDataPromises]) => {
            // Création d'un objet contenant les données du post et des utilisateurs associés
            const data = { post: postData.post, comments: postData.comments, users: {} };
            data.users[userData[0].id] = userData[0];
            userCommentDataPromises.forEach(userData => {
              const user = userData[0]; // userData est un tableau contenant un seul objet utilisateur
              data.users[user.id] = user;
            });

            // Mise à jour de l'état avec les données
            setData(data);
          })
          .catch(error => setError(error));
      })
      .catch(error => setError(error));
  };

  useEffect(() => {
    updatePosts();
  }, [id]);

  return (
    <>
      <Navbar />
      <div class="container_body">
        <div class="container_body_left"></div>
        <div class="container_body_center">
          {data.post && (
            <Poste
              poste={data.post}
              user={data.users[data.post.id_user]}
              isLinkToPost={false}
              updatePosts={() => updatePosts()}
            />
          )}
          <WriteComment idPost={id} />
          {data.comments &&
            data.comments.map(comment => (
              <Comment
                comment={comment}
                userSender={data.users[comment.id_user]}
                userReceiver={data.users[data.post.id_user]}
                updateComments={() => deleteComment(comment.id)}
              />
            ))}
        </div>
        <div class="container_body_right"></div>
      </div>
    </>
  );
}
