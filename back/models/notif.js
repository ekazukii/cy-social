const { getUsersInGroup, getUser } = require('./user');
const { getPost } = require('./post');
const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const getNotif = userId => {
  const sql = mysql.format('SELECT * FROM Notifications WHERE id_user = ?', [userId]);
  return asyncQuery(sql);
};

const updateNotif = (id, read) => {
  // will see later
};

const createNotif = (idUser, link, title, type) => {
  const sql = mysql.format('INSERT INTO Notifications (id_user, link, title, type) VALUES(?, ?, ?, ?)', [
    idUser,
    link,
    title,
    type
  ]);

  return asyncQuery(sql);
};

const deleteNotif = id => {
  const sql = mysql.format('DELETE FROM Notifications WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const generatePostNotifs = async (postId, authorId, groupId, title) => {
  const users = await getUsersInGroup(groupId);
  users.forEach(user => {
    createNotif(user.id, `/post/${postId}`, title, 1);
  });
};

// send notifcation to post author
const generateCommentNotifs = async (postId, authorId, message) => {
  const post = (await getPost(undefined, undefined, postId))[0];
  const user = (await getUser(authorId))[0];
  createNotif(post.id_user, `/post/${postId}`, user.username + ' à posté un commentaire : ' + message, 2);
};

const generateFollowerNotifs = async (userId, followerId) => {
  const follower = (await getUser(followerId))[0];
  createNotif(userId, `/user/${followerId}`, `${follower.name} a commencé à vous suivre`, 3);
};

const generateLikeNotifs = async (userId, postId) => {
  const post = (await getPost(undefined, undefined, postId))[0];
  const user = (await getUser(userId))[0];
  createNotif(post.id_user, `/post/${postId}`, `${user.name} a aimé votre post : ${post.title}`, 4);
};

module.exports = {
  createNotif,
  updateNotif,
  getNotif,
  deleteNotif,
  generatePostNotifs,
  generateCommentNotifs,
  generateFollowerNotifs,
  generateLikeNotifs
};
