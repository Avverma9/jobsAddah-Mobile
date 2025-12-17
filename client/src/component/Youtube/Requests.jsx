import React,{useState} from 'react'
import axios from 'axios'
import './Requests.css'
const Requests=()=>{
    const [name,setName]=useState("")
    const [requests,setRequests]=useState("")

    const handleSubmit=async (e)=>{
        e.preventDefault()
        
        const response=await axios.post("https://youtube-bbrv.onrender.com/create/req",{
            name,
            requests
        })
        if (response.data){
            alert("data has been sent")
        }
    }
    return (
        <div className='container-home'>
            <h1>Request to Rom4U</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder='Enter Your name' onChange={(e)=>setName(e.target.value)} />
                <input type="text" value={requests} placeholder='Now you can request here ! ...' onChange={(e)=> setRequests(e.target.value)} />
            <br />
            <div><button type='submit'>Submit</button></div>
            </form>
        </div>
    )
}
export default Requests
