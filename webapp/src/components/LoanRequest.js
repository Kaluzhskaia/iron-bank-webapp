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
import {PATH_REGISTRATION} from "../paths";

    const styles = {
        customWidth: {
            width: 250,
        },
        formWidth: {
            width: 400,
            height: 400
        },
    };

const LoanRequest = React.createClass({



    getInitialState: function() {
        return {
            amount         : '',
            purpose        : '',
            guarantor      : '',
            pledge         : '',
            income         : ''
        }
    },

    handleOnChange(e){
        if (e.target.name == "amount") {
            this.setState({amount: e.target.value});
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
        axios.post(PATH_REGISTRATION +'/loan',
            {
                amount: this.state.amount,
                purpose: this.state.purpose ,
                guarantor: this.state.guarantor,
                pledge: this.state.pledge,
                income : this.state.income });
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

                        <div style={{marginTop: '10px'}}>Сумма:</div>
                        <div><TextField name='amount' onChange={this.handleOnChange}/></div>
                        <div>Цель:</div>
                        <div><TextField name='purpose' onChange={this.handleOnChange}/></div>
                        <div>Поручитель:</div>
                        <div><TextField name='guarantor' onChange={this.handleOnChange}/></div>
                        <div>Залог:</div>
                        <div><TextField name='pledge' onChange={this.handleOnChange}/></div>
                        <div>Доход</div>
                        <div><TextField name='income' onChange={this.handleOnChange}/></div>


                        <RaisedButton
                            name='nextStep'
                            primary={true}
                            style={{width: '200px'}}
                            label="Подать заявку"
                            onTouchTap={this.handleOnClick}
                        />

                        </div>
                    </Paper>
                </div>
            </div>
        );
    }
});

export default LoanRequest;