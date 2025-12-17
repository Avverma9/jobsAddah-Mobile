import React,{useEffect, useState} from "react";
import {AiOutlineCloudDownload} from 'react-icons/ai';
import axios from 'axios'
import './rom.css'
import './Loading.css'
const Rom=()=>{
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(true)
useEffect(()=>{
   
    axios.get("https://youtube-bbrv.onrender.com/get/rom")
    .then(response=>response.data)
    .then(data=>{setData(data)
    setIsLoading(false)})
    .catch(error=>console.error(error))
    

 
},[])
if (isLoading) {
    return <div className='loading-screen'><img src="https://31.media.tumblr.com/a8c4b4c688fb6a4350a81e57fabadee2/tumblr_n24umuPm3E1st3reyo1_500.gif" alt="Loading" />;
    <p>Tumhare ROM ka link raste me hai friend</p></div>
  }
  return(
    <div className="all-item">
        {data.map((index)=>(
            <div className="name" key={index._id}>
                <p>{index.name}</p> 
                <a href={index.link} target="_blank" rel="noopener noreferrer">
          <div className='download'>
             <AiOutlineCloudDownload className='download'/> Download</div>
            </a>
                </div>
        ))}
    </div>
  )
}
export default Rom