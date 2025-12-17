const express= require("express")
const router = express.Router();
const userController = require("../controller/userController")
const youtubeController= require("../controller/youtubeController")
const mi11tpro=require("../controller/mi11tpro")
const mi11x=require("../controller/mi11x")
const tools=require("../controller/tools")
const {upload}=require("../aws/upload")
const requests=require("../controller/reqController")
const rom=require("../controller/romController")
//==============================mi 11t==============================================//
router.post("/mi11t/create",upload,mi11tpro.createmi11t)
router.get("/getmi11t/get",mi11tpro.getMi11T)
//===============================mi 11x==========================================//
router.post("/mi11x/create",upload,mi11x.createmi11x)
router.get("/getmi11x/get",mi11x.getMi11x)
//====================================tools==========================================================//
router.post("/tool/post",tools.newTool)
router.get("/tool",tools.getTool)
//=================================================================================//
router.post("/video",upload,youtubeController.createVideo)
router.delete("/video/delete/:id",youtubeController.deleteVideo)
//++++++++++++++++++++++++++++++user+++++++++++++++++++++++++++++++++++++++
router.post("/user",upload,userController.createSignup)
router.post("/user/signin",userController.signIn)
router.get("/getAlluser",userController.getAllUsers)
router.get("/profile",userController.getUserById)
router.get("/getVideo",youtubeController.getVideo)
//======================requests======================
router.post("/create/req/:id",requests.createReq)
router.get("/get/req",requests.getReq)
router.delete("/delete/req",requests.deleteReq)
//==========================rom=====================
router.post("/create/rom",rom.createROm)
router.get("/get/rom",rom.getROm)
module.exports = router;