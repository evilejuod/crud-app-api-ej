const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController')

router.get('/users', );
router.post('/users', usersController.addUser);
router.delete('/users/:id');
router.put('/users/:id');


module.exports = router;
