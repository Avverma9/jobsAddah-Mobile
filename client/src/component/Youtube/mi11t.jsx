import React, { useState, useEffect } from 'react';
import './mi11x.css';
import './Loading.css'
import { BsPlayCircle } from 'react-icons/bs';

const VideoMI11T = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a state to track loading

  useEffect(() => {
    fetch("https://youtube-bbrv.onrender.com/getmi11t/get")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setIsLoading(false); // Set loading state to false when data is fetched
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Set loading state to false if there's an error
      });
  }, []);

  // Check if data is still loading, show a loading image
  if (isLoading) {
    return <div className='loading-screen'><img src="https://31.media.tumblr.com/a8c4b4c688fb6a4350a81e57fabadee2/tumblr_n24umuPm3E1st3reyo1_500.gif" alt="Loading" />;
    <p>Server Connect Hone tak Chay Pee lo friend</p></div>
  }

  return (
    <>
      <div className="video-card"> {/* Added the video-card class here */}
        {data.map((video) => (
          <div key={video._id}>
            {video.images.map((image) => (
              <div className="video-image">
                <img key={image} src={image} alt="" />
              </div>
            ))}
            <div className="video-title">
              <p>{video.title}</p>
            </div>
            <div className='video-device'><p>Device: {video.device}</p></div>
            <div className="video-date">
              <p>{video.date}</p>
            </div>
            <div className="video-description">
              <p>{video.description}</p>
            </div>

            <div className="explore-button">
            <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
              <div className="watchvideo-videos">
                <BsPlayCircle className="playcircle" />
                Watch Video
              </div> </a></div>
          </div>
        ))}
      </div>
      <div className='watch-more'> <a href="https://www.youtube.com/rom4u9"> <BsPlayCircle /> Watch more</a></div>
    </>
  );
};

export default VideoMI11T;
