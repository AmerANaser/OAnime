import React from "react";
import { useGlobalContext } from "../context/global";
import Popular from "./Popular";
import logo from "./images/images-removebg-preview.png";
import Airing from "./Airing";
import "./Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faFire, faTv } from "@fortawesome/free-solid-svg-icons";
import LandingPage from "./LandingPage"
function Homepage() {
  const {
    handleSubmit,
    search,
    // searchAnime,
    handleChange,
    getLandingPage,
    getAiringAnime,
    getPopularAnime,
  } = useGlobalContext();

  const [rendered, setRendered] = React.useState("LandingPage");

  const switchComponent = () => {
    switch (rendered) {
      case "popular":
        return <Popular rendered={rendered} />;
      case "airing":
        return <Airing rendered={rendered} />;
      case "LandingPage":
        return <LandingPage rendered={rendered} />;
      default:
        return <LandingPage rendered={rendered} />;
    }
  };

  return (
    <>
      <header>
        <div class="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="mid-container">
          <div className="filter-btn upcoming-filter">
            <button
              className="Allbutton"
              onClick={() => {
                setRendered("LandingPage");
              }}
            >
              <FontAwesomeIcon icon={faUsers} />
              <span> community</span>
            </button>
          </div>

          <div className="filter-btn popular-filter">
            <button
              className="Allbutton"
              onClick={() => {
                setRendered("popular");
                getPopularAnime();
              }}
            >
              <FontAwesomeIcon icon={faFire} />
              <span>Popular</span>
            </button>
          </div>

          <div className="filter-btn airing-filter">
            <button
              className="Allbutton"
              onClick={() => {
                setRendered("airing");
                getAiringAnime();
              }}
            >
              <FontAwesomeIcon icon={faTv} />
              <span>Airing</span>
            </button>
          </div>

          {/* <form action="" className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search Anime"
              value={search}
              onChange={handleChange}
            />
            <button type="submit" id="dis">
              Search
            </button>
          </form> */}
        </div>

        <button class=" logout1">logout </button>
      </header>
      {switchComponent()}
    </>
  );
}

export default Homepage;

//   {
//     /* <div className="logo">
//                     <h1>
//                     {rendered === "popular"
//                         ? "Popular Anime"
//                         : rendered === "airing"
//                         ? "Airing Anime"
//                         : "Upcoming Anime"}
//                     </h1>
//                 </div> */
//   }
