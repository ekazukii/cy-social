import Input from '../Input/Input';
import TextArea from '../TextArea/TextArea';
import Button from '../Button/Button';
import React, { useState } from 'react';
import { getBaseUrl } from '../../utils/config';

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [groupImg, setGroupImg] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  return (
    <>
      <Input
        type="text"
        large={true}
        placeholder="Alternants CY-Tech"
        isValid={true}
        onChange={e => setGroupName(e.target.value)}
        label="Nom du groupe"
      />

      <Input
        type="text"
        large={true}
        placeholder="Laisser vide pour ne pas mettre d'image"
        label="URL de l'image"
        onChange={e => setGroupImg(e.target.value)}
      />

      <TextArea
        rocket={false}
        dark={false}
        placeholder="Groupe rassembleant les alternants de CY-Tech"
        label={'Description du groupe'}
        onChange={val => setGroupDescription(val)}
      />

      <Button
        text="Créer le group"
        handleClick={() => {
          fetch(`${getBaseUrl()}/group`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: groupName,
              img: groupImg,
              description: groupDescription
            })
          });
        }}
      />
    </>
  );
}
