import './App.css';

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
export default class App extends Component {
  static propTypes = {

  }
  render() {
    return (
      <div> 
      <Router>
        <NavBar/>
          <Routes>
          <Route exact path="/" element={  <News key="general" pageSize={20} country="in" category="general"/> } />
          <Route exact path="/business" element={<News key="business" pageSize={20} country="in" category="business"/> } />
          <Route exact path="/entertainment" element={<News key="entertainment" pageSize={20} country="in" category="entertainment"/> } />
          <Route exact path="/health" element={<News key="health" pageSize={20} country="in" category="health"/> } />
          <Route exact path="/science" element={<News key="science" pageSize={20} country="in" category="science"/> } />
          <Route exact path="/sports" element={<News key="sports" pageSize={20} country="in" category="sports"/> } />
          <Route exact path="/technology" element={<News key="technology" pageSize={20} country="in" category="technology"/> } />
          </Routes>
      </Router>
      </div>
    )
  }
}