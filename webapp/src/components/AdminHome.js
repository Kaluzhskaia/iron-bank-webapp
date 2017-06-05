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
import DatePicker from 'material-ui/DatePicker';

const regField = /^[\-а-яА-ЯёЁa-zA-Z]{2,}$/;
const error = "Поле может содержать только руссские или латинские буквы и состоять минимум из 2 символов"
var firstNameAccept = false;
var secondNameAccept = false;
var cityAccept = false;
var dateAccept= false;

const regPswd = /^(.{5,})$/
const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const regUsername = /^([A-Za-z0-9_\-\.]{2,})$/
var emailAccept = false;
var pswdAccept  = false;
var namesAccept = false;


const AdminHome = React.createClass({
    getInitialState: function() {
        return {

            btnDisable   : true,
            // btnDisable   : false,
            email        : '',
            password     : '',
            errorPswdTxt1: '',
            errorPswdTxt2: '',
            errorMailTxt : '',
            errorUsernameTxt: '',
            city         : null,
            birthday     : null,
            firstName    : null,
            lastName     : null,
            cityErr      : '',
            birthdayErr  : '',
            firstNameErr : '',
            lastNameErr  : '',
            type: 1,
            submitted: false
        }
    },

    singUp: function(){
        axios.post(PATH_REGISTRATION+'/new-employee/2',
            {
                username  : this.state.username,
                email     : this.state.email,
                password  : this.state.password,
                city      : this.state.city,
                birthday  : this.state.birthday,
                firstName : this.state.firstName,
                lastName  : this.state.lastName,
            }).then(response => {

            this.setState({submitted: true});
        })
    },


    singUp2: function(){
        axios.post(PATH_REGISTRATION+'/new-employee/1',
            {
                username  : this.state.username,
                email     : this.state.email,
                password  : this.state.password,
                city      : this.state.city,
                birthday  : this.state.birthday,
                firstName : this.state.firstName,
                lastName  : this.state.lastName,
            }).then(response => {


            this.setState({submitted: true});

            })
    },

    handleChangeS(e) {
        if (regField.test(e.target.value) && e.target.value != '') {
            switch (e.target.name) {
                case 'firstName' :
                    this.setState({firstName: e.target.value});
                    this.setState({firstNameErr: ''});
                    firstNameAccept = true;
                    break;
                case 'lastName'  :
                    this.setState({lastName: e.target.value});
                    this.setState({lastNameErr: ''});
                    secondNameAccept = true;
                    break;
                case 'city'      :
                    this.setState({city: e.target.value});
                    this.setState({cityErr: ''});
                    cityAccept = true;
                    break;
            }

        }
        else {
            switch (e.target.name) {
                case 'firstName' :
                    this.setState({firstNameErr: error });
                    firstNameAccept = false;
                    break;
                case 'lastName'  :
                    this.setState({lastNameErr: error });
                    secondNameAccept = false;
                    break;
                case 'city'      :
                    this.setState({cityErr: error });
                    cityAccept = false;
                    break;
            }
        }
        this.activateNextBtn();
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

    activateNextBtn: function(){
        if (firstNameAccept && secondNameAccept && cityAccept && dateAccept && namesAccept && emailAccept && pswdAccept && this.state.password != '')
        {
            this.setState({btnDisable: false});
        }
        else {
            this.setState({btnDisable: true});
        }
    },

    handleOnTouch(e, date){
        this.setState({birthday: date.valueOf()});
        dateAccept = true;
        this.activateNextBtn();
    },
    render: function () {
        if (this.state.submitted)
            return <div>Сотрудник добавлен</div>
        else
        return (
            <Paper zDepth={2}>
                <form>
                    <TextField name='username'  hintText="username" onChange={this.handleChangeUsername} errorText={this.state.errorUsernameTxt}
                                />
                    <TextField name='email'  hintText="Email" onChange={this.handleChangeEmail} errorText={this.state.errorMailTxt}
                                />
                    <TextField name='password' ref="password" hintText="Password" type="password" onChange={this.handleChangePswd} errorText={this.state.errorPswdTxt1}

                    />
                    <TextField name='confirmPswd' ref="confirmPswd" hintText="Confirm password" type="password" onChange={this.handleChangePswd} errorText={this.state.errorPswdTxt2}

                    />
                    <TextField name='firstName' ref='firstName' hintText="Имя" onChange={this.handleChangeS} errorText={this.state.firstNameErr}

                    />
                    <TextField name='lastName' ref='lastName' hintText="Фамилия"  onChange={this.handleChangeS} errorText={this.state.lastNameErr}

                    />
                    <TextField  name='city' ref='city' hintText="Город" onChange={this.handleChangeS} errorText={this.state.cityErr}

                    />
                    <DatePicker name ='date' ref='date' hintText="Дата рождения" onChange={this.handleOnTouch}
                                 />
                    <RaisedButton
                        name='nextStep'
                        primary={true}
                        disabled={this.state.btnDisable}
                        style={{width: '200px'}}
                        label="Коллектор"
                        onTouchTap={this.singUp}
                    />
                    <RaisedButton
                    name='nextStep'
                    primary={true}
                    disabled={this.state.btnDisable}
                    style={{width: '200px'}}
                    label="Менеджер"
                    onTouchTap={this.singUp2}
                />
                </form>
            </Paper>
        );
    }
});

export default AdminHome;