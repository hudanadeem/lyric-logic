import { useState, useEffect } from "react";

import PhotoCard from "../../components/PhotoCard/PhotoCard";
import axios from "axios";
import "../../App.scss";
import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
  const baseURL = import.meta.env.VITE_API_URL;
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/artists`)
      .then((response) => {
        setArtists(response.data.artists);
      })
      .catch((error) => {
        console.error("Error fetching:", error);
      });
  }, []);

  console.log(artists);

  let artistCards = <div>loading artists...</div>;
  if (artists) {
    {
      artistCards = artists.map((a) => (
        <Link to="/quiz" state={{ a }}>
          <PhotoCard image={a.photo} name={a.name} />
        </Link>
      ));
    }
  }

  return (
    <>
      <h1 className="home__header">Are you a real fan?</h1>
      <p className="home__desc">
        Click on an artist and guess whether the songs that appear are real or
        fake. You have 10 guesses. Good luck!
      </p>
      <div className="home__artists">{artistCards}</div>
    </>
  );
}

export default HomePage;
