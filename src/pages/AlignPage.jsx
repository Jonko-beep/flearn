import { useState } from "react";
import { Link } from "react-router-dom";
import QuizIntro from "../components/QuizIntro.jsx";
import QuizFlow from "../components/QuizFlow.jsx";
import QuizResults from "../components/QuizResults.jsx";
import {
  scoreQuiz,
  loadStoredResult,
  saveResult,
  clearStoredResult,
} from "../lib/alignQuiz.js";

// The "Who Do I Align With?" tab. Returning users land straight on their
// stored match (with a retake option); a cold start goes intro → flow →
// results. Retaking clears storage and restarts from the intro.
export default function AlignPage() {
  const [stored] = useState(loadStoredResult);
  const [phase, setPhase] = useState(stored ? "results" : "intro");
  const [result, setResult] = useState(stored?.result ?? null);

  const handleComplete = (answers) => {
    const scored = scoreQuiz(answers);
    saveResult(answers, scored);
    setResult(scored);
    setPhase("results");
  };

  const handleRetake = () => {
    clearStoredResult();
    setResult(null);
    setPhase("intro");
  };

  return (
    <div className="min-h-screen p-8 max-md:p-5">
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/learn"
          className="mb-8 inline-block text-sm text-ink-muted transition-colors hover:text-ink-secondary"
        >
          ← Back to learning
        </Link>

        {phase === "intro" && <QuizIntro onStart={() => setPhase("quiz")} />}
        {phase === "quiz" && <QuizFlow onComplete={handleComplete} />}
        {phase === "results" && result && (
          <QuizResults result={result} onRetake={handleRetake} />
        )}
      </div>
    </div>
  );
}
