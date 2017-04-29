/**
 * Created by Mikhail Falaleev on 17.04.2017.
 */
import React from 'react';
import {ROLES} from "../constants";
import LoanRequest from './LoanRequest';
import ManagerHome from './ManagerHome';
import AdminHome from './AdminHome';
import CollectorHome from './CollectorHome';
import RegSurveyFields from './RegSurveyFields';

var roles = [];

const Home = React.createClass({

    render: function () {

        roles = localStorage.getItem(ROLES);

        if (roles)
            if (roles.includes("ROLE_ADMIN"))
                return <AdminHome/>;
            else if (roles.includes("ROLE_MANAGER"))
                return <ManagerHome/>;
            else if (roles.includes("ROLE_COLLECTOR"))
                return <CollectorHome/>;
            else if (roles.includes("ROLE_CLIENT"))
                return <LoanRequest/>;
            else
                return <div>Can not identify user authorities</div>
    }
});

export default Home;