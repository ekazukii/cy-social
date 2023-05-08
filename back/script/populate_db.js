const { asyncQuery } = require('../models/database');
const mysql = require('mysql2');

const { faker } = require('@faker-js/faker');

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const NBR_USERS = 20;
// const NBR_POSTS = 60;
// const NBR_COMMENTS = 180;
// const NBR_LIKES = 300;
// const NBR_VOTES = 500;
// const NBR_GROUPS = 10;

// const createUserData = () => {
//   return {
//     username: faker.internet.userName(),
//     name: faker.name.firstName(),
//     main: faker.internet.email(),
//     phone: faker.phone.number('0# ## ## ## ##'),
//     adresse: faker.address.streetAddress() + ' ' + faker.address.cityName(),
//     date_bday: faker.date.past(),
//     role: faker.helpers.arrayElement([0, 1, 2]),
//     profile: faker.internet.avatar()
//   };
// };

// const createPostData = () => {
//   return {
//     title: faker.lorem.sentence(),
//     groupId: rand(1, NBR_GROUPS),
//     userId: rand(1, NBR_USERS),
//     content: faker.lorem.paragraph(),
//     description: faker.lorem.sentence(20),
//     img: faker.image.imageUrl(),
//     dateEnd: faker.date.future(),
//     dateCreation: faker.date.past(),
//     views: rand(140, 283102),
//     display: true
//   };
// };

// const createGroupData = () => {
//   return {
//     name: faker.lorem.sentence(4),
//     isPrivate: faker.helpers.arrayElement([0, 1]),
//     dateCrea: faker.date.past(),
//     img: faker.image.imageUrl(),
//     description: faker.lorem.sentence(4)
//   };
// };

// const createCommentData = () => {
//   return {
//     postId: rand(1, NBR_POSTS),
//     userId: rand(1, NBR_USERS),
//     commentId: null,
//     date: faker.date.recent(60),
//     content: faker.lorem.paragraph(3),
//     viewCount: rand(100, 48392)
//   };
// };

// const createLikeData = () => {
//   const tuple = faker.helpers.unique(() => [rand(1, NBR_USERS), rand(1, NBR_POSTS)]);
//   return {
//     userId: tuple[0],
//     postId: tuple[1],
//     emojis: 0
//   };
// };

// const createVoteData = () => {
//   const tuple = faker.helpers.unique(() => [rand(1, NBR_USERS), rand(1, NBR_POSTS)]);
//   return {
//     userId: tuple[0],
//     postId: tuple[1],
//     vote: rand(1, 3) - 2
//   };
// };

// const populateUserInfo = async () => {
//   for (let i = 0; i < NBR_USERS; i++) {
//     const uData = createUserData();

//     const sql = mysql.format(
//       'INSERT INTO `Users` (`username`, `name`, `mail`, `tel`, `adresse`, `date_bday`, `role`, `profile_pic`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
//       [uData.username, uData.name, uData.main, uData.phone, uData.adresse, uData.date_bday, uData.role, uData.profile]
//     );
//     const res = await asyncQuery(sql);
//     console.log(res);
//   }
// };

// const populateGroupInfo = async () => {
//   for (let i = 0; i < NBR_GROUPS; i++) {
//     const gData = createGroupData();

//     const sql = mysql.format(
//       'INSERT INTO `Groups` (`name`, `is_private`, `date_crea`, `img`, `description`) VALUES(?, ?, ?, ?, ?)',
//       [gData.name, gData.isPrivate, gData.dateCrea, gData.img, gData.description]
//     );

//     const res = await asyncQuery(sql);
//     console.log(res);
//   }
// };

// const populatePostInfo = async () => {
//   for (let i = 0; i < NBR_POSTS; i++) {
//     const pInfo = createPostData();

//     const sql = mysql.format(
//       'INSERT INTO `Posts` (`id_user`, `id_group`, `content`, `title`, `img`, `display`, `date_fin`, `date_publi`, `view_count`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
//       [
//         pInfo.userId,
//         pInfo.groupId,
//         pInfo.content,
//         pInfo.title,
//         pInfo.img,
//         pInfo.display,
//         pInfo.dateEnd,
//         pInfo.dateCreation,
//         pInfo.views
//       ]
//     );

//     const res = await asyncQuery(sql);
//     console.log(res);
//   }
// };

// const populateCommentInfo = async () => {
//   for (let i = 0; i < NBR_COMMENTS; i++) {
//     const cInfo = createCommentData();

//     const sql = mysql.format(
//       'INSERT INTO `Comments` (`id_post`, `id_user`, `id_comment`, `date`, `content`, `view_count`) VALUES(?, ?, ?, ?, ?, ?)',
//       [cInfo.postId, cInfo.userId, cInfo.commentId, cInfo.date, cInfo.content, cInfo.viewCount]
//     );

//     const res = await asyncQuery(sql);
//     console.log(res);
//   }
// };

// const populateLikeInfo = async () => {
//   for (let i = 0; i < NBR_LIKES; i++) {
//     const lInfo = createLikeData();

//     const sql = mysql.format('INSERT INTO `Likes` (`id_post`, `id_user`, `emojis`) VALUES(?, ?, ?)', [
//       lInfo.postId,
//       lInfo.userId,
//       lInfo.emojis
//     ]);

//     const res = await asyncQuery(sql);
//     console.log(res);
//   }
// };

// const populateVoteData = async () => {
//   for (let i = 0; i < NBR_VOTES; i++) {
//     const lInfo = createVoteData();

//     const sql = mysql.format('INSERT INTO `Votes` (`id_post`, `id_user`, `vote`) VALUES(?, ?, ?)', [
//       lInfo.postId,
//       lInfo.userId,
//       lInfo.vote
//     ]);

//     const res = await asyncQuery(sql);
//     console.log(res);
//   }
// };

// const populateAll = async () => {
//   await populateUserInfo();
//   await populateGroupInfo();
//   await populatePostInfo();
//   await populateCommentInfo();
//   await populateVoteData();
//   await populateLikeInfo();
// };

// setTimeout(() => {
//   populateAll();
// }, 1000);

// const NBR_USERS = 20;
// const NBR_POSTS = 60;
// const NBR_COMMENTS = 180;
// const NBR_LIKES = 300;
// const NBR_VOTES = 500;
// const NBR_GROUPS = 10;

const NBR_CONVERSATION_USER = 100;
const NBR_CONVERSATION = 50;
const NBR_CONVERSATION_MSG = 200;

const createConversationsuserData = () => {
  return {
    id_user: rand(1, NBR_USERS),
    id_conv: rand(1, NBR_CONVERSATION),
    // commentId: null,
    join_date: faker.date.recent(60),
    // leave_date: new Date(join_date.getTime() + (Math.floor(Math.random() * 800) + 1) * 24 * 60 * 60 * 1000),
    join_date: faker.date.recent(60)
    // content: faker.lorem.paragraph(3),
    // viewCount: rand(100, 48392)
  };
};

const populateConversationsuser = async () => {
  for (let i = 0; i < NBR_CONVERSATION_USER; i++) {
    const lInfo = createConversationsuserData();

    const sql = mysql.format(
      'INSERT INTO `ConversationsUser` (`id_user`, `id_conv`, `join_date`, `leave_date`) VALUES(?, ?, ?, ?)',
      [lInfo.id_user, lInfo.id_conv, lInfo.join_date, lInfo.leave_date]
    );

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const createConversationsData = () => {
  return {
    // id: rand(1, NBR_CONVERSATION),
    // id_conv: rand(1, NBR_USERS),
    // commentId: null,
    title: faker.lorem.sentence(),
    date_crea: faker.date.recent(60)
    // leave_date: new Date(join_date.getTime() + (Math.floor(Math.random() * 800) + 1) * 24 * 60 * 60 * 1000);,
    // content: faker.lorem.paragraph(3),
    // viewCount: rand(100, 48392)
  };
};

const populateConversations = async () => {
  for (let i = 0; i < NBR_CONVERSATION; i++) {
    const lInfo = createConversationsData();

    const sql = mysql.format('INSERT INTO `Conversations` (`title`, `date_crea`) VALUES(?, ?)', [
      // lInfo.id,
      lInfo.title,
      lInfo.date_crea
    ]);

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const createConversationsmessagesData = () => {
  return {
    // id: rand(1, NBR_CONVERSATION_MSG),
    id_conv: rand(1, NBR_CONVERSATION),
    id_user: rand(1, NBR_CONVERSATION_USER),
    // commentId: null,
    content: faker.lorem.paragraph(1),
    date: faker.date.recent(60),
    is_deleted: faker.helpers.arrayElement([0, 1])
    // leave_date: new Date(join_date.getTime() + (Math.floor(Math.random() * 800) + 1) * 24 * 60 * 60 * 1000),
    // content: faker.lorem.paragraph(3),
    // viewCount: rand(100, 48392)
  };
};

const populateConversationsmessages = async () => {
  for (let i = 0; i < NBR_CONVERSATION_MSG; i++) {
    const lInfo = createConversationsmessagesData();

    const sql = mysql.format(
      'INSERT INTO `ConversationsMessages` (`id_conv`, `id_user`, `content`, `date`, `is_deleted`) VALUES(?, ?, ?, ?, ?)',
      [
        // lInfo.id,
        lInfo.id_conv,
        lInfo.id_user,
        lInfo.content,
        lInfo.date,
        lInfo.is_deleted
      ]
    );

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populateMessagesTables = async () => {
  await populateConversationsuser();
  await populateConversations();
  await populateConversationsmessages();
};

const avatars = [
  {
    sex: 'woman',
    faceColor: '#AC6651',
    earSize: 'big',
    eyeStyle: 'oval',
    noseStyle: 'long',
    mouthStyle: 'smile',
    shirtStyle: 'short',
    glassesStyle: 'none',
    hairColor: '#fff',
    hairStyle: 'womanLong',
    hatStyle: 'none',
    hatColor: '#000',
    eyeBrowStyle: 'upWoman',
    shirtColor: '#9287FF',
    bgColor: '#FFEDEF'
  },
  {
    sex: 'woman',
    faceColor: '#AC6651',
    earSize: 'big',
    eyeStyle: 'smile',
    noseStyle: 'round',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'none',
    hairColor: '#F48150',
    hairStyle: 'womanShort',
    hatStyle: 'none',
    hatColor: '#FC909F',
    eyeBrowStyle: 'upWoman',
    shirtColor: '#6BD9E9',
    bgColor: '#FFEDEF'
  },
  {
    sex: 'woman',
    faceColor: '#AC6651',
    earSize: 'big',
    eyeStyle: 'oval',
    noseStyle: 'long',
    mouthStyle: 'smile',
    shirtStyle: 'short',
    glassesStyle: 'none',
    hairColor: '#fff',
    hairStyle: 'womanLong',
    hatStyle: 'none',
    hatColor: '#FC909F',
    eyeBrowStyle: 'upWoman',
    shirtColor: '#77311D',
    bgColor: '#74D153'
  },
  {
    sex: 'man',
    faceColor: '#F9C9B6',
    earSize: 'small',
    eyeStyle: 'oval',
    noseStyle: 'long',
    mouthStyle: 'smile',
    shirtStyle: 'short',
    glassesStyle: 'none',
    hairColor: '#000',
    hairStyle: 'normal',
    hatStyle: 'none',
    hatColor: '#77311D',
    eyeBrowStyle: 'up',
    shirtColor: '#F4D150',
    bgColor: '#F48150'
  },
  {
    sex: 'woman',
    faceColor: '#AC6651',
    earSize: 'big',
    eyeStyle: 'smile',
    noseStyle: 'round',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'none',
    hairColor: '#F48150',
    hairStyle: 'womanShort',
    hatStyle: 'none',
    hatColor: '#F48150',
    eyeBrowStyle: 'upWoman',
    shirtColor: '#6BD9E9',
    bgColor: '#FFEDEF'
  },
  {
    sex: 'man',
    faceColor: '#F9C9B6',
    earSize: 'small',
    eyeStyle: 'smile',
    noseStyle: 'round',
    mouthStyle: 'peace',
    shirtStyle: 'polo',
    glassesStyle: 'none',
    hairColor: '#000',
    hairStyle: 'normal',
    hatStyle: 'none',
    hatColor: '#D2EFF3',
    eyeBrowStyle: 'up',
    shirtColor: '#6BD9E9',
    bgColor: '#FFEBA4'
  }
];

const populateAvatars = async () => {
  const sql = mysql.format('SELECT * FROM Users');
  const users = await asyncQuery(sql);

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const avatar = faker.helpers.arrayElement(avatars);
    const sql = mysql.format('UPDATE Users SET profile_pic = ? WHERE id = ?', [JSON.stringify(avatar), user.id]);
    await asyncQuery(sql);
  }
};

setTimeout(() => {
  populateAvatars();
}, 1000);

// module.exports = { createUserData, createPostData };
