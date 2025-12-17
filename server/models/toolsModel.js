const mongoose= require("mongoose")
const toolSchema=new mongoose.Schema({
    name:String,
    link:String,
},{timestamps:true})
module.exports=mongoose.model("tools",toolSchema)