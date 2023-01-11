const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const sigin = require('./controller/signin.js');
const register = require('./controller/register.js');
const profile = require('./controller/profile.js');
const image = require('./controller/image.js');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
 
console.log(process.env.DATABASE_URL);
const db = knex ({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    }
});




const app = express();
const PORT = process.env.PORT || 4000;
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*').from('users')
    .returning('*')
    .then(console.log);
    res.json({port:process.env.PORT, key: process.env.DATABASE_URL});
  });
app.post('/signin', (req, res) => { sigin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.put('/image', (req, res) => { image.handleEntries(req, res, db , process.env.API_KEY)});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

/* 

/ --> res  = this is working
/ sigin -> POST REQUEST (Because we gonna post some data, some user data); success/fail
/ register -> POST REQUEST (Ask the data/database to the local variable or //)
/ profile -> /userId -> GET the user infomation GET = user.get
/ image  --> PUT (the user already exists, they update it) --> user

*/