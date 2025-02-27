import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import QuizPage from "./pages/Quiz/QuizPage";
import ScorePage from "./pages/Score/ScorePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
