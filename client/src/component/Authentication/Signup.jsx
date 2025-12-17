import React,{useState} from 'react'
import axios from "axios"
import './Signup.css'
const Signup =()=>{
    const [name,setName]=useState("")
    const [gender,setGender]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [images,setImages]=useState([])


    const handleSignUp=async(e)=>{
        e.preventDefault()

        const formData = new FormData()
        formData.append("name",name)
        formData.append("gender",gender)
        formData.append("email",email)
        formData.append("password",password)
        formData.append("images",images)

        const response= await axios.post("https://youtube-bbrv.onrender.com/user",formData)
        if(response.data){
            alert("data recieved")
        }
    }
    const handleImageUpload=(e)=>{
        const images= e.target.files[0]
        setImages(images)
    }
    return(
        <div className="register">
         <form onSubmit={handleSignUp}>
            <input type="text" value={name} placeholder='Enter Your name' onChange={(e)=> setName(e.target.value)} />
            <input type="text" value={email} placeholder='Enter Your email' onChange={(e)=> setEmail(e.target.value)} />
            <input type="text" value={gender} placeholder='Enter Your gender' onChange={(e)=> setGender(e.target.value)} />
            <input type="text" value={password} placeholder='Enter Your password' onChange={(e)=> setPassword(e.target.value)} />
            <input type="file" accept='image/*'  onChange={handleImageUpload} />
         
         <div  className="register-btn">
            <button type="submit">Register</button>
            </div>
            </form>
            <p>Already have an accout ?</p>
            <a href="/login">Click here</a>
        </div>
    )
}
export default Signup