const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  const locale = req.params.locale;

  const backTo = req.get('referer');

  res.cookie('sellorbuy-locale', locale);

  res.redirect(backTo);
});

module.exports = router;