import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './mi11x.css';

const Mi11X = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [device , setDevice] = useState("")
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('images', imageFile);
      formData.append('device',device)
      formData.append('date', date);
      formData.append('description', description);
      formData.append('videoUrl', videoUrl);
      // const response = await axios.post('https://youtube-pn9u.onrender.com/video', formData);//recent video
      const response = await axios.post('https://youtube-bbrv.onrender.com/mi11x/create', formData); // mi11x post
      
      // const response = await axios.post('https://youtube-pn9u.onrender.com/mi11t/create', formData);
      if (response.status === 200) {
        console.log('Data successfully sent to the backend!');
        window.location.reload()
      } else {
        console.error('Failed to send data to the backend.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  if (location.pathname !== '/av') {
    return null;
  }

  return (
    <div className='container-home'>
      <h1>Mi 11X</h1>

      <form onSubmit={handleSubmit}>
        <label>
       
          <input type='text' value={title} placeholder='Video Title' onChange={(e) => setTitle(e.target.value)} />
        </label>
        
        <label>
          <input type='file' accept='image/*' placeholder='Thumbnail' onChange={handleFileChange} />
        </label>
      
        <label>
         
          <input type='text' value={device} placeholder='Device' onChange={(e)=> setDevice(e.target.value)} />
        </label>
      
        <label>
          <input type='text' value={date} placeholder='Publish date' onChange={(e) => setDate(e.target.value)} />
        </label>
    
        <label>
          <input type='text' value={description} placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
        </label>
  
        <label>
          <input type='text' value={videoUrl} placeholder='Enter URL' onChange={(e) => setVideoUrl(e.target.value)} />
        </label>
    
        <div className='admin-submit'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Mi11X;
