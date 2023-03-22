const { asyncQuery } = require('../models/database');
const mysql = require('mysql2');

const { faker } = require('@faker-js/faker');

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const NBR_USERS = 20;
const NBR_POSTS = 60;
const NBR_COMMENTS = 180;
const NBR_LIKES = 300;
const NBR_VOTES = 500;
const NBR_GROUPS = 10;

const createUserData = () => {
  return {
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    main: faker.internet.email(),
    phone: faker.phone.number('0# ## ## ## ##'),
    adresse: faker.address.streetAddress() + ' ' + faker.address.cityName(),
    date_bday: faker.date.past(),
    role: faker.helpers.arrayElement([0, 1, 2]),
    profile: faker.internet.avatar()
  };
};

const createPostData = () => {
  return {
    title: faker.lorem.sentence(),
    groupId: rand(1, NBR_GROUPS),
    userId: rand(1, NBR_USERS),
    content: faker.lorem.paragraph(),
    description: faker.lorem.sentence(20),
    img: faker.image.imageUrl(),
    dateEnd: faker.date.future(),
    dateCreation: faker.date.past(),
    views: rand(140, 283102),
    display: true
  };
};

const createGroupData = () => {
  return {
    name: faker.lorem.sentence(4),
    isPrivate: faker.helpers.arrayElement([0, 1]),
    dateCrea: faker.date.past(),
    img: faker.image.imageUrl(),
    description: faker.lorem.sentence(4)
  };
};

const createCommentData = () => {
  return {
    postId: rand(1, NBR_POSTS),
    userId: rand(1, NBR_USERS),
    commentId: null,
    date: faker.date.recent(60),
    content: faker.lorem.paragraph(3),
    viewCount: rand(100, 48392)
  };
};

const createLikeData = () => {
  const tuple = faker.helpers.unique(() => [rand(1, NBR_USERS), rand(1, NBR_POSTS)]);
  return {
    userId: tuple[0],
    postId: tuple[1],
    emojis: 0
  };
};

const createVoteData = () => {
  const tuple = faker.helpers.unique(() => [rand(1, NBR_USERS), rand(1, NBR_POSTS)]);
  return {
    userId: tuple[0],
    postId: tuple[1],
    vote: rand(1, 3) - 2
  };
};

const populateUserInfo = async () => {
  for (let i = 0; i < NBR_USERS; i++) {
    const uData = createUserData();

    const sql = mysql.format(
      'INSERT INTO `Users` (`username`, `name`, `mail`, `tel`, `adresse`, `date_bday`, `role`, `profile_pic`) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
      [uData.username, uData.name, uData.main, uData.phone, uData.adresse, uData.date_bday, uData.role, uData.profile]
    );
    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populateGroupInfo = async () => {
  for (let i = 0; i < NBR_GROUPS; i++) {
    const gData = createGroupData();

    const sql = mysql.format(
      'INSERT INTO `Groups` (`name`, `is_private`, `date_crea`, `img`, `description`) VALUES(?, ?, ?, ?, ?)',
      [gData.name, gData.isPrivate, gData.dateCrea, gData.img, gData.description]
    );

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populatePostInfo = async () => {
  for (let i = 0; i < NBR_POSTS; i++) {
    const pInfo = createPostData();

    const sql = mysql.format(
      'INSERT INTO `Posts` (`id_user`, `id_group`, `content`, `title`, `img`, `display`, `date_fin`, `date_publi`, `view_count`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        pInfo.userId,
        pInfo.groupId,
        pInfo.content,
        pInfo.title,
        pInfo.img,
        pInfo.display,
        pInfo.dateEnd,
        pInfo.dateCreation,
        pInfo.views
      ]
    );

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populateCommentInfo = async () => {
  for (let i = 0; i < NBR_COMMENTS; i++) {
    const cInfo = createCommentData();

    const sql = mysql.format(
      'INSERT INTO `Comments` (`id_post`, `id_user`, `id_comment`, `date`, `content`, `view_count`) VALUES(?, ?, ?, ?, ?, ?)',
      [cInfo.postId, cInfo.userId, cInfo.commentId, cInfo.date, cInfo.content, cInfo.viewCount]
    );

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populateLikeInfo = async () => {
  for (let i = 0; i < NBR_LIKES; i++) {
    const lInfo = createLikeData();

    const sql = mysql.format('INSERT INTO `Likes` (`id_post`, `id_user`, `emojis`) VALUES(?, ?, ?)', [
      lInfo.postId,
      lInfo.userId,
      lInfo.emojis
    ]);

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populateVoteData = async () => {
  for (let i = 0; i < NBR_VOTES; i++) {
    const lInfo = createVoteData();

    const sql = mysql.format('INSERT INTO `Votes` (`id_post`, `id_user`, `vote`) VALUES(?, ?, ?)', [
      lInfo.postId,
      lInfo.userId,
      lInfo.vote
    ]);

    const res = await asyncQuery(sql);
    console.log(res);
  }
};

const populateAll = async () => {
  await populateUserInfo();
  await populateGroupInfo();
  await populatePostInfo();
  await populateCommentInfo();
  await populateVoteData();
  await populateLikeInfo();
};

// setTimeout(() => {
//   populateAll();
// }, 1000);

module.exports = { createUserData, createPostData };
