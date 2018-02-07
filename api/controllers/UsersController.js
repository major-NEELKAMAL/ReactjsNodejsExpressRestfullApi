'use strict';

 var Users = require('../models/UsersModel');

exports.create_a_user = function(req, res) {
  Users.addUser(req.body,function(err, user) {
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
              resource: user
          })
      }
  });
};

exports.add_todo_list = function(req, res) {
    Users.addToDoList(req.body,function(err, user) {
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
                resource: user
            })
        }
    });
};



exports.user_todo_list = function(req, res) {
  Users.getUserById(req.query.user_id, function(err, user) {
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
              resource: user
          })
      }
  });
};


exports.delete_user_todo_list = function(req, res) {

console.log(req.body);
  Users.delete_user_todo_list({
    feed_id: req.body.feed_id
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'feed successfully deleted' });
  });
};


exports.user_authentication = function(req, res) {
    Users.userAuthentication(req.body,function(err, user) {
        if (err) {
            res.json({
                authentication: 'failed',
                message: err
            });
            return
        }
        else {
            if(null == user || '' == user){
                res.json({
                    authentication: 'failed',
                    message: user
                });
            }else{
                res.json({
                    authentication: 'success',
                    resource: user
                })
            }

        }
    });
};

