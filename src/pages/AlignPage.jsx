import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizIntro from "../components/QuizIntro.jsx";
import QuizFlow from "../components/QuizFlow.jsx";
import QuizResults from "../components/QuizResults.jsx";
import { scoreQuiz, loadStoredResult, saveResult, clearStoredResult } from "../lib/alignQuiz.js";
import { PageHeader } from "../ui/kit.jsx";
import { hue } from "../ui/theme.js";

// The "Who do I align with?" section. Returning users land straight on their
// stored match (with a retake option); a cold start goes intro → flow →
// results. Retaking clears storage and restarts from the intro. Arriving from
// the first-visit advert (router state `start`) skips the intro, since the
// advert already explained the quiz.
export default function AlignPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [stored] = useState(loadStoredResult);
  const [phase, setPhase] = useState(() =>
    location.state?.start && !stored ? "quiz" : stored ? "results" : "intro"
  );
  const [result, setResult] = useState(stored?.result ?? null);

  // `start` is used once: drop it from the history entry so a reload shows
  // the intro rather than reopening a half-done quiz.
  useEffect(() => {
    if (location.state?.start) navigate(location.pathname, { replace: true, state: null });
  }, [location, navigate]);

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
    <div className={phase === "results" ? "max-w-[920px]" : "max-w-[760px]"} style={hue("align")}>
      <PageHeader
        eyebrow="Money style"
        title="Who do I align with?"
        subtitle={
          phase === "results"
            ? "Your instincts, matched to a school of thought in personal finance."
            : "Find the school of thought in personal finance that fits how you actually think."
        }
      />

      {phase === "intro" && <QuizIntro onStart={() => setPhase("quiz")} />}
      {phase === "quiz" && <QuizFlow onComplete={handleComplete} />}
      {phase === "results" && result && <QuizResults result={result} onRetake={handleRetake} />}
    </div>
  );
}
