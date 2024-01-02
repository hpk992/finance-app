const express = require('express');
const authController = require('../controllers/auth.controller');
const accountController = require('../controllers/account.controller');

const router = express.Router();

// router.get('/getall', accountController.getAllUser);
router.get('/:id', accountController.getMe);
router.use(authController.protect);
router.patch('/updateMe', accountController.updateMe);
router.patch('/updateMyPassword', accountController.updateMyPassword);

module.exports = router;
