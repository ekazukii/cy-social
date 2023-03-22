const { getUser, createUser, updateUser, deleteUser, getUsers } = require('../../models/user');

describe('Test user model', () => {
  beforeAll(async () => {
    return new Promise((r, _) => {
      setTimeout(() => r(), 1000);
    });
  });

  let usersLen;
  let userId;

  it('Should get all posts', async () => {
    const res = await getUser();
    expect(res.length).toBeGreaterThan(0);
    usersLen = res.length;
  });

  it('Should create an user', async () => {
    const newU = await createUser(
      'testusername',
      'testname',
      'test@cytech.fr',
      '0781818181',
      '7 rue du test',
      new Date(),
      0
    );

    userId = newU.insertId;

    const res = await getUser();
    expect(res.length).toBe(usersLen + 1);
  });

  it('Should get a specific user', async () => {
    const res = await getUser(userId);
    expect(res.length).toBe(1);
    expect(res[0].name).toEqual('testname');
  });

  it('Should get array of users', async () => {
    const res = await getUsers([userId]);
    expect(res.length).toBe(1);
    expect(res[0].name).toEqual('testname');
  });

  it('Should update an user', async () => {
    await updateUser(userId, 'newnametest', '8 rue du test', new Date(), 1);
    const res = await getUser(userId);
    expect(res.length).toBe(1);
    expect(res[0].name).toEqual('newnametest');
  });

  it('Should delete an user', async () => {
    await deleteUser(userId);
    const res = await getUser(userId);
    expect(res.length).toBe(0);
  });
});
