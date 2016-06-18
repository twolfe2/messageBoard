'use strict';


const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const moment = require('moment');

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
    
    let date = moment().format('lll');
    newMessage.date = date;
    newMessage.unicodeDate = Date.now();
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


exports.sort = (sortBy,cb) => {

  readMessages((err,data) =>{
    if(err) return console.log(err);

    if(sortBy === 'name') {
      data.sort((a,b) => a.name > b.name);
      writeMessages(data,cb);
      ///cb(null,data);


    }
    else if(sortBy === 'date') {
      data.sort((a,b) => a.unicodeDate - b.unicodeDate);
      writeMessages(data,cb);
      //cb(null,data);
    }

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