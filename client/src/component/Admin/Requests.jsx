import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaPrayingHands } from "react-icons/fa";
import './Requests.css';

const Requests = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://youtube-bbrv.onrender.com/get/req");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="request-container">
      {data.map((e) => (
        <div key={e._id} className="request-item">
          <div className="icon">
            <FaUser />
          </div>
          <p>{e.name}</p>
          <div className="icon">
            <FaPrayingHands />
          </div>
          <p>{e.requests}</p>
        </div>
      ))}
    </div>
  );
};

export default Requests;
