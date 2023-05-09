import { useState } from "react";
import classes from "./settings.module.css";
import Button from "../Button/Button";

export default function Settings() {

  // Initial values
  const [username, setUsername] = useState("XXJoJoXX");
  const [name, setName] = useState("John");
  const [adress, setAdress] = useState("4 Avenue Jaques Prévert 95000 Cergy");
  
  //passwords
  const [newPassword1, setNewPassword1] = useState("fakepasword"); 
  const [newPassword2, setNewPassword2] = useState(""); 
  const [oldPassword, setOldPassword] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  
  //phone_number
  const initialPhoneNumber = "0678984201";
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const handlePhoneNumberBlur = (event) => {
    event.preventDefault();
    validatePhoneNumber(phoneNumber);
  };
  const validatePhoneNumber = (email) => {
    const regex = /^[0-9]{10}$/;
    if (regex.test(email)) {
      setIsValidPhoneNumber(true);
    } else {
      setPhoneNumber(initialPhoneNumber);
      setIsValidPhoneNumber(false);
    }
  };

  //email
  const initialEmail = "john.smith@gmail.com";
  const [email, setEmail] = useState(initialEmail);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handleEmailBlur = (event) => {
    event.preventDefault();
    validateEmail(email)
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setIsValidEmail(true);
    } else {
      setEmail(initialEmail);
      setIsValidEmail(false);
    }
  };

  // Birth date
  const initialBirthDate = "01/04/2001";
  const [birthDate, setBirthDate] = useState(initialBirthDate);
  const [isValidBirthDate, setIsValidBirthDate] = useState(true);
  const handleBirdDateBlur = (event) => {
    event.preventDefault();
    validateBirthDate(birthDate);
  };
  const validateBirthDate = (email) => {
    const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (regex.test(birthDate)) {
      setIsValidBirthDate(true);
    } else {
      setBirthDate(initialBirthDate);
      setIsValidBirthDate(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    validateEmail(email)
    validatePhoneNumber(phoneNumber);
    validateBirthDate(birthDate);
    // TODO: Handle form submission and update user's information
  };

  return (
    <div className={classes.settings}>
      <h1>Paramètres</h1>
      <form>
        <div className={classes.field}>
          <label type={"primary"}>Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label type={"primary"}>Nom :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label type={"primary"}>Prénom :</label>
          {!isValidPhoneNumber && (<p className={classes.redText}>Entrez un numéro de téléphone valide</p>)}
          <input
            type={"primary"}
            id="phone-number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            onBlur={handlePhoneNumberBlur}
          />
        </div>
        <div className={classes.field}>
          <label type={"primary"}>Email :</label>
          {!isValidEmail && (<p className={classes.redText}>Entrez un email valide</p>)}
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={handleEmailBlur}
          />
        </div>
        <div className={classes.field}>
          <label type="password">Mot de Passe :</label>
          {showPasswordFields && (<p className={classes.redText}>Nouveau mot de passe</p>)}
            <input
              id="new-password-1"
              type="password"
              value={newPassword1}
              onChange={(event) => setNewPassword1(event.target.value)}
              onFocus={(e) => {
                setNewPassword1("");
                setShowPasswordFields(true);
                setTimeout(() => {
                  document.getElementById("old-password").scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                  });
                }, 50);
              }}
            />
          {showPasswordFields && (
            <>
              <p className={classes.redText}>Réentrer le nouveau mot de passe</p>
                <input
                  id="new-password-2"
                  type="password"
                  value={newPassword2}
                  onChange={(event) => setNewPassword2(event.target.value)}
                />
              <p className={classes.redText}>Ancien mot de passe</p>
                <input
                  id="old-password"
                  type="password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                />
            </>
          )}
        </div>
        <div className={classes.field}>
          <label type={"primary"}>Adresse :</label>
          <input
            type="text"
            id="adress"
            value={adress}
            onChange={(event) => setAdress(event.target.value)}
          />
        </div>
        <div className={classes.field}>
          <label type={"primary"}>Date de naissance (DD/MM/YYYY) :</label>
          {!isValidBirthDate && (<p className={classes.redText}>Entrez une date de naissance valide</p>)}
          <input
            type="text"
            id="birth-date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
            onBlur = {handleBirdDateBlur}
          />
        </div>
      <Button text={"Enregistrer"} type={"primary"} handleClick={handleSubmit} />
      </form>
    </div>
  );

}