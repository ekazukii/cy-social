import Icon from '../components/Icon/Icon';
import Poste from '../components/Poste/Poste';
import PosteList from '../components/Poste/PosteList';
import Navbar from '../components/Navbar/Navbar';
import React, { useState, useEffect } from 'react';

export default function Test() {
  let [postes, setPostes] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/post")
    .then(response => response.json())
    .then(data => setPostes(data))
  },[])

  return (
    <>
      <Navbar isConnected={true}/>
      {postes && <PosteList postes ={postes}/>}
    </>
  );
}