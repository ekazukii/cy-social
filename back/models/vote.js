const { createMockVote } = require('../utils/mockData');
const _votes = [
  createMockVote(1, 1),
  createMockVote(2, 1),
  createMockVote(3, 2),
  createMockVote(4, 2),
  createMockVote(5, 2)
];

/**
 * create a notification in db
 * @param {Number} userId
 */
const getVote = (postId, userId) => {
  let votes = _votes.filter(vote => vote.idPost === postId);
  if (userId) votes = votes.filter(vote);
  return votes;
};

const updateVote = (id, vote) => {
  const voteObj = _votes.find(vote => vote.id === id);
  vote.vote = voteObj;
  return voteObj;
};

const createVote = (postId, userId, vote) => {
  const voteObj = {
    id: _votes[_votes.length - 1].id + 1,
    postId,
    userId,
    vote
  };
  _votes.push(voteObj);
  return voteObj;
};

const deleteVote = id => {
  _votes = _votes.filter(vote => vote.id !== id);
};

module.exports = { createVote, updateVote, deleteVote, getVote };
