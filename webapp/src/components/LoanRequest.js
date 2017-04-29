/**
 * Created by Mikhail Falaleev on 29.04.2017.
 */

import React from 'react';
import Paper from 'material-ui/Paper';
import {Table, TableBody, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const LoanRequest = React.createClass({

    render: function () {

        var statusStyle = {};
        var status;

        switch (this.props.loanRequest.loanRequestStatus){
            case "NOT_REVIEWED":
                status = "Новая";
                statusStyle = {color: 'blue'};
                break;
            case "APPROVED" :
                statusStyle = {color: 'green'};
                status = "Принята"
                break;
            case "REJECTED" :
                statusStyle = {color: 'red'};
                status = "Отклонена"
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

            </Paper>
        )},
});

export default LoanRequest;
