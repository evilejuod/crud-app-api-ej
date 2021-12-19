const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController')
const { validateUser } = require('../../utils/validateHelper')

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);

router.post('/users', validateUser, usersController.createUser);

router.delete('/users/:id', usersController.deleteUser);

router.put('/users/:id', validateUser, usersController.updateUser);


module.exports = router;
