const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth')

//info from client to server so post request 

router.post('/register',authController.register);
router.post('/signin',authController.signin);
router.get('/isauth',auth(),authController.isauth);
//router.get('/dog',auth('readAny','dog'),authController.dog)
// checks if user hass right to create any role

module.exports = router;

//user makes request at isauth we pass bearer with token of user 
// it reaches auth() before controller it goes to auth.js in middleware 
// if everything okay go next() => means auth controller if not error 