const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageEntry = require('./controllers/imageEntry');

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('working');
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleGetProfile(req, res, db)});
app.put('/image', (req, res) => {imageEntry.handleImageEntry(req, res, db)});
app.post('/imageUrl', (req, res) => {imageEntry.handleApiCall(req, res)});

app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app is running on PORT ${process.env.PORT || 3001}`);

});
