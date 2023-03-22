const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;

const postRoutes = require('./routes/post');
const notifRoutes = require('./routes/notif');

const { getPost } = require('./models/post');
const { getComment } = require('./models/comment');
const { getLike } = require('./models/like');
const { getVote } = require('./models/vote');
const { createUserData, createPostData } = require('./script/populate_db');

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/post', postRoutes);
app.use('/notif', notifRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// setTimeout(async () => {
//   console.log(await getVote(1));

// }, 1000);

/**
 *return {
    id
    authorId
    title
    content
    description
    group
    img
    datePublished
    dateEnd
    nbrVue:
  };


  ## recup les groupes
  {
    UsersGroup -> pivot Group
    [
      { id, name, isPrivate, img, description, nbrMember, nbrPosts },
      { id, name, isPrivate, img, description, nbrMember, nbrPosts },
      { id, name, isPrivate, img, description, nbrMember, nbrPosts },
      { id, name, isPrivate, img, description, nbrMember, nbrPosts },
      { id, name, isPrivate, img, description, nbrMember, nbrPosts },
    ]
  }

  ##

  SELECT * POSTS WHERE group_id IS IN (SELECT id FROM UsersGroup WHERE user_id = 34) ORDER BY DATE Desc LIMIT 20
  SELECT * FROM Posts WHERE id_group IN (SELECT id_group FROM UsersGroups WHERE id_user = 1)

  [{
    id
    authorId
    title
    content
    description
    group
    img #nullable
    datePublished
    dateEnd
    nbrVue
    comments: [
      id,
      authorId
      date
      response #nullable
      content
      nbrVue
    ],
    likes: [{
      id_user
    }],
    votes: [{
      user_id
      vote: -1 | 0 | 1
    }]
  }]


  ## get notifs
 [{
    id,
    id_receiver
    id_sender
    content
    link
    type #nullable
    time
    read
 }]


 */
