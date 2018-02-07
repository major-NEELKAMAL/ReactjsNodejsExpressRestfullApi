'use strict';
var db=require('../../db');

var ToDoList={

    getToDoListByUserId:function(id,callback){

        return db.query("select * from todolist where user_id_fk=? order by id desc ",[id],callback);
    },



    addToDoList:function(ToDoList,callback){
        db.query("Insert into todolist(todolist,user_id_fk,created,modified) values(?,?,NOW(),NOW())",[ToDoList.feed,ToDoList.user_id]);
        return db.query("select *  from todolist where todolist=? and user_id_fk=? order by id desc ",[ToDoList.feed,ToDoList.user_id],callback);

    },

    deleteUserToDoList:function(id,callback){
        return db.query("delete from todolist where id=? ",id,callback);
    }


};
module.exports=ToDoList;