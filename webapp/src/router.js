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

export default (
    <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
            <IndexRoute component={LoanRequest}/>
        </Route>
    </Router>
);