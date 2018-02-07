 'use strict';

 var express = require('express');
 var router = express.Router();
 var users = require('../api/controllers/UsersController');
 var todolists = require('../api/controllers/ToDOListsController');

router.post('/signup', users.create_a_user);
router.post('/login', users.user_authentication);
router.get('/get-user-todo-list', todolists.get_user_todo_list);
router.post('/add-todo-list', todolists.add_todo_list);
router.delete('/delete-user-todo-list', todolists.delete_user_todo_list);

module.exports = router;