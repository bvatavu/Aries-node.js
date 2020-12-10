'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/users',
    userController.getUsers,
    userController.responseToJson('users')
);

router.get('/userById/:userId',
    userController.getUsersById,
    userController.responseToJson('users')
)

router.post('/users',
    userController.getUsers,
    userController.createUser,
    userController.responseToJson('addUsers')
);

router.post('/deleteUser/:userId',
    userController.deleteUser  ,
    userController.responseToJson('users')  
)

module.exports = router;