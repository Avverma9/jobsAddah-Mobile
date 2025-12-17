import React,{useState} from "react";
import axios from 'axios'

const Rom=()=>{
    const [name,setName]=useState("")
    const [link,setLink]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const respone= await axios.post("https://youtube-bbrv.onrender.com/create/rom",{
            name,
            link

        })
        if(respone.data){
            window.location.reload()
           
        }
    }
    return(
        <div className="container-home">
        <form onSubmit={handleSubmit}>
<input type="text" value={name} placeholder="Enter Rom name" onChange={(e)=> setName(e.target.value)} />
<input type="text" value={link} placeholder="Rom link ..." onChange={(e)=>setLink(e.target.value)} />
<div><button type="submit">Submit</button></div>
        </form>
        </div>
    )
}
export default Rom