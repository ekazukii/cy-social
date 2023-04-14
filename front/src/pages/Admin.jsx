import { useSession } from '../hooks/useSession';
import Modal from "../components/Modal/Modal";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Admin from "../components/Admin/Admin";
import Navbar from "../components/Navbar/Navbar";
import React, { useEffect, useState } from 'react';

export default function Admin1() {
    const { user, setSession, login, refreshData, logout } = useSession();

    useEffect(() => {
    fetch("http://localhost:3000/notif?user=1") // remplacez l'URL par celle de votre API
        .then(response => response.json())
        .then(data_notif => setData_notif(data_notif))
        .catch(error => console.error(error));
    }, []);

    const [data_notif, setData_notif] = useState([]);
    console.log(user);
    var isConnected= false;
    if(user?.id){isConnected=true;}

    return (
    <>
        <Navbar isConnected={isConnected} notifs={data_notif}/>
        <Admin />
    </>
    );
}