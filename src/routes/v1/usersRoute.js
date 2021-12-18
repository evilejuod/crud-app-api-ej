const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController')

router.get('/users',  usersController.getAllUsers);
router.get('/users/:id',  usersController.getUserById);

router.post('/users', usersController.createUser);

router.delete('/users/:id', usersController.deleteUser);

router.put('/users/:id', usersController.updateUser);


module.exports = router;
