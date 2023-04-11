const { DateTime } = require('luxon');

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randUsingSeed = (min, max, seed) => {
  return;
};

const createMockPost = id => {
  return {
    id: id,
    authorId: rand(1, 2),
    title: `Post ${id}`,
    content: `Content ${id} bla blablabla bla bla bla bla bla blablabla bla blablabla bla bla bla bla bla blablabla bla bla bla bla bla blablabla bla bla bla bla bla blablabla bla bla bla blabla blablabla bla bla bla bla bla bla bla bla bla blablabla bla bla bla bla bla blablabla bla bla bla bla `,
    description: `Description ${id} lorem ipsum dolor sit amen`,
    group: `group${rand(1, 2)}`,
    img: 'https://picsum.photos/600/200',
    datePublished: DateTime.now().minus({ days: 1 }).toISO(),
    dateEnd: DateTime.now().plus({ days: 1 }).toISO(),
    nbrVue: 8371
  };
};

// {
//   target: String,
//   source: String,
//   content: String,
//   link: String,
//   type: String,
//   time: Date
// }

const createMockNotif = id => {
  return {
    id: id,
    target: 1,
    source: rand(2, 3),
    content: "Bonjour c'est une notification de test",
    link: 'https://google.fr',
    type: 'TEST',
    time: DateTime.now().minus({ day: 1 }).toISO(),
    read: true
  };
};

const createMockMessage = id => {
  return {
    id: id,
    target: 1,
    source: rand(2, 3)
  };
};

const createMockVote = (id, idPost) => {
  return {
    id,
    idPost,
    userVote: rand(1, 2),
    vote: rand(1, 3) - 2
  };
};

const createMockLike = id => {
  return {
    id: id,
    idPost: rand(1, 3),
    emojis: 'like'
  };
};

const createMockGroup = id => {
  return {
    id,
    name: 'Groupe 1',
    isPrivate: rand(1, 2) === 1,
    dateCrea: DateTime.now()
      .minus({ hours: rand(2, 4) })
      .toISO(),
    img: 'https://picsum.photos/600/200',
    description: 'Group 1 desc',
    postPinId: null
  };
};

const createMockComment = (id, postId) => {
  return {
    id,
    postId,
    authorId: rand(1, 2),
    date: DateTime.now().minus({ hours: 6 }).toISO(),
    response: null,
    content: "Bonjour c'est un commentaire de test",
    nbrVue: 1589
  };
};

module.exports = {
  createMockPost,
  createMockNotif,
  createMockMessage,
  createMockVote,
  createMockLike,
  createMockGroup,
  createMockComment
};
