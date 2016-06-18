'use strict';


var PORT = process.env.PORT || 8000;

//Requires
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Message = require('./message');
const bodyParser = require('body-parser');
const moment = require('moment');

//App Declaration
let app = express();

//App configuration 
app.set('view engine', 'pug');

//General Purpose Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//for static routing (css,js, image, etc.......)
app.use(express.static('public'));


//routes

app.get('/', (req,res) => {
  
  // let indexPath = path.join(__dirname, 'index.html');
  // res.sendFile(indexPath);
  // console.log('hello')

    Message.get((err,messages) => {
      if(err) return res.status(400).send(err);
      // console.log(messages);
      res.render('index',{messages: messages});
    });

    
  


});


app.get('/messages', (req,res) => {

  // var sort = req.query.sort;

  let qString = req.query;
  // console.log(qString);
  if(Object.keys(qString).length) {
    Message.sort(qString.sortBy, (err,messages) => {
      if(err) return console.log(err);

      res.send(messages);
    });
  } else {

    Message.get((err,messages) => {
      if(err) return res.status(400).send(err);
      console.log
      res.send(messages);
    });

    
  }



});

// app.get('/messages', (req,res) => {


// })


app.get('/messages/:id', (req,res) => {

  let id = req.params.id;
  Message.getOne(id, (err,message) => {
    if(err) return res.status(400).send(err);

    res.send(message);
  });
});


app.post('/messages', (req,res) => {

  let messageObj = {
    name: req.body.name,
    message: req.body.message
  };

  Message.create(messageObj, (err) => {
    if(err) return res.status(400).send(err);
    console.log('message saved!');
    res.send();
  });

});


app.delete('/messages/:id', (req,res) => {
  let id = req.params.id; 

  Message.delete(id,err => {
    if(err) return res.status(400).send(err);
    res.send();
  });
});


app.put('/messages/:id', (req,res) => {
  let id = req.params.id;
  let updateObj = req.body;
  

  Message.update(id, updateObj,err => {
    if(err) return res.status(400).send(err);
    res.send();
    
  });
});



app.listen(PORT, err => {

  console.log(err || `Example app running on ${PORT}`);
});
