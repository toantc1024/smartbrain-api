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

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 1;

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
  res.json(process.env.DATABASE_URL);
});
app.post('/signin', (req, res) => { sigin.handleSignin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
app.put('/image', (req, res) => { image.handleEntries(req, res, db)});
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
app.put('/imageUrl', (req, res) => { image.handleImageUrl(req, res, process.env.CLARIFAI_API_KEY)});

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