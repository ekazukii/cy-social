import { useState } from 'react';
import classes from './Register.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Navbar from '../components/Navbar/Navbar';
import Icon from '../components/Icon/Icon';
import Poste from '../components/Poste/Poste';
import HeaderProfil from "../components/Header-profil/Header-profil";

export default function Notif(props) {
  return (
    <>
        <Navbar isConnected={true}/>
        <div className="container">
            <HeaderProfil username="@Youbuze" nbPoste="12" nbFollow="1212" nbFollower="1"/>
            
        </div>
    </>
  );
}
