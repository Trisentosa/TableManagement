import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./pages/Login";
import Nav from "./components/Nav";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "./store/user-context";
import { getUser } from "./api-calls";

function App() {
  let userContext = useContext(UserContext);

  //useEffect can't directly use async hence why it looks like this
  useEffect(() => {
    (async () => {
      const response = await getUser();
      const content = await response.json();
      userContext.resetName(content.name);
    })();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={userContext.name ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
