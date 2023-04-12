var express = require('express');
var router = express.Router();
// USING EXPRESS SESSION PACKKAGE

router.post('/login', (req, res) => {
  const { email, username, phone, password } = req.body;

  console.log(req.body);

  if (password == 'test') {
    req.session.user = { username, email, phone, id: 1 };
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
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
