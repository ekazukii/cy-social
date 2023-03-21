const { createMockGroup } = require('../utils/mockData');
const groups = [createMockGroup(1), createMockGroup(2), createMockGroup(3)];

const createGroup = (name, isPrivate, img, description) => {
  const group = {
    id: groups.length + 1,
    name,
    isPrivate,
    dateCrea: new Date(),
    img,
    description,
    postPinId: null
  };

  groups.push(group);
  return group;
};

const deleteGroup = id => {
  groups = groups.filter(group => group.id !== id);
};

const updateGroup = (id, name, isPrivate, img, description, postPinId) => {
  const group = groups.find(group => group.id === id);
  if (name) group.name = name;
  if (isPrivate) group.isPrivate = isPrivate;
  if (img) group.img = img;
  if (description) group.description = description;
  if (postPinId) group.postPinId = postPinId;

  return group;
};

const getGroup = () => {
  return groups;
};

module.exports(createGroup, deleteGroup, updateGroup, getGroup);
