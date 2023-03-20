const express = require('express');
const app = express();
const port = 3000;

const postRoutes = require('./routes/post');
const notifRoutes = require('./routes/notif');

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
