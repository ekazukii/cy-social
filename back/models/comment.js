const { createMockComment } = require('../utils/mockData');
const comments = [createMockComment(1), createMockComment(2), createMockComment(3)];

const createComment = (idPost, idUser, date, response) => {
  const id = comments.length + 1;
  const comment = { id, idPost, idUser, date, response };
  comments.push(comment);
  return comment;
};

const getComment = idPost => {
  return comments.filter(comment => comment.idPost === idPost);
};

const updateComment = (id, idPost, idUser, date, response) => {
  const comment = comments.find(comment => comment.id === id);
  if (!comment) return null;
  if (idPost) comment.idPost = idPost;
  if (idUser) comment.idUser = idUser;
  if (date) comment.date = date;
  if (response) comment.response = response;

  return comment;
};

const deleteComment = id => {
  comments = comments.filter(comment => comment.id !== id);
};

module.exports = { createComment, getComment, updateComment, deleteComment };
