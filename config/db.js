const mongoose = require("mongoose")

const connect = () => {
    
    // return mongoose.connect("mongodb://127.0.0.1:27017/data-vlogs-cms", {
    return mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://ajkarnawal:Amarjeet@315@cluster0.s0e0l.mongodb.net/data-vlogs-cms?retryWrites=true&w=majority", {

        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log('connect')
    }).catch((err)=>{
        console.log('not')
    })
}

module.exports = connect

// mongodb+srv://ajkarnawal:<password>@cluster0.s0e0l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority