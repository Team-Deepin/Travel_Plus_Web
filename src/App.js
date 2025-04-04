/* App.js */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
import Content from "./components/Content";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/content" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
