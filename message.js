'use strict';


const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const dataPath = path.join(__dirname, 'messages.json');



exports.get = (cb) => {
  
  readMessages(cb);


};


exports.getOne = (id,cb) => {
  readMessage(id,cb);
};


exports.create = (newMessage, cb) => {
  readMessages((err,messages) => {
    if(err) return cb(err);
    
    newMessage.date = new Date();
    newMessage.id = uuid();
    

    messages.push(newMessage);

    writeMessages(messages,cb);
  });
};

exports.delete = (id, cb) => {
  readMessages((err,messages) => {
    if(err) return cb(err);

    messages = messages.filter((messageObj) => messageObj.id !== id);
    writeMessages(messages,cb);



  });
}


exports.update = (id,updateObj, cb) => {
  
  readMessages((err,messages) => {

    let message = messages.find((elem)=> elem.id === id);

    if(updateObj.name) {
      message.name = updateObj.name;
    }
    if(updateObj.message) {
      message.message = updateObj.message;
    }

    writeMessages(messages,cb);

  });
}





function readMessage(id,cb) {
  fs.readFile(dataPath, (err,data) => {


    if(err) return cb(err);

    try {
      var messages = JSON.parse(data);
    } catch(e) {
      var messages = [];
    }


    var message = messages.find((elem)=> elem.id === id);

    //messages.find((elem)=> elem.id === id);


    cb(null,message);

    
  });
}


function readMessages(cb) {

  fs.readFile(dataPath, (err,data) => {


    if(err) return cb(err);

    try {
      var messages = JSON.parse(data);
    } catch(e) {
      var messages = [];
    }

    cb(null,messages);

    
  });

}

function writeMessages(messages, cb) {

  fs.writeFile(dataPath, JSON.stringify(messages), cb);

}