const mongoose = require("mongoose")

const requestSchema= new mongoose.Schema({
    name:String,
    requests:String,
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
},{timestamps:true})
module.exports=mongoose.model("requests",requestSchema)