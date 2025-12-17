import React from "react";
import "./LandingPage.css";
const LandingPage = () => {
  const handleExplore = () => {
    window.location.href =
      "https://youtube.com/playlist?list=PL_YiqYbfzwBAmiBVe07XF32XEcqx5usOA";
  };
  const handleExploreDaily = () => {
    window.location.href =
      "https://youtube.com/playlist?list=PL_YiqYbfzwBBTveHR_-CI1mWCK6dESiHp";
  };
  return (
    <div className="landing-page">
      <header className="headerpage">
        <h1 data-text="Welcome to ROM4U !" className="welcome-text">
          Welcome to ROM4U !
        </h1>
        <p>Discover tools, Gaming roms, Flashing files</p>
      </header>
      <div className="landing-container">
      <div className="landing-image">
     
        <img
          src="https://assets-global.website-files.com/5bf603f84ae3421204807d40/60a54c95bf6a073eea0c69e9_Robot_waving_transparent_GIF.gif"
          alt="avverma"
         
        />
      
       
      
      </div>
      <div className="landing-info">
      <p> Welcome to ROM4U - Your Ultimate Gaming ROM Review Channel! <br />
       At ROM4U,
          we are dedicated to providing you with in-depth reviews of <br />
           gaming ROMs
          for various devices. Whether you are a seasoned gamer <br />or a tech
          enthusiast, our channel offers an extensive collection of tools, <br /> ROM
          download links, and captivating review videos that will take <br /> your
          gaming experience to the next level.<br /> Explore our repository of the
          latest gaming ROMs<br /> for different devices, handpicked and thoroughly
          tested <br /> With our comprehensive reviews, you can
          make informed decisions <br /> about the best ROMs tailored to your
          preferences.<br /> Join our vibrant community of gamers as we embark on a
          journey of <br /> discovering the most  exciting gaming ROMs and cool stuff
          for your devices. <br /> Subscribe now to stay updated with the latest
          content <br /> and unlock a world of endless gaming possibilities! <br /> Game on,
          and let's dive into the thrilling world of <br /> gaming ROMs together!</p>
      </div></div>
      <section className="features">
        <div className="feature">
          <h2>Gaming Rom</h2>
          <img
            src="https://cdn.dribbble.com/users/1646023/screenshots/6625629/gamer_800x600.gif"
            alt=""
          />
          <p>
            There is advanced gaming rom collection for Your MIUI devices that
            is adaptive to play intense fight with zero lag
          </p>
          <button type="button" onClick={handleExplore}>
            {" "}
            Explore now
          </button>
        </div>
        <div className="feature">
          <h2>Battery Saver & Daily driver Rom</h2>
          <img
            src="https://i.pinimg.com/originals/c6/f4/85/c6f485b8548e70e4bbfe028a2a38e248.gif"
            alt=""
          />
          <p>
            For Your MIUI device there are also battery saver ROM that will
            extend your battery life
          </p>
          <button type="button" onClick={handleExplore}>
            {" "}
            Explore now
          </button>
        </div>
        <div className="feature">
          <h2>Most Wanted Rom</h2>
          <img
            src="https://www.appdev360.com/wp-content/uploads/2021/02/gif-app-development-on-android.gif"
            alt=""
          />
          <p>
            Now here are Most wanted ROM means these roms are capable for games,
            daily driver, battery saver{" "}
          </p>
          <button type="button" onClick={handleExploreDaily}>
            Explore now
          </button>
        </div>
      </section>

      <footer className="footer">
        <p>Contact us at: av95766@gmail.com</p>
      </footer>
    </div>
  );
};

export default LandingPage;
