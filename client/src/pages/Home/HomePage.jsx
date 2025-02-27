import { useState, useEffect } from "react";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import axios from "axios";

import "./HomePage.scss";
function HomePage() {
  const baseURL = import.meta.env.VITE_API_URL;

  const [artist, setArtist] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/artists`)
      .then((response) => {
        setArtist(response.data.artists);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  console.log(artist);

  let artistCards = <div>loading artists...</div>;
  if (artist) {
    {
      artistCards = artist.map((a) => (
        <PhotoCard image={a.photo} name={a.name} />
      ));
    }
  }

  return (
    <>
      <h1>Are you a real fan?</h1>
      <p>
        Click on an artist and guess whether the songs that appear are real or
        fake. You have 10 guesses. Good luck!
      </p>
      {artistCards}
    </>
  );
}

export default HomePage;
