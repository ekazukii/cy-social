import HeaderProfil from '../Header-profil/Header-profil';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import classes from './createPoste.module.css';
import React, { useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import Select from '../Input/Select';

/**
 *
 * @param {Object} props
 * @param {Object} props.author
 * @param {Number} props.author.id
 * @param {String} props.author.name
 * @param {String} props.author.img
 * @param {Object} props.groups
 * @returns
 */

export default function CreatePoste(props) {
  const avatarRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const [postName, setPostName] = useState('');
  const [postGroup, setPostGroup] = useState('1');
  const [postImg, setPostImg] = useState('');
  const [postVoteEndDate, setPostVoteEndDate] = useState('');
  const [postContent, setPostContent] = useState('');

  const handleHover = () => {
    setIsHovering(true);
  };

  const handleLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className={classes['create-post-container']}>
      <div className={classes['create-post-author']}>
        <img
          src={props.author.profile_pic}
          alt={props.author.username}
          ref={avatarRef}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        />
        <div className={classes['hoverCard']}>{isHovering && <HeaderProfil user={props.author} />}</div>
      </div>
      <div className={classes['create-post-content']}>
        <div className={classes['create-post-content-header']}>Header / Choix du groupe</div>
        <Modal
          title={'Créer un nouveau post'}
          children={
            <>
              <Input
                type="text"
                large={true}
                placeholder="Ajouter une machine à café dans la salle FT123"
                isValid={true}
                onChange={e => setPostName(e.target.value)}
                label="Titre de la proposition"
              />

              <Select
                large={true}
                isValid={true}
                label="Groupe"
                data={[
                  { key: 1, value: 'test' },
                  { key: 2, value: 'test2' },
                  { key: 3, value: 'test3' }
                ]}
                onChange={val => setPostGroup(val)}
              />

              <Input
                type="text"
                large={true}
                placeholder="Laisser vide pour ne pas mettre d'image"
                label="URL de l'image"
                onChange={e => setPostImg(e.target.value)}
              />

              <Input
                //type="datetime-local"
                type="date"
                large={true}
                label="Date de fin des votes"
                onChange={e => setPostVoteEndDate(e.target.value)}
              />

              <TextArea
                rocket={false}
                dark={false}
                placeholder="Je propose l'installation d'une machine à café afin de ..."
                label={'Description détaillé'}
                onChange={val => setPostContent(val)}
              />

              <Button
                text="Créer le post"
                handleClick={() => {
                  fetch('http://localhost:3000/post', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      title: postName,
                      group: postGroup,
                      img: postImg,
                      dateEnd: postVoteEndDate,
                      content: postContent,
                      description: postContent,
                      authorId: props.author?.id?.toString() || '1'
                    })
                  });
                }}
              />
            </>
          }
          trigger={<Icon notClickable={true} icon="fi fi-rr-calendar-lines-pen" font_size="3rem" />}
        />
      </div>
    </div>
  );
}
