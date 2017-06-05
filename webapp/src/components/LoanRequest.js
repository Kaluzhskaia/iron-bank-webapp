/**
 * Created by Mikhail Falaleev on 29.04.2017.
 */

import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import axios from 'axios';
import {PATH_API_LOAN_REQUEST,ROLES} from '../constants';
import {createAuthorizationTokenHeader} from '../utils.js';

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const LoanRequest = React.createClass({

    getInitialState(){
        return({
            open: false,
        })
    },

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

    handleHelp(){
      if (this.state.open) {
          this.setState({open: false})
      }
      else{
          this.setState({open: true})
      }
    },
    render: function () {

        var statusStyle = {};
        var status;
        var newRequestButtonDisplay = "none";
        var issueButtonDisplay = "none";
        var managerName = this.props.loanRequest.manager ? (this.props.loanRequest.manager.firstName + " " + this.props.loanRequest.manager.lastName) : "" ;
        var managerDisplay = "table-row";
        const roles = localStorage.getItem(ROLES);


        switch (this.props.loanRequest.loanRequestStatus) {
            case "NOT_REVIEWED":
                status = "Новая";
                statusStyle = {color: 'blue'};
                managerDisplay = "none";
                break;
            case "APPROVED" :
                statusStyle = {color: 'green'};
                status = "Одобрена";
                break;
            case "REJECTED" :
                statusStyle = {color: 'red'};
                status = "Отклонена";
                break;
            case "LOAN_ISSUED" :
                statusStyle = {color: 'gray'};
                status = "Кредит выдан";
                break;
        }
        if (roles.includes("ROLE_MANAGER")) {
            if (this.props.loanRequest.loanRequestStatus == "NOT_REVIEWED") {
                newRequestButtonDisplay = "inline-block";
            }
        }
        else if (roles.includes("ROLE_CLIENT")){
            if (this.props.loanRequest.loanRequestStatus == "APPROVED"){
                issueButtonDisplay = "inline-block";
            }
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
                        <TableRow style={{display: managerDisplay}}>
                            <TableRowColumn>Менеджер</TableRowColumn>
                            <TableRowColumn>{managerName}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>

                <RaisedButton name="approved" ref="approved" label="Одобрить" primary={true} style={{width: "33.33%", display: newRequestButtonDisplay}} onTouchTap={this.handleStatusApprove}/>
                <RaisedButton name="rejected" label="Отказать" secondary={true} style={{width: "33.33%", display: newRequestButtonDisplay}}  onTouchTap={this.handleStatusReject}/>
                <RaisedButton name="helpButton" label="Помощник"  style={{width: "33.33%", display: newRequestButtonDisplay}} onTouchTap={this.handleHelp}  />
                <RaisedButton name="label-issued" label="Получить кредит" style={{width: "100%", display: issueButtonDisplay}}  onTouchTap={this.handleStatusIssue}/>

                <Drawer width={200} openSecondary={true} open={this.state.open} >
                    {(this.props.loanRequest.amount / this.props.loanRequest.income > 12) ? "Не рекомедовано" : "Рекомендовано"}
                </Drawer>
            </Paper>

        )},
});

export default LoanRequest;
