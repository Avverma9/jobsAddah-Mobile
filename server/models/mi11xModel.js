const mongoose = require("mongoose")

mi11xSchema= new mongoose.Schema({
    title:String,
    images:[String],
    date:String,
    device:String,
    description:String,
    videoUrl:String
},{timestamps:true})
module.exports= mongoose.model("mi11x",mi11xSchema)