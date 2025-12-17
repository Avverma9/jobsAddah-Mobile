const mi11x= require("../models/mi11xModel")
const createmi11x = async(req,res)=>{
    const{title,device,date,description,videoUrl}=req.body
    const images= req.files.map((file)=> file.location)
    const videoData={title,images,device,date,description,videoUrl}
    const savedVideo= await mi11x.create(videoData)
    res.json(savedVideo)
}

const getMi11x = async(req,res)=>{
    const videoData= await mi11x.find().sort({createdAt : -1})
    res.json(videoData)
}

module.exports={createmi11x,getMi11x}