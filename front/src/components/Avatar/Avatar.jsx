import * as NiceAvatarLib from 'react-nice-avatar';
import classes from './avatar.module.css';
import { useEffect, useState } from 'react';

const NiceAvatar = NiceAvatarLib.default;
const genConfig = NiceAvatarLib.genConfig;

const OpnAvatar = ({ handleAvatarChange, defAvatar }) => {
  const [config, setConfig] = useState(genConfig());

  const onAvatarChange = cg => {
    setConfig(cg);
    if (typeof handleAvatarChange === 'function') handleAvatarChange(cg);
  };

  const refreshConfig = event => {
    onAvatarChange(genConfig());
  };

  useEffect(() => {
    if (defAvatar) {
      onAvatarChange(defAvatar);
    } else {
      refreshConfig();
    }
  }, []);

  return (
    <>
      <div>
        <NiceAvatar style={{ width: '8rem', height: '8rem' }} {...config} id={'nice-avatar'} />
        <div className={classes['icon-ctn']}>
          <img src="/svg/fi-rr-refresh.svg" className={classes['refresh']} onClick={refreshConfig} />
        </div>
      </div>
    </>
  );
};

export default OpnAvatar;
