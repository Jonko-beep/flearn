import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import StartPage from "./pages/StartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import LessonListPage from "./pages/LessonListPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
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
        <Route path="/learn" element={<CategoryPage />} />
        <Route path="/learn/:categoryId" element={<LessonListPage />} />
        <Route path="/learn/:categoryId/:lessonId" element={<LessonPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/tools/budget" element={<BudgetPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
