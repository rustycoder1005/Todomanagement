var mongoose = require("mongoose");
var todomodel = require("../models/todomodel");

var controller = {};

// Display all tasks
controller.list = function(req, res) {
  todomodel.find({}).exec(function (err, dbresponseforalltask) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/taskmanager/index", {response: dbresponseforalltask});
    }
  });
};

// Show task by id
controller.show = function(req, res) {
  todomodel.findOne({_id: req.params.id}).exec(function (err, dbresponseforid) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/taskmanager/show", {response: dbresponseforid});
    }
  });
};

// Create Task
controller.create = function(req, res) {
  res.render("../views/taskmanager/create");
};

// Save task
controller.save = function(req, res) {
  var todo = new todomodel(req.body);

  todo.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/taskmanager/create");
    } else {
      console.log("Successfully added the task");
      res.redirect("/todo/show/"+todo._id);
    }
  });
};

// Edit a task
controller.edit = function(req, res) {
  todomodel.findOne({_id: req.params.id}).exec(function (err, dbresponseforedit) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/taskmanager/edit", {response: dbresponseforedit});
    }
  });
};

// Update 
controller.update = function(req, res) {
  todomodel.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, deadline: req.body.deadline, priority: req.body.priority, percent: req.body.percent }}, { new: true }, function (err, dbresponseforupdate) {
    if (err) {
      console.log(err);
      res.render("../views/taskmanager/edit", {response: req.body});
    }
    res.redirect("/todo/show/"+dbresponseforupdate._id);
  });
};

// Delete 
controller.delete = function(req, res) {
  todomodel.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Task deleted!");
      res.redirect("/todo");
    }
  });
};

module.exports = controller;
