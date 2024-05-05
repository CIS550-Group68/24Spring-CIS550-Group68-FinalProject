import React from "react";
import "./App.css";
import HomePage from "./pages/Homepage";
import PaperPage from "./pages/Paperpage";
import AuthorPage from "./pages/Authorpage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Resultpage from "./pages/Resultpage";
import ResponsiveAppBar from "./pages/ResponsiveAppBar";
import AuthorPage2 from "./pages/Authorpage2";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/paper/:paperId" element={<PaperPage />} />
          <Route path="/author/:authorId" element={<AuthorPage2 />} />
          <Route path="/search/:authorSearchWord" element={<Resultpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
