/**
 * Created by Mikhail Falaleev on 17.01.2017.
 */
import React from 'react';

import ManagerLoanRequests from './ManagerLoanRequests'


const ManagerHome = React.createClass({
    getInitialState: function() {
        return {
        }
    },

    render: function () {
        return (
            <ManagerLoanRequests/>
        );
    }
});

export default ManagerHome;