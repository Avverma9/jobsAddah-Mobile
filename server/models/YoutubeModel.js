const mongoose=require('mongoose')
const youtubeSchema= new mongoose.Schema({
    title:String,
    images:[String],
    device:String,
    description:String,
    date:String,
    videoUrl:String
},{timestamps:true})
module.exports=mongoose.model("youtube",youtubeSchema)