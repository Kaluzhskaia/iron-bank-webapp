/**
 * Created by Mikhail Falaleev on 23.03.2017.
 */
import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './components/MainLayout';

//Components
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import LoginPage from './components/LoginPage'
import RegistrationForm from './components/RegistrationForm'
import ClientLoanRequests from './components/ClientLoanRequests'
import ManagerCollector from './components/ManagerCollector'
import ClientLoans from './components/ClientLoans'
import ManagerLoans from './components/ManagerLoans'

export default (
    <Router history={browserHistory}>
        <Route  component={MainLayout}>
            <Route  path = "/" component={Home}/>
            <Route path = "manager-collector" component={ManagerCollector}/>
            <Route path = "my-requests" component={ClientLoanRequests}/>
            <Route path = "my-loans" component={ClientLoans}/>
            <Route path = "manager-loans" component={ManagerLoans}/>
        </Route>
        <Route component={LoginPage}>
            <Route path="login" component={LoginForm}/>
            <Route path="registration" component={RegistrationForm}/>
        </Route>
    </Router>
);