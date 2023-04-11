const { createMockNotif } = require('../utils/mockData');

let _notifs = [createMockNotif(1), createMockNotif(2), createMockNotif(3)];

/**
 * create a notification in db
 * @param {Number} userId
 */
const getNotif = userId => {
  if (!userId) return _notifs;
  return _notifs.filter(notif => notif.target === userId);
};

const updateNotif = (id, read) => {
  const notif = _notifs.find(notif => notif.id === id);
  notif.read = read;
  return notif;
};

const createNotif = () => {};

const deleteNotif = id => {
  _notifs = _notifs.filter(notif => notif.id !== id);
};

module.exports = { createNotif, updateNotif, getNotif, deleteNotif };
