var express = require('express');
var router = express.Router();
var todoapp = require("../controllers/todoappcontroller.js");

// Get all tasks
router.get('/', function(req, res) {
  todoapp.list(req, res);
});

// Get single task by id
router.get('/show/:id', function(req, res) {
  todoapp.show(req, res);
});

// Create task
router.get('/create', function(req, res) {
  todoapp.create(req, res);
});

// Save task
router.post('/save', function(req, res) {
  todoapp.save(req, res);
});

// Edit task
router.get('/edit/:id', function(req, res) {
  todoapp.edit(req, res);
});

// Update task
router.post('/update/:id', function(req, res) {
  todoapp.update(req, res);
});

// Delete task
router.post('/delete/:id', function(req, res, next) {
  todoapp.delete(req, res);
});

module.exports = router;
