import React from 'react';
import { FaFacebookF, FaTwitter,  FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="bg-light text-center text-white">
    
      <div className="container p-4 pb-0">
      
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: '#3b5998' }}
            href="https://www.facebook.com/Ankit.verma95766/"
            role="button"
          >
            <FaFacebookF />
          </a>

          {/* Twitter */}
          <a
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: '#55acee' }}
            href="https://twitter.com/Its_Avverma"
            role="button"
          >
            <FaTwitter />
          </a>

          {/* Instagram */}
          <a
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: '#ac2bac' }}
            href="https://www.instagram.com/its_avverma/"
            role="button"
          >
            <FaInstagram />
          </a>

          {/* Linkedin */}
          <a
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: '#0082ca' }}
            href="https://www.linkedin.com/in/avverma9/"
            role="button"
          >
            <FaLinkedinIn />
          </a>

          {/* Github */}
          <a
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: '#333333' }}
            href="https://github.com/Avverma9"
            role="button"
          >
            <FaGithub />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright <br />
        <a className="text-black"  href="https://R0m4u.vercel.app/">
          ROM4U
        </a>
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
