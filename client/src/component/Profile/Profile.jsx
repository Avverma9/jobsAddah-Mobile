import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isSignedIn");
    localStorage.removeItem("loggedUser");
    navigate("/");
  };
  const userProfile = localStorage.getItem("isSignedIn")
    ? JSON.parse(localStorage.getItem("loggedUser"))
    : null;

  return (
    <div>
      <h2>Welcome to Your Profile</h2>
      {userProfile && (
        <div>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          <img src={userProfile.photoURL} alt="Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
