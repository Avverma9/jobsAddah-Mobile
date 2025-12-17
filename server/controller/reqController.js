const requestsModel= require("../models/requestModel.js")
const userModel = require("../models/userModel.js")
const createReq = async (req, res) => {
    const { requests, name } = req.body;
    const user = await userModel.findOne({ /* Yahan aap user ko dhundne ke liye query daal sakte hain */ });
    if(user){
        userName = user.name;
    }else{
        userName = "ShubhChintak"
    }
    
    const created = await requestsModel.create({ requests, name: userName });
    res.status(201).json(created);
};
const getReq = async function(req, res) {
    try {
        const getData = await requestsModel.find().sort({ createdAt: -1 }); // createdAt field ke basis par descending order me sort kiya gaya hai
        res.json(getData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving data" });
    }
}

const deleteReq= async function(req,res){
    const deleted= await requestsModel.deleteMany()
   return res.status(200).json({message: "deleted"})
}

module.exports={createReq,getReq,deleteReq}