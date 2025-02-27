import express from "express";
import cors from "cors";
import "dotenv/config";
import fs from "node:fs";
import path from "path";

const FILE_PATH_ARTISTS = "./data/artists.json";
const app = express();
const { CORS_ORIGIN } = process.env;
const port = process.env.PORT || process.argv[2] || 8080;

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.use("/photos", express.static(path.join(process.cwd(), "public/photos")));

const artistsFile = fs.readFileSync(FILE_PATH_ARTISTS);
const artists = JSON.parse(artistsFile);

app.get("/artists", (req, res) => {
  //fixing the URL
  const updatedArtists = artists.artists.map((artist) => ({
    ...artist,
    photo: `${req.protocol}://${req.get("host")}${artist.photo}`,
  }));

  res.json({ artists: updatedArtists });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
