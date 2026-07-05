import { useState, useRef } from "react";

// ── Simulated lesson data ──
const LESSON = {
  id: "hysa",
  category: "Saving & Budgeting",
  categoryColor: "#7C3AED",
  title: "High-Yield Savings Accounts",
  subtitle: "Make your savings actually earn something",
  duration: "10 min",
  mascot: { name: "Benjamin the Bear", emoji: "🐻" },
  // In production, replace with your actual YouTube/Vimeo embed URL
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  transcript: [
    { time: "0:00", text: "Welcome to this lesson on high-yield savings accounts, or HYSAs. If your money is sitting in a regular bank savings account earning 0.01% interest, you're essentially losing money to inflation every single day." },
    { time: "0:18", text: "So what exactly is a HYSA? It's a savings account — usually at an online bank — that pays significantly higher interest rates than traditional banks. While your local bank might offer 0.01 to 0.05% APY, high-yield savings accounts currently offer around 4 to 5% APY." },
    { time: "0:38", text: "Let's do the math. If you have $5,000 in a regular savings account at 0.05% APY, you earn just $2.50 per year. That same $5,000 in a HYSA at 4.5% APY earns you $225 per year. That's free money for doing basically nothing different." },
    { time: "1:02", text: "Where can you open one? Online banks like Marcus by Goldman Sachs, Ally, or Capital One offer competitive HYSA rates. They're FDIC insured up to $250,000 — meaning your money is just as safe as at any traditional bank." },
    { time: "1:22", text: "What should you keep in a HYSA? Your emergency fund — that's 3 to 6 months of expenses. Short-term savings goals like a car, vacation, or moving costs. And any money you'll need within 1 to 2 years." },
    { time: "1:40", text: "What should you NOT keep there? Long-term investments. Over 2 or more years, the stock market historically outperforms savings rates. And money you need daily — keep that in checking for easy access." },
    { time: "1:55", text: "Remember: a HYSA is not an investment strategy. It's a foundation. Get your emergency fund set, then focus on investing for real growth. That's the smart order of operations." },
  ],
  quiz: [
    {
      id: 1,
      question: "What is the main advantage of a HYSA over a regular savings account?",
      options: [
        "It allows unlimited withdrawals",
        "It offers significantly higher interest rates",
        "It provides better physical branch access",
        "It has no minimum balance requirements",
      ],
      correct: 1,
      explanation: "HYSAs offer interest rates of 4-5% APY compared to 0.01-0.05% at traditional banks — that's the core advantage.",
    },
    {
      id: 2,
      question: "How much would $5,000 earn in one year in a HYSA at 4.5% APY?",
      options: ["$2.50", "$45", "$225", "$450"],
      correct: 2,
      explanation: "$5,000 × 4.5% = $225 per year. Compare that to just $2.50 at a traditional bank's 0.05% rate.",
    },
    {
      id: 3,
      question: "What does FDIC insurance protect?",
      options: [
        "Your investments against market losses",
        "Your deposits up to $250,000 if the bank fails",
        "Your interest rate from changing",
        "Your account from overdraft fees",
      ],
      correct: 1,
      explanation: "FDIC insurance guarantees your deposits up to $250,000 per depositor, per bank — so your money in a HYSA is just as safe as in a traditional bank.",
    },
    {
      id: 4,
      question: "Which of the following should you NOT keep in a HYSA?",
      options: [
        "Your emergency fund",
        "Money for a car you're buying next year",
        "Long-term retirement investments",
        "Savings for a move in 6 months",
      ],
      correct: 2,
      explanation: "Long-term investments (2+ years) should be in the stock market, which historically outperforms savings rates. HYSAs are for short-term needs and emergency funds.",
    },
    {
      id: 5,
      question: "What is a HYSA best described as?",
      options: [
        "An aggressive investment strategy",
        "A replacement for a checking account",
        "A financial foundation before investing",
        "A long-term wealth building tool",
      ],
      correct: 2,
      explanation: "A HYSA is a foundation — a safe place for your emergency fund and short-term savings. Once that's set, you focus on investing for real growth.",
    },
    {
      id: 6,
      question: "Why do online banks typically offer higher HYSA rates than traditional banks?",
      options: [
        "They're riskier and less regulated",
        "They have lower overhead costs without physical branches",
        "They aren't FDIC insured",
        "They require higher minimum deposits",
      ],
      correct: 1,
      explanation: "Online banks save money by not maintaining physical branch locations, and they pass those savings on to customers through higher interest rates. They're still FDIC insured and fully regulated.",
    },
    {
      id: 7,
      question: "If inflation is running at 3% and your regular savings account earns 0.05%, what's happening to your purchasing power?",
      options: [
        "It's growing slowly",
        "It's staying the same",
        "It's shrinking by roughly 2.95% per year",
        "Inflation doesn't affect savings accounts",
      ],
      correct: 2,
      explanation: "If inflation is 3% and you're earning 0.05%, your money loses about 2.95% of its purchasing power each year. A HYSA at 4.5% would actually beat inflation, preserving and slightly growing your real purchasing power.",
    },
  ],
};

const MASTERY_THRESHOLD = 0.7;

export default function InteractiveLessonDemo() {
  const [phase, setPhase] = useState("video"); // video | transcript | quiz | results
  const [showTranscript, setShowTranscript] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const quizRef = useRef(null);

  const quiz = LESSON.quiz;
  const totalQuestions = quiz.length;
  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const mastered = score >= MASTERY_THRESHOLD * 100;

  const handleSelectOption = (optionIndex) => {
    if (answers[currentQuestion] !== undefined) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === quiz[currentQuestion].correct;
    setAnswers({ ...answers, [currentQuestion]: { selected: selectedOption, correct: isCorrect } });
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      setPhase("results");
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizComplete(false);
    setPhase("quiz");
  };

  const getOptionStyle = (optionIndex) => {
    const answered = answers[currentQuestion] !== undefined;
    const isSelected = selectedOption === optionIndex;
    const isCorrect = optionIndex === quiz[currentQuestion].correct;

    let bg = "#1e293b";
    let border = isSelected && !answered ? `${LESSON.categoryColor}88` : "#334155";
    let color = "#e2e8f0";

    if (answered) {
      if (isCorrect) {
        bg = "#05966920";
        border = "#059669";
        color = "#34d399";
      } else if (isSelected && !isCorrect) {
        bg = "#dc262620";
        border = "#dc2626";
        color = "#f87171";
      } else {
        color = "#64748b";
      }
    }

    return {
      background: bg,
      border: `1px solid ${border}`,
      borderRadius: "12px",
      padding: "1rem 1.25rem",
      cursor: answered ? "default" : "pointer",
      textAlign: "left",
      fontSize: "0.92rem",
      color,
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      width: "100%",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(165deg, #0a0f1e 0%, #111827 40%, #1a1a2e 100%)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#f1f5f9",
        padding: "1.5rem",
      }}
    >
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem", animation: "fadeInDown 0.6s ease-out" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
                background: LESSON.categoryColor + "15",
                color: LESSON.categoryColor,
              }}
            >
              {LESSON.category}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
                background: "#1e293b",
                color: "#94a3b8",
              }}
            >
              {LESSON.duration}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.2rem 0.6rem",
                borderRadius: "20px",
                background: "#1e293b",
                color: "#94a3b8",
              }}
            >
              {LESSON.mascot.emoji} {LESSON.mascot.name}
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
              fontFamily: "'Georgia', serif",
              margin: "0 0 0.25rem 0",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            {LESSON.title}
          </h1>
          <p style={{ margin: 0, color: "#94a3b8", fontStyle: "italic", fontFamily: "'Georgia', serif", fontSize: "0.95rem" }}>
            {LESSON.subtitle}
          </p>
        </div>

        {/* Phase navigation tabs */}
        <div
          style={{
            display: "flex",
            gap: "0.25rem",
            marginBottom: "1.5rem",
            background: "#0f172a",
            borderRadius: "12px",
            padding: "0.25rem",
          }}
        >
          {[
            { key: "video", label: "📹 Lesson" },
            { key: "quiz", label: "📝 Quiz" },
            { key: "results", label: "🏆 Results" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                if (tab.key === "results" && !quizComplete) return;
                if (tab.key === "quiz" || tab.key === "video") setPhase(tab.key);
                if (tab.key === "results" && quizComplete) setPhase(tab.key);
              }}
              style={{
                flex: 1,
                padding: "0.6rem",
                borderRadius: "10px",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: phase === tab.key ? "600" : "400",
                background: phase === tab.key ? LESSON.categoryColor + "20" : "transparent",
                color: phase === tab.key ? LESSON.categoryColor : "#64748b",
                cursor: tab.key === "results" && !quizComplete ? "not-allowed" : "pointer",
                opacity: tab.key === "results" && !quizComplete ? 0.4 : 1,
                transition: "all 0.2s ease",
                fontFamily: "inherit",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── VIDEO PHASE ── */}
        {phase === "video" && (
          <div style={{ animation: "fadeInUp 0.5s ease-out" }}>
            {/* Video player area */}
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                borderRadius: "14px",
                overflow: "hidden",
                marginBottom: "1rem",
                background: "#000",
                position: "relative",
              }}
            >
              {LESSON.videoUrl && LESSON.videoUrl !== "https://www.youtube.com/embed/YOUR_VIDEO_ID" ? (
                <iframe
                  src={LESSON.videoUrl}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title={LESSON.title}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "0.75rem", opacity: 0.9 }}>🐻</div>
                  <div style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.25rem" }}>
                    {LESSON.title}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1rem" }}>
                    with {LESSON.mascot.name}
                  </div>
                  <p style={{ color: "#64748b", fontSize: "0.8rem", textAlign: "center", maxWidth: 300, lineHeight: 1.5 }}>
                    Replace <code style={{ background: "#0f172a", padding: "0.1rem 0.35rem", borderRadius: 4, fontSize: "0.75rem", color: LESSON.categoryColor }}>YOUR_VIDEO_ID</code> in the lesson data with your YouTube or Vimeo embed URL
                  </p>
                  <p style={{ color: "#475569", fontSize: "0.7rem", marginTop: "0.5rem" }}>YouTube: youtube.com/embed/ID  ·  Vimeo: player.vimeo.com/video/ID</p>
                </div>
              )}
            </div>

            {/* Transcript toggle */}
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              style={{
                width: "100%",
                padding: "0.85rem 1.25rem",
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: showTranscript ? "12px 12px 0 0" : "12px",
                color: "#e2e8f0",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "500",
                textAlign: "left",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
            >
              <span>📄 Lesson Transcript</span>
              <span
                style={{
                  transform: showTranscript ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  fontSize: "0.8rem",
                }}
              >
                ▼
              </span>
            </button>

            {showTranscript && (
              <div
                style={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                  padding: "1rem 1.25rem",
                  maxHeight: "320px",
                  overflowY: "auto",
                }}
              >
                {LESSON.transcript.map((entry, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "0.6rem 0",
                      borderBottom: i < LESSON.transcript.length - 1 ? "1px solid #0f172a" : "none",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#0f172a44")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span
                      style={{
                        color: LESSON.categoryColor,
                        fontSize: "0.8rem",
                        fontWeight: "600",
                        minWidth: "36px",
                        paddingTop: "2px",
                        fontFamily: "monospace",
                      }}
                    >
                      {entry.time}
                    </span>
                    <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: "1.6", color: "#cbd5e1" }}>{entry.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Start quiz CTA */}
            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "1rem" }}>
                Finished watching? Test your knowledge to master this lesson.
              </p>
              <button
                onClick={() => setPhase("quiz")}
                style={{
                  background: `linear-gradient(135deg, ${LESSON.categoryColor}, ${LESSON.categoryColor}cc)`,
                  color: "white",
                  border: "none",
                  padding: "0.9rem 2.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  fontFamily: "'Georgia', serif",
                  borderRadius: "50px",
                  cursor: "pointer",
                  boxShadow: `0 4px 20px ${LESSON.categoryColor}30`,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                Take the Quiz →
              </button>
            </div>
          </div>
        )}

        {/* ── QUIZ PHASE ── */}
        {phase === "quiz" && (
          <div ref={quizRef} style={{ animation: "fadeInUp 0.5s ease-out" }}>
            {/* Progress bar */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  {correctCount} correct so far
                </span>
              </div>
              <div style={{ height: "4px", background: "#0f172a", borderRadius: "2px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${((currentQuestion + (answers[currentQuestion] !== undefined ? 1 : 0)) / totalQuestions) * 100}%`,
                    background: `linear-gradient(90deg, ${LESSON.categoryColor}, #0D9488)`,
                    borderRadius: "2px",
                    transition: "width 0.4s ease",
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <div
              style={{
                background: "#1e293b",
                borderRadius: "16px",
                padding: "1.5rem",
                marginBottom: "1rem",
                border: "1px solid #334155",
              }}
            >
              <h3 style={{ margin: "0 0 1.25rem 0", fontSize: "1.05rem", fontWeight: "600", lineHeight: "1.5" }}>
                {quiz[currentQuestion].question}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {quiz[currentQuestion].options.map((option, i) => {
                  const answered = answers[currentQuestion] !== undefined;
                  const isCorrect = i === quiz[currentQuestion].correct;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(i)}
                      style={getOptionStyle(i)}
                      onMouseEnter={(e) => {
                        if (!answered && selectedOption !== i) {
                          e.currentTarget.style.borderColor = "#475569";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!answered && selectedOption !== i) {
                          e.currentTarget.style.borderColor = "#334155";
                        }
                      }}
                    >
                      <span
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          flexShrink: 0,
                          background: answered
                            ? isCorrect
                              ? "#059669"
                              : selectedOption === i
                              ? "#dc2626"
                              : "#0f172a"
                            : selectedOption === i
                            ? LESSON.categoryColor
                            : "#0f172a",
                          color: answered
                            ? isCorrect || selectedOption === i
                              ? "white"
                              : "#64748b"
                            : selectedOption === i
                            ? "white"
                            : "#64748b",
                        }}
                      >
                        {answered ? (isCorrect ? "✓" : selectedOption === i ? "✗" : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1rem",
                    borderRadius: "10px",
                    background: answers[currentQuestion]?.correct ? "#05966912" : "#dc262612",
                    borderLeft: `3px solid ${answers[currentQuestion]?.correct ? "#059669" : "#dc2626"}`,
                    animation: "fadeInUp 0.3s ease-out",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      marginBottom: "0.3rem",
                      color: answers[currentQuestion]?.correct ? "#34d399" : "#f87171",
                    }}
                  >
                    {answers[currentQuestion]?.correct ? "✓ Correct!" : "✗ Not quite"}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.88rem", color: "#94a3b8", lineHeight: "1.5" }}>
                    {quiz[currentQuestion].explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Action button */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              {!answers[currentQuestion] ? (
                <button
                  onClick={handleConfirm}
                  disabled={selectedOption === null}
                  style={{
                    padding: "0.75rem 2rem",
                    borderRadius: "50px",
                    border: "none",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    cursor: selectedOption === null ? "not-allowed" : "pointer",
                    background: selectedOption === null ? "#334155" : LESSON.categoryColor,
                    color: selectedOption === null ? "#64748b" : "white",
                    transition: "all 0.2s ease",
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  style={{
                    padding: "0.75rem 2rem",
                    borderRadius: "50px",
                    border: "none",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    background: LESSON.categoryColor,
                    color: "white",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {currentQuestion < totalQuestions - 1 ? "Next Question →" : "See Results →"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ── RESULTS PHASE ── */}
        {phase === "results" && quizComplete && (
          <div style={{ animation: "fadeInUp 0.5s ease-out", textAlign: "center" }}>
            {/* Score circle */}
            <div
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                margin: "1rem auto 1.5rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: `conic-gradient(${mastered ? "#059669" : "#f59e0b"} ${score * 3.6}deg, #1e293b ${score * 3.6}deg)`,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "50%",
                  background: "#111827",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "2.5rem", fontWeight: "700", fontFamily: "'Georgia', serif" }}>{score}%</span>
                <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                  {correctCount}/{totalQuestions} correct
                </span>
              </div>
            </div>

            {/* Mastery status */}
            <div
              style={{
                padding: "1.25rem",
                borderRadius: "14px",
                background: mastered ? "#05966915" : "#f59e0b15",
                border: `1px solid ${mastered ? "#05966933" : "#f59e0b33"}`,
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{mastered ? "🎉" : "📚"}</div>
              <h3
                style={{
                  margin: "0 0 0.5rem 0",
                  fontSize: "1.2rem",
                  fontFamily: "'Georgia', serif",
                  color: mastered ? "#34d399" : "#fbbf24",
                }}
              >
                {mastered ? "Lesson Mastered!" : "Keep Learning!"}
              </h3>
              <p style={{ margin: 0, color: "#94a3b8", fontSize: "0.9rem", lineHeight: "1.5" }}>
                {mastered
                  ? `You scored ${score}% — well above the 70% mastery threshold. This lesson is now complete!`
                  : `You scored ${score}%, but you need at least 70% to master this lesson. Review the video and transcript, then try again.`}
              </p>
            </div>

            {/* Answer review */}
            <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
              <h4 style={{ fontSize: "0.95rem", color: "#94a3b8", margin: "0 0 0.75rem 0" }}>Answer Review</h4>
              {quiz.map((q, i) => {
                const answer = answers[i];
                return (
                  <div
                    key={i}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      background: "#1e293b",
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.75rem",
                      border: "1px solid #334155",
                    }}
                  >
                    <span
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        flexShrink: 0,
                        marginTop: "1px",
                        background: answer?.correct ? "#059669" : "#dc2626",
                        color: "white",
                      }}
                    >
                      {answer?.correct ? "✓" : "✗"}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.88rem", color: "#e2e8f0", lineHeight: "1.4" }}>
                        {q.question}
                      </p>
                      {!answer?.correct && (
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
                          Correct answer: {q.options[q.correct]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              {!mastered && (
                <button
                  onClick={() => setPhase("video")}
                  style={{
                    padding: "0.8rem 1.5rem",
                    borderRadius: "50px",
                    border: "1px solid #334155",
                    background: "transparent",
                    color: "#e2e8f0",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  📹 Review Lesson
                </button>
              )}
              <button
                onClick={handleRetake}
                style={{
                  padding: "0.8rem 1.5rem",
                  borderRadius: "50px",
                  border: "none",
                  background: mastered ? "#1e293b" : `linear-gradient(135deg, ${LESSON.categoryColor}, ${LESSON.categoryColor}cc)`,
                  color: mastered ? LESSON.categoryColor : "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: mastered ? "none" : `0 4px 20px ${LESSON.categoryColor}30`,
                }}
              >
                {mastered ? "Retake Quiz" : "Try Again →"}
              </button>
              {mastered && (
                <button
                  style={{
                    padding: "0.8rem 1.5rem",
                    borderRadius: "50px",
                    border: "none",
                    background: `linear-gradient(135deg, #059669, #059669cc)`,
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    boxShadow: "0 4px 20px #05966930",
                  }}
                >
                  Next Lesson →
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
