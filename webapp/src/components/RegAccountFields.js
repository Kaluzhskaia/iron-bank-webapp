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
var emailAccept = false;
var pswdAccept  = false;

const RegAccountFields = React.createClass({

    getInitialState: function() {
        return {
            btnDisable   : true,
           // btnDisable   : false,
            email        : '',
            password     : '',
            errorPswdTxt1: '',
            errorPswdTxt2: '',
            errorMailTxt : ''
        }
    },

    handleOnClickNext(e) {
        var email = this.state.username;
        axios.post(PATH_REGISTRATION +'/username', {'email': this.state.username})
        .then(response => {
            this.props.saveValues({password: this.state.password, email: this.state.username});
            this.props.nextStep();
        })
        .catch(response => {
            this.setState({errorMailTxt: 'Email уже привязан к акканту'});
        });
    },

    activateNextBtn(){
        if (emailAccept && pswdAccept && this.state.password != ''){
            this.setState({btnDisable : false});
        }
        else{
            this.setState({btnDisable : true});
        }
    },
    handleChangeEmail(e){
        if (regEmail.test(e.target.value)) {
            this.setState({errorMailTxt: ''});
            this.setState({email: e.target.value});
            emailAccept = true;
        }
        else {
            this.setState({errorMailTxt: 'Некорректный username'});
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
                    <TextField name='email'  hintText="Email" onChange={this.handleChangeEmail} errorText={this.state.errorMailTxt}
                               style={{width: '360px', margin: '20px'}} />
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