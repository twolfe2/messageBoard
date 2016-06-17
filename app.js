'use strict';


var PORT = 8000;

//Requires
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const Message = require('./message');
const bodyParser = require('body-parser');


//App Declaration
let app = express();

//General Purpose Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//for static routing (css,js, image, etc.......)
app.use(express.static('public'));


//routes

app.get('/', (req,res) => {
  
  let indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);

});


app.get('/messages', (req,res) => {

  // var sort = req.query.sort;

  Message.get((err,messages) => {
    if(err) return res.status(400).send(err);

    res.send(messages);
  });

});


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
