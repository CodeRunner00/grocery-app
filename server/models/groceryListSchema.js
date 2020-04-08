const mongoose = require('mongoose');

const groceryList = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  list: {
    type: [String],
    required: true
  }
})

module.exports = mongoose.model('GroceryList', groceryList)