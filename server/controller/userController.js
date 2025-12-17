const userModel = require("../models/userModel")
const createSignup = async function (req, res) {
    try {
      const { name, gender, address, email, mobile, password,adhar,pan,dl } = req.body;
      const images = req.files.map((file) => file.location);
  
      const userData = {
        name,
        gender,
        email,
        mobile,
        password,
        images,
      };
  
      const savedUser = await userModel.create(userData);
  
      return res.status(201).send({
        status: true,
        message: "User has been created successfully",
        data: savedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }; 
  //=============================signin======================================//
  const signIn = async function (req, res) {
    const { email, password } = req.body;
  
    try {
      const user = await userModel.findOne({ email });
  
      if (user && user.password === password) {
        res.json({ message: "Sign-in successful", userId: user._id });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  //====================================get user by id / profile============================//
  const getUserById = async function (req, res) {
    try {
      let userId = req.params.userId;
  
      let checkData = await userModel.findOne({ _id: userId });
      if (!checkData) {
        return res
          .status(404)
          .send({ status: false, message: "userId not exist" });
      }
  
      return res.status(200).send({
        status: true,
        message: "Users Profile Details",
        data: checkData,
      });
    } catch (err) {
      return res.status(500).send({ status: false, msg: err.message });
    }
  };

  //========================getAllUsers===================================//
  const getAllUsers = async (req, res) => {
    try {
      const { id } = req.query;
  
      if (id) {
        const user = await userModel.findById(id);
  
        if (user) {
          return res.status(200).json({
            status: 200,
            success: true,
            message: "User by id",
            data: user,
          });
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Unable to find user by id",
          });
        }
      } else {
        const users = await userModel.find();
  
        if (users.length > 0) {
          return res.status(200).json({
            status: 200,
            success: true,
            message: "All users",
            data: users,
          });
        } else {
          return res.status(400).json({
            status: 400,
            success: false,
            message: "Unable to find users",
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Something went wrong",
        error: error.message,
      });
    }
  };

  module.exports={createSignup,signIn,getAllUsers,getUserById}