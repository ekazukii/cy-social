require('../../index');
const fetch = require('node-fetch');

describe('Notifs endpoints', () => {
  beforeAll(done => {
    setTimeout(() => done(), 2000);
  });
  it('Should get all notifs', async () => {
    const res = await fetch('http://localhost:300/notif');
    const json = await res.json();

    expect(res.length).toBe(3);
  });
});
