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

const styles = {
    customWidth: {
        width: 250,
    },
    formWidth: {
        width: 400,
        height: 430
    },
};


const regExpAmount = /^([0-9]+)$/;

const LoanRequest = React.createClass({



    getInitialState: function() {
        return {
            amount         : '',
            purpose        : '',
            guarantor      : '',
            pledge         : '',
            income         : '',
            amountErrorText: '',
            errorText      : '',
            submitEnabled  : false
        }
    },

    handleOnChange(e){
        if (e.target.name == "amount") {
            if (regExpAmount.test(e.target.value)) {
                this.setState({amount: e.target.value});
            }
            else {
                this.setState({amountErrorText: "Только циферки, дружище"})
            }

        }
        if (e.target.name == "purpose") {
            this.setState({purpose: e.target.value});
        }
        if (e.target.name == "guarantor") {
            this.setState({guarantor: e.target.value});
        }
        if (e.target.name == "pledge") {
            this.setState({pledge : e.target.value});
        }
        if (e.target.name == "income") {
            this.setState({income: e.target.value});
        }
    },



    handleOnClick(e) {
        if (
            this.state.amount != '' &&
            this.state.purpose != '' &&
            this.state.guarantor != '' &&
            this.state.pledge != '' &&
            this.state.income != '')
        {
            this.setState({errorText: ''});
            axios.post(PATH_REGISTRATION + '/loan',
                {
                    amount: this.state.amount,
                    purpose: this.state.purpose,
                    guarantor: this.state.guarantor,
                    pledge: this.state.pledge,
                    income: this.state.income
                });
        }
        else {
            this.setState({errorText: 'Все поля должны быть заполнены'})
        }
    },

    render: function () {
        return (
            <div className="home-page">
                <p> Кредит возьмите,<br/>Но затем верните
                </p>
                <div className="loan-request-form">
                    <Paper zDepth={2}
                            style={styles.formWidth}>
                        <div>

                        <div style={{marginTop: '10px'}}>Сумма (в железных монетах):</div>
                        <div><TextField name='amount' errorText={this.state.amountErrorText} onChange={this.handleOnChange}/></div>
                        <div>Цель:</div>
                        <div><TextField name='purpose' onChange={this.handleOnChange}/></div>
                        <div>Поручитель:</div>
                        <div><TextField name='guarantor' onChange={this.handleOnChange}/></div>
                        <div>Залог:</div>
                        <div><TextField name='pledge' onChange={this.handleOnChange}/></div>
                        <div>Доход</div>
                        <div><TextField name='income' onChange={this.handleOnChange}/></div>

                        <div className="error-message">{this.state.errorText}</div>

                        <RaisedButton
                            name='nextStep'
                            primary={true}
                            style={{width: '200px', marginTop: '40px'}}
                            label="Подать заявку"
                            onTouchTap={this.handleOnClick}
                            disabled={this.state.submitEnabled}
                        />

                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
});

export default LoanRequest;