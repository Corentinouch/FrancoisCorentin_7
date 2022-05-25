import React from "react";
import Forum from "./pages/Forum";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import './app.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/forum" element={<Forum />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
