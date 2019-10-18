import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Redirect } from "react-router-dom";
import BubblePage from './components/BubblePage';
import ColorList from './components/ColorList';

import Login from "./components/Login";
import "./styles.scss";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <NavLink to='/bubble'>Bubble</NavLink>
        
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Route
          exact
          path='/bubble'
          render={props => {
            if (localStorage.getItem('token')) {
              return <BubblePage {...props} />
            }
            return <Redirect to='/' />
          }}
        />
        
      </div>
    </Router>
  );
}

export default App;
