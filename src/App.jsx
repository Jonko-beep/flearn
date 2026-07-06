import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import StartPage from "./pages/StartPage.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import LessonListPage from "./pages/LessonListPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import BudgetPage from "./pages/BudgetPage.jsx";
import ToolsPage from "./pages/ToolsPage.jsx";

// recharts is heavy — load the visualizer only when the route is visited
const CompoundPage = lazy(() => import("./pages/CompoundPage.jsx"));
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
        <Route path="/learn/:categoryId/:lessonId" element={<LessonPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
