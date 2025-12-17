import React from "react";
import "./Google.css";

import { getAuth, GoogleAuthProvider, signInWithPopup,  } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Google = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          const user = result.user;
          localStorage.setItem("isSignedIn", "true");
          localStorage.setItem("loggedUser", JSON.stringify(user));
          setTimeout(() => {
            navigate("/profile");
          }, 500);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="google-container" onClick={handleGoogleLogin}>
<p className="google-text" style={{ fontSize: '15px', marginTop: '-2px' }}>Continue With </p>

      <img
        src="https://img.icons8.com/external-those-icons-flat-those-icons/24/external-Google-logos-and-brands-those-icons-flat-those-icons.png"
        alt="Google Logo"
        className="google-logo"
      />
    </div>
  );
};

export default Google;