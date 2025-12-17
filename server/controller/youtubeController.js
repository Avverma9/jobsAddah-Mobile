const YoutubeModel = require("../models/YoutubeModel")

const createVideo = async(req,res)=>{
    const{title,device,date,description,videoUrl}=req.body
    const images= req.files.map((file)=> file.location)
    const videoData={title,images,device,date,description,videoUrl}
    const savedVideo= await YoutubeModel.create(videoData)
    res.json(savedVideo)
}

const getVideo = async(req,res)=>{
    const videoData= await YoutubeModel.find().sort({createdAt : -1})
    res.json(videoData)
}

const deleteVideo = async function(req,res){
    const {id}= req.params
    const deletedData= await YoutubeModel.findByIdAndDelete(id)
    res.status(200).json(deletedData)
}
module.exports={createVideo,getVideo,deleteVideo}