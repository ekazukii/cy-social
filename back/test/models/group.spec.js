const { createGroup, deleteGroup, updateGroup, getGroup } = require('../../models/group');

describe('Test group model', () => {
  beforeAll(async () => {
    return new Promise((r, _) => {
      setTimeout(() => r(), 1000);
    });
  });

  let groupsLen;
  let groupId;

  it('Should get all posts', async () => {
    const res = await getGroup();
    expect(res.length).toBeGreaterThan(0);
    groupsLen = res.length;
  });

  it('Should create a group', async () => {
    const newG = await createGroup('##Temp GROUP', false, 'image', '##Temp group used during integration testing');

    groupId = newG.insertId;

    const res = await getGroup();
    expect(res.length).toBe(groupsLen + 1);
  });

  it('Should get a specific group', async () => {
    const res = await getGroup(groupId);
    expect(res.length).toBe(1);
    expect(res[0].name).toEqual('##Temp GROUP');
  });

  it('Should update a group', async () => {
    await updateGroup(
      groupId,
      '##Temp GROUP UP',
      false,
      'IMAGE UP',
      '##Temp group used during integration testing',
      null
    );
    const res = await getGroup(groupId);
    expect(res.length).toBe(1);
    expect(res[0].name).toEqual('##Temp GROUP UP');
  });

  it('Should delete a group', async () => {
    await deleteGroup(groupId);
    const res = await getGroup(groupId);
    expect(res.length).toBe(0);
  });
});
