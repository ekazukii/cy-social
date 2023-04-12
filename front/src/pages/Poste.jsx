import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Poste from "../components/Poste/Poste";
import Navbar from "../components/Navbar/Navbar";
import Comment from "../components/Comment/Comment"
import "./poste.css";

export default function Post() {
  const { id } = useParams(); // extrait l'id de l'URL

  const [data, setData] = useState([]);

  const user_test = {
    "name": "Baillet Tom",
    "username": "@Youbuze",
    "nbPoste": 12,
    "nbFollow": 13,
    "nbFollower": 14
  }

  const [error, setError] = useState(null); // Ajout de l'état d'erreur

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`) // Récupère les données du post correspondant à l'id dans l'URL
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => setError(error)); // En cas d'erreur, on met à jour l'état d'erreur
  }, [id]); // Utilisation de l'id comme dépendance

  if (error) { // Si une erreur est survenue lors de la récupération des données
    // Redirection vers la page précédente
    window.history.back(); 
    return null; // On ne rend rien
  }

  const [data_notif, setData_notif] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/notif?user=1") // remplacez l'URL par celle de votre API
      .then(response => response.json())
      .then(data_notif => setData_notif(data_notif))
      .catch(error => console.error(error));
  }, []);

  console.log(data);
  return (
    <>
        <Navbar isConnected={true} notifs={data_notif}/>
        <div class="container_body">
            <div class="container_body_left">
            </div>
            <div class="container_body_center">
                {data.post && <Poste poste={data.post} user={user_test}/>}
                {data.comments && data.comments.map(comment => (
                    <Comment name={comment.id_user} 
                    username={comment.id_user} 
                    time={comment.date} 
                    recipient={data.post.id_user} 
                    content={comment.content} 
                    comments={[]}
                    />
                ))}
            </div>
            <div class="container_body_right">
            </div>
        </div>
    </>
  );
}