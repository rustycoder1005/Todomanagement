var mongoose = require('mongoose');

var todomodel = new mongoose.Schema({
  name: String,
  deadline: String,
  priority: String,
  percent: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('todomodel', todomodel);
