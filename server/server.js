require('dotenv').config()
const bodyparser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan'); // log request in dev mode
const express = require('express')
const app = express()

// const mongoose = require('mongoose')
const routes = require('./routes')



// let's set up some basic middleware for our express app
// logs requests to the console. not necessary to make passport work, but useful
app.use(morgan('dev'));
// Use body-parser for reading form submissions into objects
app.use(bodyparser.urlencoded({ extended: true }));
// Use body-parser for reading application/json into objects
app.use(bodyparser.json());
app.use(cors())
// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }


// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
require('./passport')(app);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('connected to database, now edited!'))


app.use('/', routes)
app.listen(3005, () => console.log('server started!!'))