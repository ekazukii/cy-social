const { createMockPost } = require('../utils/mockData');
const _posts = [createMockPost(1), createMockPost(2), createMockPost(3), createMockPost(4), createMockPost(5)];

/**
 * create a notification in db
 * @param {Number} userId
 */
const getPost = (user, group) => {
  let posts = _posts;
  if (!isNaN(user)) {
    posts = posts.filter(post => post.authorId === user);
  }
  if (typeof group !== 'undefined') {
    posts = posts.filter(post => post.group === group);
  }
  return posts;
};

const updatePost = (id, title, content, description, img, dateEnd) => {
  const post = _posts.find(post => post.id === id);

  if (title) post.title = title;
  if (content) post.content = content;
  if (description) post.description = description;
  if (img) post.img = img;
  if (dateEnd) post.dateEnd = dateEnd;

  return post;
};

/**
 * create new post
 * @param {number} authorId
 * @param {String} title
 * @param {String} content
 * @param {String} description
 * @param {String} group
 * @param {String} img
 * @param {String} dateEnd iso string
 */
const createPost = (authorId, title, content, description, group, img, dateEnd) => {
  const post = {
    id: _posts[_posts.length - 1].id + 1,
    authorId: authorId,
    title,
    content,
    description,
    group,
    img,
    datePublished: new Date().toISOString(),
    dateEnd,
    nbrVue: 0,
    comments: []
  };

  _posts.push(post);

  return post;
};

const deletePost = id => {
  _posts = _posts.filter(post => post.id !== id);
};

const addView = id => {
  const post = _posts.find(post => post.id === id);
  post.nbrVue++;
};

module.exports = { createPost, updatePost, getPost, deletePost, addView };
