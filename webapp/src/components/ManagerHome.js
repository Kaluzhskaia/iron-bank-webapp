/**
 * Created by Mikhail Falaleev on 17.01.2017.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {PATH_REGISTRATION} from "../constants";




const ManagerHome = React.createClass({
    getInitialState: function() {
        return {
        }
    },

    render: function () {
        return (
            <div className="home-page">
                Manger Home
            </div>
        );
    }
});

export default ManagerHome;