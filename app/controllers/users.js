'use strict'
const User = require('../models/users');
module.exports = {
    isAdmin: isAdmin,
    getUsers: getUsers,
    createUser: createUser,
    getUsersById: getUsersById,
    deleteUser: deleteUser,
    responseToJson: responseToJson
}

function isAdmin(req, res, next) {
    const isAdminVal = true;
    if (isAdminVal) {
        return next();
    }

    return res.send('Unauthorized');
}


function getUsers(req, res, next) {

    User.find(function (err, result) {
        if (err) {
            console.log('err', err);
        }

        req.resources.users = result;
        next()
    })
}

function createUser(req, res, next) {
    const addUser = req.body;
    addUser.details = req.body.details;
    addUser.documents = req.body.documents;
    const user = new User(addUser);

    user.save(function (err, result) {
        if (err) {
            err.statusCode=400;
            return next(err);
        }

        req.resources.addUsers = result;
        next();

    })
}


function getUsersById(req, res, next) {
    User.find({ _id: req.params['userId'] }, function (err, result) {
        if (err) {
            return res.json(err);
        }
        req.resources.users = result;
        next()
    })
}

function deleteUser(req, res, next) {
    User.deleteOne({ _id: req.params['userId'] }, function (err, result) {
        if (err) {
            return res.json(err);
        }

        req.resources.users = result;
        next()
    })
}

function responseToJson(prop) {
    return function (req, res, next) {
        res.json(req.resources[prop]);
    }
}