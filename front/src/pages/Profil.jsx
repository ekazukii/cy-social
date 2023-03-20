import HeaderProfil from "../components/Header-profil/Header-profil"
import Navbar from "../components/Navbar/Navbar"
import Poste from "../components/Poste/Poste";
import "./profil.css"

export default function Profil(props) {
    return (
    <>
      <Navbar />
      <div className="container">
        <HeaderProfil username="@Youbuze" nbPoste="12" nbFollow="1212" nbFollower="1" isUser={true}/>
        <div className="switcher">
            <nav>
                <div>Postes</div>
                <div>Commentaires</div>
                <div>Likes</div>
            </nav>
            {props.info === "with-post" && 
        <div className="list-post">
            <Poste />
            <Poste />
        </div>
        }
        </div>
      </div>
    </>
    );
  }