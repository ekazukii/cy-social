const { createPost, updatePost, getPost, deletePost, addView, getPostWithCounts } = require('../../models/post');
describe('Test posts model', () => {
  beforeAll(async () => {
    return new Promise((r, _) => {
      setTimeout(() => r(), 1000);
    });
  });

  let userPosts;
  let postId;

  it('Should get all posts', async () => {
    const res = await getPost(1);
    expect(res.length).toBeGreaterThan(0);
    userPosts = res.length;
  });

  it('Should get all posts with comments, likes and votes count', async () => {
    const res = await getPostWithCounts(1);
    expect(res.length).toBeGreaterThan(0);
  });

  it('Should create a post', async () => {
    const newP = await createPost(
      1,
      '##Temporary test',
      '##Temp article used during integration testing',
      1,
      'image',
      new Date()
    );

    postId = newP.insertId;

    const res = await getPost(1);
    expect(res.length).toBe(userPosts + 1);
  });

  it('Should get a specific post', async () => {
    const res = await getPost(undefined, undefined, postId);
    expect(res.length).toBe(1);
    expect(res[0].title).toEqual('##Temporary test');
  });

  it('Should update a post', async () => {
    await updatePost(postId, '##Temporary Test UP', 'CONTENT UP', 'IMAGE UP', new Date());
    const res = await getPost(undefined, undefined, postId);
    expect(res.length).toBe(1);
    expect(res[0].title).toEqual('##Temporary Test UP');
  });

  it('Should add a view to post', async () => {
    await addView(postId);
    const res = await getPost(undefined, undefined, postId);
    expect(res[0].view_count).toBe(1);
  });

  it('Should delete a post', async () => {
    await deletePost(postId);
    const res = await getPost(undefined, undefined, postId);
    expect(res.length).toBe(0);
  });
});
