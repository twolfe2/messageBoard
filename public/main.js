'use strict';


$(document).ready(init);

var id="";

function init() {

  // renderMessages();
  $('.newMessage').on('click', newMessage);
  $('.saveMessage').on('click', saveMessage);
  $('.messages').on('click', '.delete', deleteMessage);
  $('.messages').on('click', '.edit', editMessage);
  $('.editMessage').on('click', saveEdit);
  $('.edit').on('click', sortMessages);
}




function sortMessages() {
  let sortDate = $(this).hasClass('dateSort');
  let sortBy = sortDate ? 'date' : 'name';

  $.ajax(`/messages?sortBy=${sortBy}`, {
    success: function(data) {
      renderMessages();
    },
    error: function(err) {console.log(err);}
  });
}


function newMessage() {

  $('#messageModal').modal();
}


function saveMessage() {
  $('#messageModal').modal('toggle');
  let message = $('.messageInput').val();
  $('.messageInput').val('');

  let name = $('.nameInput').val();
  $('.nameInput').val('');


  $.ajax('/messages', {
    method: "POST",
    data: {
      name: name,
      message: message
    },
    success: function(data) {
      renderMessages();

    },
    error: function(error) {
      console.log("there was an error");
    }
  });

  // console.log(name,message);


  // $('#messageModal').modal();
}


function renderMessages() {
  let messages = [];
  $.ajax('/messages', {
    method: "GET",
    success: function(data) {
      var messages = [];
      data.forEach((message) => {
        // console.log(message);
        var $tr = $('.template').clone();
        // debugger;
        $tr.find('.name').html(message.name);
        $tr.find('.message').html(message.message);
        $tr.find('.date').html(message.date);
        $tr.attr('message-id', message.id);
        // console.log($tr);
        $tr.removeClass('template');
        messages.push($tr);

      });
      $('.messages').empty().append(messages);


    }
  })
}




function deleteMessage() {
  console.log('delete');
  // debugger;
  id = $(this).closest('tr').attr('message-id');

  $.ajax(`/messages/${id}`, {
    method: "DELETE",
    success: function() {
      // console.log('delete successful');
      renderMessages();
    }
  });
}


function editMessage() {

  $('#editModal').modal();
  id = $(this).closest('tr').attr('message-id');
  // $('.newMessage').val($(this.closest('.message').html()));
  // $('.newName').val($(this.closest('.name').html()));

  
}




function saveEdit() {
    $('#editModal').modal('toggle');





    let message = $('.newMessage').val();
    $('.newMessage').val('');

    let name = $('.newName').val();
    $('.newName').val('');



    $.ajax(`/messages/${id}`, {
      method: "PUT",
      data: {
        name: name,
        message: message
      },
      success: function() {
        console.log('Edit successful');
        renderMessages();

       
      }


  
  });

}
