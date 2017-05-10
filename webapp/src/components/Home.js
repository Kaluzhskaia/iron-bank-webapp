/**
 * Created by Mikhail Falaleev on 17.04.2017.
 */
import React from 'react';
import {ROLES} from "../constants";
import LoanRequestForm from './LoanRequestForm';
import AdminHome from './AdminHome';
import CollectorHome from './CollectorHome';
import ManagerLoanRequests from './ManagerLoanRequests';

var roles = [];

const Home = React.createClass({

    render: function () {

        roles = localStorage.getItem(ROLES);

        if (roles) {
            if (roles.includes("ROLE_ADMIN"))
                return <AdminHome/>;
            else if (roles.includes("ROLE_MANAGER"))
                return <ManagerLoanRequests/>;
            else if (roles.includes("ROLE_COLLECTOR"))
                return <CollectorHome/>;
            else if (roles.includes("ROLE_CLIENT"))
                return <LoanRequestForm/>;
        }
        else
                return <div>No role</div>;
    }
});

export default Home;