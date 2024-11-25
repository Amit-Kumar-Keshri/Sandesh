const express = require('express');
const userCtrl = require('../ctrls/user.js').default;

const router = express.Router();

router.post('/user/register', userCtrl.register);

module.exports = router;