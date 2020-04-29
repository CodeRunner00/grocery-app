const express = require('express')
const router = express.Router()
const db = require('../models/')

console.log('db from model ', db);

const userCache = {};

router.post('/register', async (req, res) => {
  console.log('post user req ', req.body)
  if(userCache[req.body.userId]) res.json(userCache[req.body.userId]);
  let userExists;
  try {
    userExists = await db.User.findOne({ where: { userId: req.body.userId } });
    console.log('found a user ', userExists);
    userCache[req.body.user] = userExists;
    if(userExists) res.json(userExists);
  } catch (err) {
    console.log('yep it failed in finding a user ', err);
    res.status(500).json({ message: err.message })
  }
  if(!userExists) {
    console.log('trying to create new user');
    try {
      const user = await db.User.create({ userId: req.body.userId });
      res.json(user)
    } catch (err) {
      console.log('yep it failed')
      res.status(500).json({ message: err.message })
    }
  }  
});

// router.post('/login', async (req, res) => {
//   console.log('post user req ', req.body)
//   const userExists = db.User.findOne({ where: { userId: req.body.userId } }).then((user) => {
//     console.log('User already exists');
//     res.json(user)
//   });
//   if(!userExists) {
//     res.statusCode(400);
//   }  
// });

router.get('/lists/load', async (req, res) => {
  console.log('post user req ', req.body)

  let currentUser;
  if(userCache[req.body.userId]) currentUser = userCache[req.body.userId];
  if(!currentUser) {
    try {
      currentUser = await db.User.findOne({ where: { userId: req.body.userId } });
      console.log('found a user in load lists', userExists);
      userCache[req.body.user] = userExists;
      if(userExists) res.json(userExists);
    } catch (err) {
      console.log('yep it failed in finding a user ', err);
      res.status(500).json({ message: err.message })
    }
  }  

  let parentList;

  try {
    parentList = await db.List.findOne({where: { UserId: currentUser.id }});
  } catch(err) {
    console.log('error searching for parentList');
  }
  // const parentList = db.List.findOne({where: { UserId: currentUser.id }}).then((list) => {
  //   console.log('Found a list to load');
  //   // res.json(list)
  // });

  if(!parentList) {
    res.statusCode(400);
  } 

  try {
    const items =  await db.Item.findAll({where: { listId: parentList.id }});
    console.log('Sending back a list and items of the user');
    res.json({list: parentList, items });
  } catch(err) {
    console.log('Error fetching item s', err);
  }

  // const items =  db..findAll({where: { listId: parentList.id }}).then((items) => {
  //   console.log('Sending back a list and items of the user');
  //   res.json({list: parentList, items: items});
  // });


  
  res.json({list: parentList, items })
});

router.post('/lists/new', async (req, res) => {
  console.log('post user req ', req.body);
  let listParent;
  let currentUser;
  if(userCache[req.body.user]) currentUser = userCache[req.body.user];
  if(!currentUser) {
    try {
      currentUser = await db.User.findOne({ where: { userId: req.body.userId } });
    } catch(err) {
      console.log('error finding the user ', err);
    }
  }
  console.log('currentUser is ', currentUser);
  if(!currentUser) {
    res.send('The user doesn\'t exist therefore no list');
  }
  try {
    console.log('the req.body in new list post ', req.body);
    listParent = await db.List.create({ UserId: currentUser.id, title: req.body.title });
    console.log('A parent list has been created!', listParent);   
  } catch (err) {
    console.log('Tehre was an error creating the list in the database', err);
  }

  req.body.items.forEach(async item => {
    try {
        console.log('current item is ', item);
        const listParentId = listParent.id;
        console.log('listparentid ', listParentId);
        const createItem = await db.Item.create({ val: item, listId: listParentId});
        console.log('An item list has been created!');
    } catch (err) {
      console.log('error creating an item ', err);
    }
  });
  res.send('success creating the list with items');
});

// router.post('/login', async (req, res) => {
//   const list = new List({
//     title: req.body.title,
//     list: req.body.list
//   });

//   console.log('in the post request ', req.body);

//   try {
//     const newList = await list.save()
//     res.status(201).json(newList)
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// });

module.exports = router;