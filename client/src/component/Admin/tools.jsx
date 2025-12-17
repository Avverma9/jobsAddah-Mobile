import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './tools.css'
const Tools = () => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = ((e) => {
        e.preventDefault();
            const response = axios.post("https://youtube-bbrv.onrender.com/tool/post",{
                name,
                link
            });
            if (response.ok) {
                window.location.reload()
            } 
    })
if(location.pathname !== "/av"){
    return null
}
    return (
        <div className="container-home">
            <h1>Tools</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input type="text" value={link} placeholder="Link" onChange={(e) => setLink(e.target.value)} />
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Tools;
