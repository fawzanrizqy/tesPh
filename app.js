const express = require('express');
const Controller = require('./controllers/controller');
const app = express()
const port = 3000


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', Controller.index)
app.post('/login', Controller.login)
app.get('/register', Controller.getRegister)
app.post('/register', Controller.register)
app.get('/users', Controller.users)
app.post('/users/:id', Controller.delUsers)
app.get('/users-edit/:id', Controller.editUsers)
app.post('/users-edit-do/:id', Controller.editUsersDo)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})