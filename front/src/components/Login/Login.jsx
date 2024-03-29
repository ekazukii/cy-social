import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Toast from '../Toast/Toast';
import { useSession } from '../../hooks/useSession';

const LoginModal = ({ handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const { login } = useSession();

  const tryLogin = async () => {
    try {
      await login(username, password);
    } catch {
      setShowToast(true);
      handleClose();
    }
  };

  return (
    <>
      <Modal
        textButton="Connexion"
        title={
          <img
            src="/img/survey_sphere_02.PNG"
            alt="logo"
            width="125rem"
          />
        }
      >
        <p>Connectez vous pour en voir plus!</p>
        <Input
          id="user"
          label="Identifiant"
          type="text"
          placeholder="Entrez votre nom"
          onChange={e => setUsername(e.target.value)}
        />
        <Input
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="Entrez votre mot de passe"
          onChange={e => setPassword(e.target.value)}
        />
        <Button text={'Se connecter'} type={'primary'} handleClick={tryLogin} />
      </Modal>
      {showToast && <Toast message="Erreur lors de la connexion" onClose={handleCloseToast} />}
    </>
  );
};

export default LoginModal;
