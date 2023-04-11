import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Poste from "../components/Poste/Poste";
import Navbar from "../components/Navbar/Navbar";
import "./poste.css";

export default function Profil() {
  const { id } = useParams(); // extrait l'id de l'URL

  const [data, setData] = useState([]);

  const user_test = {
    "name": "Baillet Tom",
    "username": "@Youbuze",
    "nbPoste": 12,
    "nbFollow": 13,
    "nbFollower": 14
  }

  useEffect(() => {
    fetch("http://localhost:3000/post?user=1") // remplacez l'URL par celle de votre API
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
        <Navbar isConnected={true}/>
        <div class="container_body">
            <div class="container_body_left">
            </div>
            <div class="container_body_center">
                {data.map((item) => (
                    <Poste poste={item} user={user_test}/>
                ))}
            </div>
            <div class="container_body_right">
            </div>
        </div>
    </>
  );
}