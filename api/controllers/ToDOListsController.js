'use strict';

var ToDoLists = require('../models/ToDoListsModel');


exports.add_todo_list = function(req, res) {
    ToDoLists.addToDoList(req.body,function(err, todolist) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            });
            return
        }
        else {
            res.json({
                confirmation: 'success',
                resource: todolist
            })
        }
    });
};



exports.get_user_todo_list = function(req, res) {
    ToDoLists.getToDoListByUserId(req.query.user_id, function(err, todolist) {
        if (err) {
            res.json({
                confirmation: 'fail',
                message: err
            });
            return
        }
        else {
            res.json({
                confirmation: 'success',
                resource: todolist
            })
        }
    });
};


exports.delete_user_todo_list = function(req, res) {

    console.log(req.body.feed_id);
    ToDoLists.deleteUserToDoList(req.body.feed_id , function(err, todolist) {
        if (err)
            res.send(err);
        res.json({ message: todolist });
    });
};




