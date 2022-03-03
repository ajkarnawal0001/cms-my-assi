const express = require('express')
const connect = require('./config/db')
const mongoose = require('mongoose')

const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = process.env.PORT || 8000

const registerController = require("./controllers/register.controller")
const loginController = require("./controllers/login.controller")
const vlogController = require('./controllers/vlog.controller')
const fileController = require("./controllers/fileUploader")

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


app.use('/register', registerController)
app.use("/login",loginController)
app.use("/vlog",vlogController)
app.use("/file", fileController)

// app.get('/', (req, res) => res.send('Hello World!'))

// heroku
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"))
}

const start = async () => {
    await connect()
    app.listen(PORT, () => {
        console.log(PORT);
        console.log("Hurray!! listening to port no ", PORT);
    })
}

module.exports = start