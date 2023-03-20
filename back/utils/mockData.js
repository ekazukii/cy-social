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
    nbrVue: 8371,
    comments: [
      {
        id: id * 2,
        authorId: rand(1, 2),
        response: null,
        date: DateTime.now()
          .minus({ hours: rand(2, 4) })
          .toISO(),
        content: 'Comment 1',
        nbrVue: 1529
      },
      {
        id: (id + 1) * 2,
        authorId: rand(1, 2),
        response: null,
        date: DateTime.now()
          .minus({ hours: rand(0, 2) })
          .toISO(),
        content: 'Comment 2',
        nbrVue: 1589
      }
    ]
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

module.exports = {
  createMockPost,
  createMockNotif
};
