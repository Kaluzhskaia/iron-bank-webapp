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
import {PATH_API_LOAN_REQUEST} from "../constants";
import {createAuthorizationTokenHeader} from '../utils.js'

const styles = {
    customWidth: {
        width: 250,
    },
    formWidth: {
        width: 400
    },
};


const regExpAmount = /^([0-9]+)$/;

const LoanRequestForm = React.createClass({



    getInitialState: function() {
        return {
            amount         : '',
            purpose        : '',
            guarantor      : '',
            pledge         : '',
            income         : '',
            amountErrorText: '',
            incomeError    : '',
            errorText      : '',
            submitEnabled  : false,
            submitted : false
        }
    },

    handleOnChange(e){
        if (e.target.name == "amount") {
            if (regExpAmount.test(e.target.value)) {
                this.setState({amount: e.target.value});
                this.setState({amountErrorText: ''})
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
            if (regExpAmount.test(e.target.value)) {
                this.setState({income: e.target.value});
                this.setState({incomeError: ''})
            }
            else
                this.setState({incomeError: "Только циферки, дружище"})
        }
    },



    handleOnClick(e) {
        if (
            this.state.amount != '' &&
            this.state.purpose != '' &&
            this.state.guarantor != '' &&
            this.state.pledge != '' &&
            this.state.income != '' &&
            this.state.incomeError == '' &&
            this.state.amountErrorText == '')
        {
            this.setState({errorText: ''});
            axios({ method: 'post',
                    url: PATH_API_LOAN_REQUEST,
                    headers: createAuthorizationTokenHeader(),
                    data: {
                        amount: this.state.amount,
                        purpose: this.state.purpose,
                        guarantor: this.state.guarantor,
                        pledge: this.state.pledge,
                        income: this.state.income
                    },
                });
            this.setState({submitted: true});
        }
        else {
            this.setState({errorText: 'Все поля должны быть корректно заполнены'})
        }
    },
    handleOnceMoreButton(){
        this.setState({submitted: false});
    },

    render: function () {
        if (this.state.submitted)
            return <div>
                    <h3>Заявка подана</h3>
                    <RaisedButton
                    primary={true}
                    label="Подать еще одну заявку"
                    onTouchTap={this.handleOnceMoreButton}/>
                </div>;
        else
            return (
                <div className="home-page">
                    <h3> Кредит возьмите,<br/>Но затем верните
                    </h3>
                    <Paper zDepth={2}
                           style={styles.formWidth}>
                        <form>
                            <TextField name='amount' errorText={this.state.amountErrorText} onChange={this.handleOnChange}
                                       hintText="Сумма (в железных монетах):"
                                       style={{width: '360px', margin: '20px', marginTop: '15px'}} />
                            <TextField name='purpose' onChange={this.handleOnChange}
                                       hintText="Цель:"
                                       style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}}
                            />
                            <TextField name='guarantor' onChange={this.handleOnChange}
                                       hintText="Поручитель:"
                                       style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}}
                            />
                            <TextField name='pledge' onChange={this.handleOnChange}
                                       hintText="Залог:"
                                       style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}}
                            />
                            <TextField name='income' errorText={this.state.incomeError} onChange={this.handleOnChange}
                                       hintText="Доход"
                                       style={{width: '360px', margin: '20px', marginBottom: '30px', marginTop: '0px'}}
                            />
                            <div className="error-message">{this.state.errorText}</div>
                            <div>
                                <RaisedButton
                                    name='nextStep'
                                    primary={true}
                                    label="Подать заявку"
                                    onTouchTap={this.handleOnClick}
                                    style={{width: '100%', marginTop: '30px'}}
                                />
                            </div>
                        </form>
                    </Paper>
                </div>
            );
    }
});

export default LoanRequestForm;