const mongoose = require('mongoose')
const connectDb = async() =>{
    try{
        const connect = await mongoose.connect(process.env.MongoURI)
        console.log("database connected succesfully")
    }
    catch(err){
        console.log(error)
    }
}
module.exports = connectDb;