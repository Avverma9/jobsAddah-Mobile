const romModel= require("../models/romModel")

const createROm= async function(req,res){
    const{name,link}=req.body
    const created= await romModel.create({name,link})
    res.json(created)
}

const getROm=async(req,res)=>{
    const getData= await romModel.find().sort({createdAt : -1})
    res.json(getData)
}

module.exports={createROm,getROm}