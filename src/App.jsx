import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import AppShell from "./components/AppShell.jsx";
import XpToaster from "./components/XpToaster.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import { hasSeenIntro } from "./lib/onboarding.js";
import CategoryPage from "./pages/CategoryPage.jsx";
import LessonListPage from "./pages/LessonListPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import FinalExamPage from "./pages/FinalExamPage.jsx";
import CertificatePage from "./pages/CertificatePage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";
import GlossaryPage from "./pages/GlossaryPage.jsx";
import ReviewPage from "./pages/ReviewPage.jsx";
import AlignPage from "./pages/AlignPage.jsx";
import PhilosopherPage from "./pages/PhilosopherPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

// recharts is heavy — load the calculators only when their routes are visited
const CompoundPage = lazy(() => import("./pages/CompoundPage.jsx"));
const DebtPage = lazy(() => import("./pages/DebtPage.jsx"));
const MortgagePage = lazy(() => import("./pages/MortgagePage.jsx"));
const PaycheckPage = lazy(() => import("./pages/PaycheckPage.jsx"));
const OptionsPage = lazy(() => import("./pages/OptionsPage.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// The site's front door: a first-time visitor goes straight into the
// background questions; anyone who has answered or skipped them goes to Learn.
function FirstVisit() {
  return hasSeenIntro() ? <Navigate to="/learn" replace /> : <WelcomePage />;
}

const lazily = (Page) => (
  <Suspense fallback={null}>
    <Page />
  </Suspense>
);

export default function App() {
  return (
    <>
      <ScrollToTop />
      <XpToaster />
      <Routes>
        {/* Full-bleed screens with their own framing */}
        <Route path="/" element={<FirstVisit />} />
        <Route path="/welcome" element={<WelcomePage />} />

        {/* Everything else sits inside the navigation shell */}
        <Route element={<AppShell />}>
          <Route path="/learn" element={<CategoryPage />} />
          <Route path="/learn/:categoryId" element={<LessonListPage />} />
          <Route path="/learn/:categoryId/final" element={<FinalExamPage />} />
          <Route path="/learn/:categoryId/certificate" element={<CertificatePage />} />
          <Route path="/learn/:categoryId/:lessonId" element={<LessonPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/align" element={<AlignPage />} />
          <Route path="/align/:slug" element={<PhilosopherPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/budget" element={<BudgetPage />} />
          <Route path="/tools/compound" element={lazily(CompoundPage)} />
          <Route path="/tools/debt" element={lazily(DebtPage)} />
          <Route path="/tools/mortgage" element={lazily(MortgagePage)} />
          <Route path="/tools/paycheck" element={lazily(PaycheckPage)} />
          <Route path="/tools/options" element={lazily(OptionsPage)} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
