/**
 * Created by Mikhail Falaleev on 05.12.2016.
 */
import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {PATH_AUTH} from '../constants.js';

const RegSuccess = React.createClass({


    render: function () {
        return(
        <div className="registration-form">
            <div className="label">Регистрация</div>
            <Paper zDepth={2}>
                <div className="labelRegSuccess">Пользователь, зарегестрирован</div>
                <Link to="/login">
                    <RaisedButton
                        primary={true}
                        style={{width: '400px', float: 'left'}}
                        label="Войти"
                    />
                </Link>
            </Paper>
        </div>
        )},
});

export default RegSuccess;
