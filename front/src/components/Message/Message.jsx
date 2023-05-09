import classes from './Message.module.css';
import React, { useRef, useEffect } from 'react';

export default function Message({ content, isSender, author }) {
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current.scrollIntoView();
  }, []);

  return (
    <p ref={messageRef} className={`${classes['message']} ${isSender && classes['left']}`}>
      {content}
    </p>
  );
}
