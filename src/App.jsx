import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import StartPage from "./pages/StartPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
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

// recharts is heavy — load the calculators only when their routes are visited
const CompoundPage = lazy(() => import("./pages/CompoundPage.jsx"));
const DebtPage = lazy(() => import("./pages/DebtPage.jsx"));
const MortgagePage = lazy(() => import("./pages/MortgagePage.jsx"));
const PaycheckPage = lazy(() => import("./pages/PaycheckPage.jsx"));
import XpBadge from "./components/XpBadge.jsx";
import XpToaster from "./components/XpToaster.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <XpBadge />
      <XpToaster />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
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
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/budget" element={<BudgetPage />} />
        <Route
          path="/tools/compound"
          element={
            <Suspense fallback={null}>
              <CompoundPage />
            </Suspense>
          }
        />
        <Route
          path="/tools/debt"
          element={
            <Suspense fallback={null}>
              <DebtPage />
            </Suspense>
          }
        />
        <Route
          path="/tools/mortgage"
          element={
            <Suspense fallback={null}>
              <MortgagePage />
            </Suspense>
          }
        />
        <Route
          path="/tools/paycheck"
          element={
            <Suspense fallback={null}>
              <PaycheckPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
