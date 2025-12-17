const tools=require("../models/toolsModel")

const newTool = async(req,res)=>{
    const {name,link}=req.body
    const instancee={name,link}
    const newcreate= await tools.create(instancee)
    res.json(newcreate)
}

const getTool = async(req,res)=>{
    const get= await tools.find().sort({createdAt :-1})
    res.json(get)
}

module.exports={newTool,getTool}