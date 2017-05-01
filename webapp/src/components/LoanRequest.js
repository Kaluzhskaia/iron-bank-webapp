/**
 * Created by Mikhail Falaleev on 29.04.2017.
 */

import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {PATH_API_LOAN_REQUEST} from '../constants';
import {createAuthorizationTokenHeader} from '../utils.js';

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const LoanRequest = React.createClass({



    handleStatusApprove(e){
        this.statusChange("approve")
    },
    handleStatusReject(e){
        this.statusChange("reject")
    },
    handleStatusIssue(e){
        this.statusChange("loan-issue")
    },
    statusChange(status){
        axios({ method: 'get',
            url: PATH_API_LOAN_REQUEST + "/" + this.props.loanRequest.id + "/" + status,
            headers: createAuthorizationTokenHeader()
        }).then((response)=> {
                this.props.shouldUpdate()
            }
        )
    },
    render: function () {

        var statusStyle = {};
        var status;
        var newRequestButtonDisplay = "none";
        var approvedRequestButtonDispaly = "none";

        switch (this.props.loanRequest.loanRequestStatus){
            case "NOT_REVIEWED":
                status = "Новая";
                statusStyle = {color: 'blue'};
                newRequestButtonDisplay = "inline-block";
                break;
            case "APPROVED" :
                newRequestButtonDisplay = "none";
                statusStyle = {color: 'green'};
                status = "Одобрена";
                break;
            case "REJECTED" :
                newRequestButtonDisplay = "none";
                statusStyle = {color: 'red'};
                status = "Отклонена";
                break;
        }

        return(
            <Paper style={style} zDepth={2} >

                <Table  selectable = {false}>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Имя аккаунта</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.client.username}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Имя клиента:</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.client.lastName} {this.props.loanRequest.client.firstName}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Сумма</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.amount}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Доход</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.income}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Цель</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.purpose}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Поручитель</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.guarantor}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Залог</TableRowColumn>
                            <TableRowColumn>{this.props.loanRequest.pledge}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Стаус</TableRowColumn>
                            <TableRowColumn style={statusStyle}><span >{status}</span></TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>

                <RaisedButton name="approved" ref="approved" label="Одобрить" primary={true} style={{width: "33.33%", display: newRequestButtonDisplay}} onTouchTap={this.handleStatusApprove}/>
                <RaisedButton name="rejected" label="Отказать" secondary={true} style={{width: "33.33%", display: newRequestButtonDisplay}}  onTouchTap={this.handleStatusReject}/>
                <RaisedButton name="helpButton" label="Помощник"  style={{width: "33.33%", display: newRequestButtonDisplay}}  />
                <RaisedButton name="label-issued" label="Кредит выдан" style={{width: "33.33%", display: newRequestButtonDisplay}}  onTouchTap={this.handleStatusIssue}/>
            </Paper>
        )},
});

export default LoanRequest;
