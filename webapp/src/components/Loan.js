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
import axios from 'axios';
import {PATH_API_LOAN,ROLES} from '../constants';
import {createAuthorizationTokenHeader} from '../utils.js';

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const Loan = React.createClass({

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
            url: PATH_API_LOAN + "/" + this.props.loan.id + "/" + status,
            headers: createAuthorizationTokenHeader()
        }).then((response)=> {
                this.props.shouldUpdate()
            }
        )
    },
    render: function () {



        return(
            <Paper style={style} zDepth={2} >

                <Table  selectable = {false}>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Дата выдачи:</TableRowColumn>
                            <TableRowColumn>{this.props.loan.issueDate}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Погашено</TableRowColumn>
                            <TableRowColumn>{this.props.loan.payed}/</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )},
});

export default Loan;