import React,{useState} from "react";
import axios from 'axios'

const Recent=()=>{
    
    const [title,setTitle]=useState("");
    const [images, setImages] = useState(null);
    const [date,setDate]= useState("")
    const [device,setDevice]=useState("")
    const [description,setDescription]=useState("")
    const [videoUrl,setVideoUrl]=useState("")
    
const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        const formData = new FormData()
        formData.append("title",title)
        formData.append("images",images)
        formData.append("date",date)
        formData.append("device",device)
        formData.append("description",description)
    formData.append("videoUrl",videoUrl)

    const response =await axios.post("https://youtube-bbrv.onrender.com/video",formData)
    if(response.data){
        window.location.reload()
    } else{
        console.log("it seems an error");
    }
    } catch (error) {
        console.error(error);
    }
   
}
    const handleFileChange= (e) =>{
        const file=e.target.files[0]
        setImages(file)
    }
     return(
        <div className="container-home">
            <form onSubmit={handleSubmit}>
               
                <input type="text" value={title} placeholder="Video title" onChange={(e)=> setTitle(e.target.value)} />
                <input type="text" value={date} placeholder="Publish date" onChange={(e)=> setDate(e.target.value)} />
                <input type="text" value={description} placeholder="Description" onChange={(e)=> setDescription(e.target.value)} />
                <input type="text" value={device} placeholder="Device name" onChange={(e)=> setDevice(e.target.value)} />
                <input type="text" value={videoUrl} placeholder="Enter Video URL" onChange={(e)=> setVideoUrl(e.target.value)} />
                 <input type="file" accept="image/*" placeholder="Thumbnail" onChange={handleFileChange}/>
                 <br />
                 <div>
                    <button type="submit">Submit</button>
                 </div>
            </form>
        </div>
    )
}
export default Recent;