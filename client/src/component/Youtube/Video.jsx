import React, { useState, useEffect } from 'react';
// import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
import './Video.css';
import './Loading.css'
import { BsPlayCircle } from 'react-icons/bs';
import { CiMobile1 } from 'react-icons/ci';
import { BsCalendar2Date } from 'react-icons/bs';

const VideoPage = () => {
  const [data, setData] = useState([]);
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get('https://youtube-bbrv.onrender.com/getVideo');
        setData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideoData();
  }, []);

  if (isLoading) {
    return <div className='loading-screen'><img src="https://31.media.tumblr.com/a8c4b4c688fb6a4350a81e57fabadee2/tumblr_n24umuPm3E1st3reyo1_500.gif" alt="Loading" />;
    <p>Raste me hu pahuchne wala hu friend . . . . . .</p></div>
  }


  return (
    <div className="video-card">
      {data.map((video) => (
        <div className="video-cards" key={video._id}>
          {video.images.map((image) => (
            <div className="video-image" key={image}>
              <img src={image} alt="" />
            </div>
          ))}
          <div className="video-title">
            <p>{video.title}</p>
          </div>
          <div className="video-device">
            <p>
              <CiMobile1 /> Device: {video.device}
            </p>
          </div>
          <div className="video-date">
            <p>
              <BsCalendar2Date />
              {video.date}
            </p>
          </div>
          <div className="video-description">
            <p>{video.description}</p>
          </div>
          <div className="explore-button">
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              <div className="watchvideo-videos">
                <BsPlayCircle className="playcircle" />
                Watch Video
              </div> </a>
              {/* <div>
                <button className="delete-button" onClick={() => handleDelete(video._id)}>
                  <RiDeleteBinLine />
                </button>
              </div> */}
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;
