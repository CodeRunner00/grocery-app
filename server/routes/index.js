const express = require('express')
const router = express.Router()
const db = require('../models/')
const passport = require('passport');

const getCurrentUser = (req, res) => {
  // I'm picking only the specific fields its OK for the audience to see publicly
  // never send the whole user object in the response, and only show things it's OK
  // for others to read (like ID, name, email address, etc.)
  const { id, username } = req.user;
  res.json({
    id, username
  });
}

router.get('/', (req, res) => {
  res.send('We are connected to the backend!');
});
const userCache = {};
//passport.authenticate('local')
router.post('/register', async (req, res) => {
  console.log('post user req ', req.body)
  if(userCache[req.body.userId]) res.json(userCache[req.body.userId]);
  let userExists;
  try {
    userExists = await db.User.findOne({ where: { userId: req.body.userId } });
    console.log('found a user ', userExists);
    userCache[req.body.user] = userExists;
    if(userExists) {
      userExists.dataValues.password === req.body.password ? res.status(200).json(userExists) : res.status(401).json({message: 'User already exists'});   
    } 
  } catch (err) {
    console.log('yep it failed in finding a user ', err);
  }
  if(!userExists) {
    console.log('trying to create new user');
    try {
      const user = await db.User.create({ userId: req.body.userId, password: req.body.password });
      res.json(user)
    } catch (err) {
      console.log('yep it failed creating a user')
      res.status(500).json({ message: err.message })
    }
  }  
});

router.post('/google/login', async (req, res) => {
  console.log('post user req ', req.body)
  if(userCache[req.body.userId]) res.json(userCache[req.body.userId]);
  let userExists;
  try {
    userExists = await db.User.findOne({ where: { userId: req.body.userId } });
    console.log('found a user ', userExists);
    userCache[req.body.user] = userExists;
    if(userExists) {
      userExists.dataValues.password === req.body.password ? res.status(200).json(userExists) : res.status(401).json({message: 'Incorrect password'});   
    } 
  } catch (err) {
    console.log('yep it failed in finding a user on google login', err);
  }
  if(!userExists) {
    console.log('trying to create new user');
    try {
      const user = await db.User.create({ userId: req.body.userId, password: req.body.password });
      res.json(user)
    } catch (err) {
      console.log('yep it failed creating a user')
      res.status(500).json({ message: err.message })
    }
  }  
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'Invalid username or password.'
    })
  }
  getCurrentUser(req, res);
});

router.post('/lists/load', async (req, res) => {
  console.log('post req body /lists/load', req.body)

  if(!req.isAuthenticated()) console.log('this is not an authenticated call!');

  let currentUser;
  if(userCache[req.body.userId]) currentUser = userCache[req.body.userId];
  if(!currentUser) {
    try {
      currentUser = await db.User.findOne({ where: { userId: req.body.userId } });
      console.log('found a user in load lists', currentUser);
      userCache[req.body.user] = currentUser;
    } catch (err) {
      console.log('yep it failed in finding a user ', err);
      res.status(500).json({ message: err.message })
    }
  }  

  let parentLists = [];

  try {
    parentLists = await db.List.findAll({where: { UserId: currentUser.id }});
  } catch(err) {
    console.log('error searching for parentList');
  }
  // const parentList = db.List.findOne({where: { UserId: currentUser.id }}).then((list) => {
  //   console.log('Found a list to load');
  //   // res.json(list)
  // });

  if(!parentLists) {
    res.statusCode(400);
  } 
  let listsWithItems = [];
  try {
    const all = await Promise.all(parentLists.map(async (list, i) => {
      const currentItems = await db.Item.findAll({where: { listId: list.id }});
      // console.log('currentItems ', currentItems);
     let obj = {
        id: list.id,
        title: list.title,
        items: await currentItems
      };
      return obj;
    }));
    console.log('Sending the all the items and lists', all);

    res.json({allItems: all});
  } catch(err) {
    console.log('Error fetching item s', err);
  }

  // const items =  db..findAll({where: { listId: parentList.id }}).then((items) => {
  //   console.log('Sending back a list and items of the user');
  //   res.json({list: parentList, items: items});
  // });
});

router.post('/lists/new', async (req, res) => {
  console.log('post req body /lists/new', req.body);
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

router.post('/list/newitem', async (req, res) => {
  const listParentId = req.body.listParentId;
  const item = req.body.item;
  try {
    console.log('listparentid ', listParentId);
    const createItem = await db.Item.create({ val: item, listId: listParentId});
    console.log('An item list has been created!');
    res.send(createItem);
} catch (err) {
  console.log('error adding new item ', err);
}
});

router.post('/lists/delete', async (req, res) => {
  console.log('req.body in deleted list ', req.body);
  const destroyed = await db.List.destroy({
    where: {
      id: req.body.id
    }
  }); 
  console.log('list destroyed ', destroyed);
  res.json(destroyed);
});

router.post('/google/auth/register', async (req, res) => {
  
});


router.get('/logout', function(req, res){
  req.logout();
  res.status(200).json({user: req.user});
});

module.exports = router;
