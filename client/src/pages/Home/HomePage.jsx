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
        setArtist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
      });
  }, []);

  console.log(artist);

  return (
    <>
      <h1>Are you a real fan?</h1>
      <p>
        Pick an artist and guess whether the songs are real or fake. You have 10
        guesses. Good luck!
      </p>
      <PhotoCard image="https://crouton.net/crouton.png" name="Crouton" />
      <button>Start Quiz</button>
    </>
  );
}

export default HomePage;
