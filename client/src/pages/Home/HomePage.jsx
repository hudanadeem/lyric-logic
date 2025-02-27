import { useState, useEffect } from "react";
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

  return <></>;
}

export default HomePage;
