import { useSession } from '../hooks/useSession';
import Modal from '../components/Modal/Modal';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import Admin from '../components/Admin/Admin';
import Navbar from '../components/Navbar/Navbar';
import React, { useEffect, useState } from 'react';

export default function Admin1() {
  return (
    <>
      <Navbar />
      <Admin />
    </>
  );
}
