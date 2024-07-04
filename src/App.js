import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  let apiKey = process.env.REACT_APP_API_URL;
  const [progress, setProgress] = useState(0);

  const handleSetProgress = (prog) => {
    setProgress(prog);
  };

  return (
    <div> 
      <Router>
        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="general" pageSize={20} country="in" category="general"/>} />
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="business" pageSize={20} country="in" category="business"/>} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="entertainment" pageSize={20} country="in" category="entertainment"/>} />
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="health" pageSize={20} country="in" category="health"/>} />
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="science" pageSize={20} country="in" category="science"/>} />
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="sports" pageSize={20} country="in" category="sports"/>} />
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={handleSetProgress} key="technology" pageSize={20} country="in" category="technology"/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
