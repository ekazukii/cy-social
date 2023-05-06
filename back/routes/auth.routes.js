var express = require('express');
const crypto = require('crypto');
var router = express.Router();
// USING EXPRESS SESSION PACKKAGE
const { getUserByUsername } = require('../models/user');

router.post('/login', async (req, res) => {
  const { email, username, phone, password } = req.body;
  if (!username) return res.send({ success: false });

  const user = await getUserByUsername(username);
  if (!user) return res.send({ success: false });

  const hash = crypto.createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');

  console.log(hashedPassword, user);
  if (hashedPassword !== user.passwd) return res.send({ success: false });

  req.session.user = { username, email, phone, id: user.id };
  res.send({ success: true });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.send({ success: true });
});

router.get('/whoami', (req, res) => {
  if (!req.session?.user?.id) return res.send({ user: null });

  if (req.query.onlyId) {
    return res.send({ user: { id: req.session.user?.id } });
  }

  res.send({ user: req.session.user });
});

module.exports = router;
