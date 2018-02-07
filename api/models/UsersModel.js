'use strict';
var db=require('../../db');

var User={
 
        addUser:function(User,callback){
            return db.query("Insert into users(username,password,name,email) values(?,?,?,?)",[User.username,User.password,User.name,User.email],callback);
        },



        userAuthentication:function(User,callback){
            return db.query("select * from users where username=? and password=?",[User.username,User.password],callback);
        }
 
};
 module.exports=User;