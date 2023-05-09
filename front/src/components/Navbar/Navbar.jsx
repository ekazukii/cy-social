import classes from './navbar.module.css';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import ContainerNotif from '../Notifications/ContainerNotif';
import LoginModal from '../Login/Login';
import { useEffect, useState, useRef } from 'react';
import { useSession } from '../../hooks/useSession';
import { getBaseUrl } from '../../utils/config';

/**
 *
 * @param {Object} props
 * @param {Object} props.notifs
 * @param {Boolean} props.isConnected
 * @returns
 */
export default function Navbar(props) {
  const { logout, user, isLoggedIn } = useSession();

  const [notifs, setNotifs] = useState([]);

  const [afficherDiv, setAfficherDiv] = useState(false);

  const toggleClick = () => {
    setAfficherDiv(!afficherDiv);
  };

  const moveToMessage = () => {
    window.location.replace(`/messagerie`);
  };

  useEffect(() => {
    if (!user) return;
    fetch(`${getBaseUrl()}/notif?user=${user.id}`)
      .then(response => response.json())
      .then(n => {
        setNotifs(n);
      });
  }, [user]);

  const ref = useRef();
  const ref2 = useRef();

  useOnClickOutside([ref, ref2], () => setAfficherDiv(false));

  const numberNotif = notifs.length || 0;
  const isNotified = numberNotif > 0;
  return (
    <>
      <nav ref={ref}>
        <img
          className={classes['logo']}
          src={window.innerWidth <= 768 ? '/img/survey_sphere_mobile.PNG' : '/img/survey_sphere_02.PNG'}
          width={window.innerWidth <= 768 ? '30rem' : '145rem'}
          alt="logo"
          onClick={() => (window.location.href = '/')}
          style={{ cursor: 'pointer' }}
        />
        {isLoggedIn ? (
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
              color="#FCA311"
            />
            <Icon
              className="iconMessage"
              icon="fi fi-sr-envelope"
              iconClicked="fi fi-sr-envelope"
              hoverColor="icon-will-be-blue"
              isNotified={false}
              handleClick={moveToMessage}
              font_size="1.5rem"
              color="#FCA311"
            />
            <Button text={'Profile'} type={'primary'} link={'/profil'} />
            <Button text={'Paramètres'} link={'/settings'} />
            {/* <Button text={'Administration'} link={'/admin'} /> */}
            <Button text={'Déconnexion'} handleClick={() => logout()} />
          </div>
        ) : (
          <div>
            <LoginModal handleClose={() => setAfficherDiv} />
            <Button text={'Register'} link={'/register'} />
          </div>
        )}
      </nav>
      {isLoggedIn && afficherDiv && (
        <div className={classes['notifSum']}>
          <ContainerNotif ref={ref2} notifications={notifs} />
        </div>
      )}
    </>
  );
}
