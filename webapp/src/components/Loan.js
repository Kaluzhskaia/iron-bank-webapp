/**
 * Created by Mikhail Falaleev on 10.05.2017.
 */
/**
 * Created by Mikhail Falaleev on 29.04.2017.
 */

import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {PATH_API_LOAN_SHOULD_BE_PAYED,ROLES, PATH_API_LOAN_PAY} from '../constants';
import {createAuthorizationTokenHeader} from '../utils.js';

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const regUsername = /^([0-9]{1,})$/

const Loan = React.createClass({

    getInitialState(){
        return{
            payAmount: "",
            disablePayButton: true,
            errorPayAmountTest: "",
            shouldBePayed: "",
        }
    },

    handlePay(e){
        axios({
            url: PATH_API_LOAN_PAY + "/" + this.props.loan.id,
            method: 'post',
            headers: createAuthorizationTokenHeader(),
            params: {
                pay: this.state.payAmount
            }
        }).then(response => {
            this.props.shouldUpdate();
        }).catch();
    },

    componentWillMount(){
        axios.get(PATH_API_LOAN_SHOULD_BE_PAYED + "/" + this.props.loan.id, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                shouldBePayed: response.data.shouldPayed
            });
        }).catch();

    },

    handleChange(e){
        if (regUsername.test(e.target.value)){
            this.setState({ payAmount: e.target.value,
                            errorPayAmountTest: "",
                            disablePayButton: false})
        }
        else {
            this.setState({ errorPayAmountTest: "Только цифры",
                            disablePayButton: true})
        }
    },

    render: function () {

        var payRowDisplay = this.props.loan.isRepaid ? "none" : "table-row";

        const roles = localStorage.getItem(ROLES);
        var color = this.props.loan.isRepaid ? "green" : "red";

        if (!roles.includes("ROLE_CLIENT")) {
            payRowDisplay = "none";
        }
        return(
            <Paper style={style} zDepth={2} >

                <Table  selectable = {false}>
                    <TableBody
                        displayRowCheckbox={false}>

                        <TableRow>
                            <TableRowColumn>Клиент</TableRowColumn>
                            <TableRowColumn>{this.props.loan.loanRequest.client.firstName} {this.props.loan.loanRequest.client.lastName}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата выдачи:</TableRowColumn>
                            <TableRowColumn>{this.props.loan.issueDate}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Погашено:</TableRowColumn>
                            <TableRowColumn>{this.props.loan.payed}/{Math.ceil(this.props.loan.loanRequest.amount * this.props.loan.interestRate)} </TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Должно быть погашено:</TableRowColumn>
                            <TableRowColumn>{Math.ceil(this.state.shouldBePayed)} </TableRowColumn>
                        </TableRow>

                        <TableRow>
                            <TableRowColumn>Статус</TableRowColumn>
                            <TableRowColumn style={{color: color}}>{this.props.loan.isRepaid ? "Выплачен" : "не выплачен"} </TableRowColumn>
                        </TableRow>
                        <TableRow style={{display: payRowDisplay}}>
                            <TableRowColumn>
                                <TextField errorText={this.state.errorPayAmountTest} name='payTextField'  hintText="Введите сумму"
                                           onChange={this.handleChange}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <RaisedButton name="payButton" label="Оплатить" primary={true} disabled={this.state.disablePayButton} onTouchTap={this.handlePay}/>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )},
});

export default Loan;