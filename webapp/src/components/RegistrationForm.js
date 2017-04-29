/**
 * Created by Mikhail Falaleev on 29.11.2016.
 */
import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {PATH_REGISTRATION} from '../constants.js';
import RegAccountFields from './RegAccountFields';
import RegSurveyFields from './RegSurveyFields';
import RegConfirmation from './RegConfirmation';
import RegSuccess from './RegSuccess';

var fieldValues = {
    username  : null,
    email     : null,
    password  : null,
    city      : null,
    birthday  : 1,
    firstName : null,
    lastName  : null,
};



const RegistrationForm = React.createClass({

    singUp: function(){
        axios.post(PATH_REGISTRATION+'/new-client',
            {
                username  : fieldValues.username,
                email     : fieldValues.email,
                password  : fieldValues.password,
                city      : fieldValues.city,
                birthday  : fieldValues.birthday,
                firstName : fieldValues.firstName,
                lastName  : fieldValues.lastName,
            })
    },

    saveValues: function(fields) {
            fieldValues = Object.assign({}, fieldValues, fields);
    },

    nextStep: function() {
        this.setState({
            step : this.state.step + 1
        })
    },

    previousStep: function() {
        this.setState({
            step : this.state.step - 1
        })
    },


    getInitialState: function() {
        return {
            step: 1
        }
    },

    render: function () {
        switch(this.state.step) {
            case 1:
                return <RegAccountFields className="registration-form"
                    nextStep     =  {this.nextStep}
                    saveValues   =  {this.saveValues}
                />
            case 2:
                return <RegSurveyFields className="registration-form"
                    nextStep     =  {this.nextStep}
                    saveValues   =  {this.saveValues}
                    previousStep =  {this.previousStep}
                />
            case 3:
                return <RegConfirmation className="registration-form"
                    singUp       =  {this.singUp}
                    nextStep     =  {this.nextStep}
                    previousStep =  {this.previousStep}
                    fieldValues  =  {fieldValues}

                />
            case 4:
                return <RegSuccess className="registration-form"
                    previousStep  =  {this.previousStep}
                    fieldValues   =  {fieldValues}
                />
        }

    }
});


export default RegistrationForm;