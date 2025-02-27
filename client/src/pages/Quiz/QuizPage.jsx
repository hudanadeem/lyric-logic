import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PhotoCard from "../../components/PhotoCard/PhotoCard";
import "./QuizPage.scss";

function QuizPage() {
  const location = useLocation();
  const artist = location.state?.a;

  if (!artist) return <p>Error: No artist selected</p>;

  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const allSongs = [
      ...artist.real_songs.map((song) => ({ song, isReal: true })),
      ...artist.fake_songs.map((song) => ({ song, isReal: false })),
    ];
    setShuffledSongs(allSongs.sort(() => Math.random() - 0.5).slice(0, 10));
  }, [artist]);

  const handleAnswer = (song, isReal) => {
    setSelectedAnswers((prev) => ({ ...prev, [song]: isReal }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    shuffledSongs.forEach(({ song, isReal }) => {
      if (selectedAnswers[song] === isReal) {
        correctCount++;
      }
    });
    setScore(correctCount);
  };

  return (
    <div className="quiz">
      <div className="quiz__left">
        {shuffledSongs.map(({ song }) => (
          <div key={song} className="quiz__question">
            <p>{song}</p>
            <div className="quiz__buttons">
              <button
                className={selectedAnswers[song] === true ? "selected" : ""}
                onClick={() => handleAnswer(song, true)}
              >
                Real
              </button>
              <button
                className={selectedAnswers[song] === false ? "selected" : ""}
                onClick={() => handleAnswer(song, false)}
              >
                Fake
              </button>
            </div>
          </div>
        ))}

        <button className="quiz__submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <div className="quiz__right">
        <h2 className="quiz__artist-name">{artist.name}</h2>
          <PhotoCard image={artist.photo} />
        <h3 className="quiz__score">
          Your Score: {score === null ? "?/10" : `${score}/10`}
        </h3>
      </div>
    </div>
  );
}

export default QuizPage;
