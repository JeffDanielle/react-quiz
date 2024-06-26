import { useEffect } from "react";
import { useQuiz } from "../Context/QuizContext";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}
