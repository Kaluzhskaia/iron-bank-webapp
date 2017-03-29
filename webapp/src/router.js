/**
 * Created by Mikhail Falaleev on 23.03.2017.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';




// Layouts
import MainLayout from './components/MainLayout';

//Components
import LoanRequest from './components/LoanRequest'
import LoginForm from './components/LoginForm'
import LoginPage from './components/LoginPage'
import RegistrationForm from './components/RegistrationForm'

export default (
    <Router history={browserHistory}>
        <Route  component={MainLayout}>
            <Route path = "/" component={LoanRequest}/>
        </Route>
        <Route component={LoginPage}>
            <Route path="login" component={LoginForm}/>
            <Route path="registration" component={RegistrationForm}/>
        </Route>
    </Router>
);