import React from "react";

// css
import "./App.css";

// components
import EmailList from "./components/EmailList";
import EmailBody from "./components/EmailBody";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmailList />} />
        <Route
          path="/email-body/:id/:subject/:name/:date"
          element={<EmailBody />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
