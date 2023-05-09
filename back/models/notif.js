const { getUsersInGroup, getUser } = require('./user');
const { getPost } = require('./post');
const { asyncQuery } = require('./database');
const mysql = require('mysql2');

const getNotif = userId => {
  const sql = mysql.format(
    'SELECT *, n.id as id_notif FROM Notifications n INNER JOIN Users u ON(id_user = ? AND u.id = n.id_author)',
    [userId]
  );
  return asyncQuery(sql);
};

const updateNotif = (id, read) => {
  // will see later
};

const createNotif = (idUser, link, title, type, authorId) => {
  const creation = new Date();
  const sql = mysql.format(
    'INSERT INTO Notifications (id_user, link, title, type, id_author, creation) VALUES(?, ?, ?, ?, ?, ?)',
    [idUser, link, title, type, authorId, creation]
  );

  return asyncQuery(sql);
};

const deleteNotif = id => {
  const sql = mysql.format('DELETE FROM Notifications WHERE id = ?', [id]);
  return asyncQuery(sql);
};

const generatePostNotifs = async (postId, authorId, groupId, title) => {
  const users = await getUsersInGroup(groupId);
  users.forEach(user => {
    createNotif(user.id, `/post/${postId}`, title, 1, authorId);
  });
};

// send notifcation to post author
const generateCommentNotifs = async (postId, authorId, message) => {
  const post = (await getPost(undefined, undefined, postId))[0];
  createNotif(post.id_user, `/post/${postId}`, 'a posté un commentaire : ' + message, 2, authorId);
};

const generateFollowerNotifs = async (userId, followerId) => {
  createNotif(userId, `/user/${followerId}`, `a commencé à vous suivre`, 3, followerId);
};

const generateLikeNotifs = async (userId, postId) => {
  const post = (await getPost(undefined, undefined, postId))[0];
  createNotif(post.id_user, `/post/${postId}`, `a aimé votre post : ${post.title}`, 4, userId);
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
