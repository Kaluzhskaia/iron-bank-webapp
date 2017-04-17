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
import * as ReactDOM from "react-dom";
import {PATH_REGISTRATION} from "../constants";

const regPswd = /^(.{5,})$/
const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const regUsername = /^([A-Za-z0-9_\-\.]{2,})$/
var emailAccept = false;
var pswdAccept  = false;
var namesAccept = false;

const RegAccountFields = React.createClass({

    getInitialState: function() {
        return {
            btnDisable   : true,
           // btnDisable   : false,
            email        : '',
            password     : '',
            errorPswdTxt1: '',
            errorPswdTxt2: '',
            errorMailTxt : '',
            errorUsernameTxt: ''
        }
    },

    handleOnClickNext(e) {
        var email = this.state.username;
        axios.post(PATH_REGISTRATION +'/check-email-and-username', {'email': this.state.username})
        .then(response => {
            this.props.saveValues({password: this.state.password, username: this.state.username, email: this.state.email});
            this.props.nextStep();
        })
        .catch(response => {
            this.setState({errorUsernameTxt: 'Имя занято'});
        });
    },

    activateNextBtn(){
        if (namesAccept && emailAccept && pswdAccept && this.state.password != ''){
            this.setState({btnDisable : false});
        }
        else{
            this.setState({btnDisable : true});
        }
    },
    handleChangeUsername(e){
        if (regUsername.test(e.target.value)) {
            this.setState({errorUsernameTxt: ''});
            this.setState({username: e.target.value});
            namesAccept = true;
        }
        else {
            this.setState({errorUsernameTxt: 'Название аккаунта должно содержать только латинкские буквы и цифры и состоять минимум из 2 символов'});
            namesAccept = false;
        }
        this.activateNextBtn();
    },
    handleChangeEmail(e){
        if (regEmail.test(e.target.value)) {
            this.setState({errorMailTxt: ''});
            this.setState({email: e.target.value});
            emailAccept = true;
        }
        else {
            this.setState({errorMailTxt: 'Некорректный email'});
            emailAccept = false;
        }
        this.activateNextBtn();
    },
    handleChangePswd(e){
        if (regPswd.test(this.refs.password.getValue())) {
            this.setState({password: this.refs.password.getValue()});
            this.setState({errorPswdTxt1: ''});
            pswdAccept = true;


            if (this.refs.password.getValue() == this.refs.confirmPswd.getValue()) {
                this.setState({errorPswdTxt2: ''});
                this.setState({pswdAccept: true});
                pswdAccept = true;
            }
            else {
                this.setState({errorPswdTxt2: 'Пароли должны совпадать'});
                this.setState({pswdAccept: false});
                pswdAccept = false;
            }
        }
        else
        {
            this.setState({errorPswdTxt1 : 'Пароль должен состоять минимум из 5 символов'});
            pswdAccept  = false;
        }
        this.activateNextBtn()
    },

    render: function () {


        return(
        <div className="registration-form">
            <div className="label">Регистрация</div>
            <Paper zDepth={2}>
                <form>
                    <TextField name='username'  hintText="username" onChange={this.handleChangeUsername} errorText={this.state.errorUsernameTxt}
                               style={{width: '360px', margin: '20px'}} />
                    <TextField name='email'  hintText="Email" onChange={this.handleChangeEmail} errorText={this.state.errorMailTxt}
                               style={{width: '360px', margin: '20px', marginTop: '0px'}} />
                    <TextField name='password' ref="password" hintText="Password" type="password" onChange={this.handleChangePswd} errorText={this.state.errorPswdTxt1}
                               style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}}
                               />
                    <TextField name='confirmPswd' ref="confirmPswd" hintText="Confirm password" type="password" onChange={this.handleChangePswd} errorText={this.state.errorPswdTxt2}
                               style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}}
                               />
                    <div>
                        <Link to="/login">
                            <RaisedButton
                                style={{width: '200px', float: 'left'}}
                                label="Назад"
                            />
                        </Link>
                        <RaisedButton
                            name='nextStep'
                            disabled={this.state.btnDisable}
                            primary={true}
                            style={{width: '200px'}}
                            label="Дальше"
                            onTouchTap={this.handleOnClickNext}
                        />
                    </div>
                </form>
            </Paper>
        </div>
        )
    }

});

export default RegAccountFields;