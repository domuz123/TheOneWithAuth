import React from 'react';
import {BrowserRouter, Route, Redirect, Switch  } from 'react-router-dom'
import Auth from '../src/pages/Auth'
import Bookings from '../src/pages/Bookings'
import Events from '../src/pages/Events'
import Navbar from './components/navbar/Navbar'

import './App.css';

function App() {
  return (
    <BrowserRouter> 
    <React.Fragment >
    <Navbar />
<Switch> 
    <Redirect from='/' to='/auth' exact /> 
    <Route path='/auth' component={Auth} /> 
    <Route path='/bookings' component={Bookings} /> 
    <Route path='/events' component={Events} /> 
    </Switch>
    </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
