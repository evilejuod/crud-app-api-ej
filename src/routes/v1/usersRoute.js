const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController')

router.get('/users',  usersController.allUsers);
router.get('/users/:id',  usersController.singleUser);

router.post('/users/add-user', usersController.addUser);

router.delete('/users/:id', usersController.deleteUser);

router.put('/users/:id', usersController.updateUser);


module.exports = router;
