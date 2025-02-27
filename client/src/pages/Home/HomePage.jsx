import { useState, useEffect } from "react";
import axios from "axios";
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
        console.error("Error fetching artists:", error);
      });
  }, []);

  return (
    <div >
      {artists.map((artist) => (
        <div key={artist.name} >
          <Link to="/quiz" state={{ artist }} >
            <img src={artist.photo} alt={artist.name} />
          </Link>
          <h2>{artist.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
