import HeaderProfil from "../components/Header-profil/Header-profil"
import Navbar from "../components/Navbar/Navbar"
import Poste from "../components/Poste/Poste";
import "./profil.css"
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

export default function Profil(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/post?user=1") // remplacez l'URL par celle de votre API
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

    return (
    <>
      <Navbar />
      <div className="container">
        <HeaderProfil username="@Youbuze" nbPoste="12" nbFollow="1212" nbFollower="1"/>
        <div className="switcher">
            <nav>
                <div>Postes</div>
                <div>Commentaires</div>
                <div>Likes</div>
            </nav>
            {props.info === "with-post" && 
            <div className="list-post">
                {data.map((item, index) => (
                    <div key={index}>
                        <Poste poste={item} />
                    </div>
                ))}
            </div>
            }
        </div>
      </div>
    </>
    );
  }