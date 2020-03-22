import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import listEmployee from './components/listEmployee'
import ListEquipment from './components/listEquipment'
import User from  './components/user'

import Add from './components/add/addUser';
import Login from './components/login/Login';
import GetUser from './components/views/viewUser';

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/list-employee" component={listEmployee} />
        <Route exact path="/list-equipment" component={ListEquipment} />
        <Route path="/user" component={User} />
        <Route path="/add-user" component={Add} />
        <Route path="/get-user" component={GetUser} />
        <Route path="/login" component={Login} />
      </div>
      
    </Router>
    
  );
}

export default App;
