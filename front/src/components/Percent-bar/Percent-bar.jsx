import classes from './percent-bar.module.css';
import React, { useState, useEffect } from 'react';
import { getBaseUrl } from '../../utils/config';

export default function PercentBar(props) {
  const { id_poste } = props;

  const [yesNumber, setYesNumber] = useState(props.yesNumber);
  const [noNumber, setNoNumber] = useState(props.noNumber);
  const [otherNumber, setOtherNumber] = useState(props.otherNumber);

  const [yesPercent, setYesPercent] = useState(0);
  const [noPercent, setNoPercent] = useState(0);
  const [otherPercent, setOtherPercent] = useState(0);

  useEffect(() => {
    const total = yesNumber + noNumber + otherNumber;
    const yesPct = (yesNumber / total) * 100;
    const noPct = (noNumber / total) * 100;
    const otherPct = (otherNumber / total) * 100;

    setYesPercent(yesPct);
    setNoPercent(noPct);
    setOtherPercent(otherPct);
  }, [yesNumber, noNumber, otherNumber]);

  const [dataAuth, setDataAuth] = useState(null);
  const [connectedUserVote, setConnectedUserVote] = useState(null);

  const voteCounters = {
    1: { setter: setYesNumber, count: yesNumber },
    0: { setter: setOtherNumber, count: otherNumber },
    '-1': { setter: setNoNumber, count: noNumber }
  };

  const handleVote = voteValue => {
    const sameVote = connectedUserVote && connectedUserVote.toString() === voteValue.toString();
    const method = sameVote ? 'DELETE' : 'POST';
    const endpoint = sameVote
      ? `${getBaseUrl()}/post/vote?id=${id_poste}&user=${dataAuth.user.id}`
      : `${getBaseUrl()}/post/vote`;

    fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: sameVote
        ? null
        : JSON.stringify({
            id: id_poste.toString(),
            user: dataAuth.user.id.toString(),
            vote: voteValue
          })
    });

    if (!sameVote && connectedUserVote) {
      const prevCounter = voteCounters[connectedUserVote.toString()];
      prevCounter.setter(prevCounter.count - 1);
    }

    setConnectedUserVote(sameVote ? null : voteValue);

    const currentCounter = voteCounters[voteValue];
    currentCounter.setter(sameVote ? currentCounter.count - 1 : currentCounter.count + 1);
  };

  const handleClick = vote => {
    handleVote(vote);
  };

  useEffect(() => {
    fetch(`${getBaseUrl()}/auth/whoami`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(dataAuth => setDataAuth(dataAuth))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (dataAuth && dataAuth.user && dataAuth.user.id) {
      fetch(`${getBaseUrl()}/post/vote?id=${id_poste}&user=${dataAuth.user.id}`)
        .then(response => response.json())
        .then(getVote => {
          if (getVote && getVote.length !== 0) {
            setConnectedUserVote(getVote[0].vote.toString());
          }
        })
        .catch(error => console.error(error));
    }
  }, [dataAuth, dataAuth?.user?.id]);

  return (
    <div className={classes['percent-bar']}>
      <div
        className={`${classes['percent-bar-inner']} ${classes['percent-bar-yes']} ${
          connectedUserVote === '1' ? classes['current-vote-yes'] : ''
        }`}
        style={{ width: `${yesPercent}%`, minWidth: '4rem' }}
        onClick={() => {
          handleClick('1');
        }}
      >
        {yesNumber}
      </div>
      <div
        className={`${classes['percent-bar-inner']} ${classes['percent-bar-other']} ${
          connectedUserVote === '0' ? classes['current-vote-other'] : ''
        }`}
        style={{ width: `${otherPercent}%`, minWidth: '4rem' }}
        onClick={() => handleClick('0')}
      >
        {otherNumber}
      </div>
      <div
        className={`${classes['percent-bar-inner']} ${classes['percent-bar-no']} ${
          connectedUserVote === '-1' ? classes['current-vote-no'] : ''
        }`}
        style={{ width: `${noPercent}%`, minWidth: '4rem' }}
        onClick={() => handleClick('-1')}
      >
        {noNumber}
      </div>
    </div>
  );
}
