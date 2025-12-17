const mongoose = require("mongoose")

const romSchema= new mongoose.Schema({
    name:String,
    link:String
},{timestamps:true})

module.exports=mongoose.model("roms",romSchema)