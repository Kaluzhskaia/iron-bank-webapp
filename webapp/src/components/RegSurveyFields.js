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
import DatePicker from 'material-ui/DatePicker';

const regField = /^[\-а-яА-ЯёЁa-zA-Z]{2,}$/;
const error = "Поле может содержать только руссские или латинские буквы и состоять минимум из 2 символов"
var firstNameAccept = false;
var secondNameAccept = false;
var cityAccept = false;
var dateAccept= false;


const RegSurveyFields = React.createClass({

    getInitialState: function() {
        return {
            btnDisable   : true,
            city         : null,
            birthday     : null,
            firstName    : null,
            lastName     : null,
            cityErr      : '',
            birthdayErr  : '',
            firstNameErr : '',
            lastNameErr  : '',
        }
    },
    handleOnClickNext(e) {
        this.props.saveValues({
            firstName: this.state.firstName,
            lastName : this.state.lastName,
            city     : this.state.city,
            birthday : this.state.birthday
        });
        this.props.nextStep();
    },


    handleOnClickPrevious(e) {
        this.props.previousStep();
    },

    activateNextBtn: function(){
        if (firstNameAccept && secondNameAccept && cityAccept && dateAccept)
        {
            this.setState({btnDisable: false});
        }
        else {
            this.setState({btnDisable: true});
        }
    },

    handleChange(e) {
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
            };
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


    handleOnTouch(e, date){
        this.setState({birthday: date.valueOf()});
        dateAccept = true;
        this.activateNextBtn();
    },



    render: function () {
        return(
        <div className="registration-form">
            <div className="label">Регистрация</div>
            <Paper zDepth={2}>
                <form>
                    <TextField name='firstName' ref='firstName' hintText="Имя" onChange={this.handleChange} errorText={this.state.firstNameErr}
                               style={{width: '360px', margin: '20px'}}
                    />
                    <TextField name='lastName' ref='lastName' hintText="Фамилия"  onChange={this.handleChange} errorText={this.state.lastNameErr}
                               style={{width: '360px', margin: '20px', marginBottom: '20px', marginTop: '0px'}}
                    />
                    <TextField  name='city' ref='city' hintText="Город" onChange={this.handleChange} errorText={this.state.cityErr}
                               style={{width: '360px', margin: '20px', marginBottom: '20px', marginTop: '0px'}}
                    />
                    <DatePicker name ='date' ref='date' hintText="Дата рождения" onChange={this.handleOnTouch}
                               style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}} />
                    <div>
                        <RaisedButton
                                style={{width: '200px', float: 'left'}}
                                label="Назад"
                                onTouchTap={this.handleOnClickPrevious}
                        />

                        <RaisedButton
                            name='nextStep'
                            primary={true}
                            disabled={this.state.btnDisable}
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

export default RegSurveyFields ;
