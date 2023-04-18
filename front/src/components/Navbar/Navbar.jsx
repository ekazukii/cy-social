import classes from './navbar.module.css';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useEffect, useState, useRef } from 'react';
import ContainerNotif from '../Notifications/ContainerNotif';
import { useSession } from '../../hooks/useSession';
import LoginModal from '../Login/Login';

/**
 *
 * @param {Object} props
 * @param {Object} props.notifs
 * @param {Boolean} props.isConnected
 * @returns
 */
export default function Navbar(props) {
  const { logout } = useSession();

  const [afficherDiv, setAfficherDiv] = useState(false);

  const toggleClick = () => {
    setAfficherDiv(!afficherDiv);
  };

  const ref = useRef();
  const ref2 = useRef();

  useOnClickOutside([ref, ref2], () => setAfficherDiv(false));

  const numberNotif = props.notifs.length;
  const isNotified = numberNotif > 0;
  return (
    <>
      <nav ref={ref}>
        <img
          src="https://user-images.githubusercontent.com/28058068/225023680-440646b9-9f7f-45cd-993b-abfbdeb69ba1.png"
          alt="logo"
          width="80rem"
          onClick={() => (window.location.href = '/')}
          style={{ cursor: 'pointer' }}
        />
        {props.isConnected ? (
          <div className={classes['button-group']}>
            <Icon
              className="iconNotif"
              icon="fi fi-sr-bell"
              iconClicked="fi fi-sr-bell"
              hoverColor="icon-will-be-blue"
              isNotified={isNotified}
              number={numberNotif}
              handleClick={toggleClick}
              font_size="1.5rem"
            />
            <Button text={'Profile'} type={'primary'} link={'/profil'} />
            <Button text={'Message'} link={'/messagerie'} />
            <Button text={'Administration'} link={'/admin'} />
            <Button text={'Déconnexion'} handleClick={() => logout()} />
          </div>
        ) : (
          <div>
            <LoginModal handleClose={() => setA} />
            <Button text={'Register'} link={'/register'} />
          </div>
        )}
      </nav>
      {afficherDiv && (
        <div className={classes['notifSum']}>
          <ContainerNotif ref={ref2} notifications={props.notifs} />
        </div>
      )}
    </>
  );
}
