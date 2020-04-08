const express = require('express')
const router = express.Router()
const List = require('../models/groceryListSchema.js')

router.get('/', async (req, res) => {
  try {
    const lists = await List.find()
    res.json(lists)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
});

router.post('/new', async (req, res) => {
  const list = new List({
    title: req.body.title,
    list: req.body.list
  });

  console.log('in the post request ', req.body);

  try {
    const newList = await list.save()
    res.status(201).json(newList)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

module.exports = router;