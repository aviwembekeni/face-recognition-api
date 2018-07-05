const express = require('express');
const bodyParser = require('body-parser');
const bcrypto = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: "123",
            name: "aviwe",
            email: "aviwe@mail.com",
            password: "lavish",
            entries: 0,
            joined: new Date()
        },
        {
            id: "321",
            name: "jon",
            email: "jon@mail.com",
            password: "doe",
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
         req.body.password === database.users[0].password) {

        res.json(database.users[0]);

    }else{
        res.status(400).json('error logging in');
    }
})


app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id: "135",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length -1 ]);

})

app.get('/profile/:id', (req, res) => {

    const {id} = req.params;

    let exist = false;

    database.users.forEach(user => {
        if (user.id == id) {
        exist = true;
        return res.json(user);

        }
    })

    if (!exist) {
        res.status(404).json('non such user');
     }

})

app.put('/image', (req, res) => {

    const {id} = req.body;

    let exist = false;

    database.users.forEach(user => {
        if (user.id == id) {
        exist = true;
        user.entries ++;
        return res.json(user.entries);

        }
    })

    if (!exist) {
        res.status(404).json('non such user');
     }

})

app.listen(3001, ()=>{
    console.log("running");

});
