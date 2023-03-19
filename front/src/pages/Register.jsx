import { useState } from 'react';
import classes from './Register.module.css';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';

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

  const handleChange = (event, name) => {
    const value = event.target.value;
    let isValid = true;

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/gm;
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/gm;

    const contactValue = formValues.contact.value;
    if (name === 'contact' && !contactValue.match(phoneRegex) && !contactValue.match(mailRegex)) {
      isValid = false;
    } else if (name === 'confirmPassword' && value !== formValues.password.value) {
      isValid = false;
    } else if (value.length < 5) {
      isValid = false;
    }

    setFormValues({ ...formValues, [name]: { value, isValid } });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <div className={classes['container']}>
      <form onSubmit={handleSubmit}>
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
          large
        />

        <Button type="primary" text="Soumettre" />
      </form>
    </div>
  );
}
