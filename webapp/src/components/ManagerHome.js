/**
 * Created by Mikhail Falaleev on 17.01.2017.
 */
import React from 'react';

import RequestGrid from './RequestsGrid'




const ManagerHome = React.createClass({
    getInitialState: function() {
        return {
        }
    },

    render: function () {
        return (
            <RequestGrid/>
        );
    }
});

export default ManagerHome;