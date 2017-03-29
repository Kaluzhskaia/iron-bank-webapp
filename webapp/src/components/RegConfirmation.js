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

const RegConfirmation = React.createClass({

    handleOnClickNext(e){
        this.props.singUp();
        this.props.nextStep();
    },

    handleOnClickPrevious(e){
        this.props.previousStep();
    },

    render: function () {
        var birthday = new Date(this.props.fieldValues.birthday);
        return(
        <div className="registration-form">
            <div className="label">Регистрация</div>
            <Paper zDepth={2} >
                <div className="reg-confirmation">
                    <div>Email:</div><div>{this.props.fieldValues.username}</div>
                    <div>Имя:</div><div>{this.props.fieldValues.firstName}</div>
                    <div>Фамилия:</div><div>{this.props.fieldValues.lastName}</div>
                    <div>Город:</div><div>{this.props.fieldValues.city}</div>
                    <div>День рождения:</div><div>{birthday.getDate()+'.'+(birthday.getMonth()+1)+'.'+birthday.getFullYear()}</div>
                </div>
                <RaisedButton
                    style={{width: '200px', float: 'left'}}
                    label="Назад"
                    onTouchTap={this.handleOnClickPrevious}
                />
                <RaisedButton
                    style={{width: '200px'}}
                    label="Подтвердить"
                    onTouchTap={this.handleOnClickNext}
                />
            </Paper>
        </div>
        )
    }
});

export default RegConfirmation ;
