import React from "react";
import axios from "axios";
import Forum from "./pages/Forum";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Modifpost from "./pages/Modifpost";
import './app.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

function App() {
  axios.defaults.headers.common.Authorization = "Bearer " + localStorage.token
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forum />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:postId" element={<Modifpost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
