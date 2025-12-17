const mi11tpro= require("../models/mi11tproModel")
const createmi11t = async(req,res)=>{
    const{title,device,date,description,videoUrl}=req.body
    const images= req.files.map((file)=> file.location)
    const videoData={title,images,device,date,description,videoUrl}
    const savedVideo= await mi11tpro.create(videoData)
    res.json(savedVideo)
}

const getMi11T = async(req,res)=>{
    const videoData= await mi11tpro.find().sort({createAt : -1})
    res.json(videoData)
}

module.exports={createmi11t,getMi11T}