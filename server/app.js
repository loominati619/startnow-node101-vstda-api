const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
//in order for us to find req.body
app.use(bodyParser());

// add your code here
var array = [
  {
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
  },
  {
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
  },
  {
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
  }
];

app.get('/', (req, res) => {
  res.json('status: ok')
});

app.get('/api/TodoItems', (req, res) => {
  res.json(array);
});

app.get('/api/TodoItems/:number', (req, res) => {
  res.json(array.find(function (item) { return item.todoItemId == req.params.number
  }));
});

app.post('/api/TodoItems/', (req, res) => {
  var postedID = req.body.todoItemId;
  var itemWasFound = false;

  for (var x = 0; x < array.length; x++) {
    if (array[x].toDoItemId === postedID) {
      array[x] = req.body;
      itemWasFound = true;
    }
  }

  if (itemWasFound === false) {
    array.push(req.body)
  }
  res.status(201).json(req.body)
});

app.delete('/api/TodoItems/:number', (req, res) => {
  var deleteItem = req.params.number;
  for (var x = 0; x < array.length; x++) {
    if (array[x].todoItemId == deleteItem) {
      res.json(array[x]);
      array.splice(x, 1)
    }
  }
});


module.exports = app;
