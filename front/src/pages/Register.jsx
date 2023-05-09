import { useState } from 'react';
import classes from './Register.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import OpnAvatar from '../components/Avatar/Avatar';
import Navbar from '../components/Navbar/Navbar';
import { getBaseUrl } from '../utils/config';
import { redirect } from 'react-router-dom';

export default function RegisterPage() {
  const [formValues, setFormValues] = useState({
    firstName: {
      value: '',
      isValid: false
    },
    username: {
      value: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    confirmPassword: {
      value: '',
      isValid: false
    },
    contact: {
      value: '',
      isValid: false
    }
  });

  const validateContact = value => {
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/gm;
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/gm;

    return value.match(phoneRegex) || value.match(mailRegex);
  };

  const validateConfirmPassword = value => {
    return value === formValues.password.value;
  };

  const validateOther = value => {
    return value.length >= 5;
  };

  const handleChange = (event, name) => {
    const value = event.target.value;
    let isValid = true;

    if (name === 'contact') {
      isValid = validateContact(value);
    } else if (name === 'confirmPassword') {
      isValid = validateConfirmPassword(value);
    } else {
      isValid = validateOther(value);
    }

    setFormValues({ ...formValues, [name]: { value, isValid } });
  };

  const handleAvatarChange = config => {
    setFormValues({ ...formValues, avatar: { value: config, isValid: true } });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!formValues.firstName.isValid) {
      return alert('Le prénom doit contenir au moins 5 caractères');
    }

    if (!formValues.username.isValid) {
      return alert("Le nom d'utilisateur doit contenir au moins 5 caractères");
    }

    if (!formValues.password.isValid) {
      return alert('Le mot de passe doit contenir au moins 5 caractères');
    }

    if (!formValues.confirmPassword.isValid) {
      return alert('Les mots de passe ne correspondent pas');
    }

    if (!formValues.contact.isValid) {
      return alert('Le contact doit être un numéro de téléphone ou une adresse mail valide');
    }

    const data = await fetch(getBaseUrl() + '/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formValues.firstName.value,
        username: formValues.username.value,
        password: formValues.password.value,
        mail: formValues.contact.value,
        tel: formValues.contact.value,
        img: formValues.avatar.value
      })
    });

    if (data.status == 200) {
      window.location.replace(location.origin);
    } else {
      alert('Une erreur est survenue');
    }
  };

  return (
    <>
    <Navbar isConnected={false} />
    <div className={classes['container']}>
      <h1>Créer un compte</h1>
      <form onSubmit={handleSubmit}>
        <OpnAvatar handleAvatarChange={handleAvatarChange} />
        <Input
          label="Prénom :"
          id="firstName"
          type="text"
          onChange={e => handleChange(e, 'firstName')}
          value={formValues.firstName.value}
          isValid={formValues.firstName.isValid}
          large
        />

        <Input
          label="Nom d'utilisateur :"
          id="username"
          type="text"
          onChange={e => handleChange(e, 'username')}
          value={formValues.username.value}
          isValid={formValues.username.isValid}
          large
        />

        <Input
          label="Mot de passe :"
          id="password"
          type="password"
          onChange={e => handleChange(e, 'password')}
          value={formValues.password.value}
          isValid={formValues.password.isValid}
          large
        />

        <Input
          label="Confirmer le mot de passe :"
          id="confirmPassword"
          type="password"
          onChange={e => handleChange(e, 'confirmPassword')}
          value={formValues.confirmPassword.value}
          isValid={formValues.confirmPassword.isValid}
          large
        />

        <Input
          label="Contact (Téléphone ou email) :"
          id="contact"
          type="text"
          onChange={e => handleChange(e, 'contact')}
          value={formValues.contact.value}
          isValid={formValues.contact.isValid}
          placeholder="+33"
          large
        />

        <Button type="primary" text="Soumettre" />
      </form>
    </div>
    </>
  );
}
