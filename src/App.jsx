import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import StartPage from "./pages/StartPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import LessonListPage from "./pages/LessonListPage.jsx";
import LessonPage from "./pages/LessonPage.jsx";

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
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/learn" element={<CategoryPage />} />
        <Route path="/learn/:categoryId" element={<LessonListPage />} />
        <Route path="/learn/:categoryId/:lessonId" element={<LessonPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
