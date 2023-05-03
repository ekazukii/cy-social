import TextArea from '../TextArea/TextArea';
import { useState } from 'react';
import { getBaseUrl } from '../../utils/config';
import { useSession } from '../../hooks/useSession';

export default function WriteComment({ idPost }) {
  const [message, setMessage] = useState('');
  const { user } = useSession();

  const sendComment = async () => {
    await fetch(`${getBaseUrl()}/post/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idPost: idPost,
        content: message,
        idUser: user.id,
        response: null
      })
    });

    window.location.reload();
  };

  return (
    <TextArea
      placeholder="Ecrire un commentaire"
      onChange={setMessage}
      resize={false}
      style={{ marginBottom: 0 }}
      rows={4}
      darkMode={false}
      onSubmit={() => sendComment()}
    />
  );
}
