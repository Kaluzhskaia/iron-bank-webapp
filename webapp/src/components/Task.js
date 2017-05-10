/**
 * Created by Mikhail Falaleev on 11.05.2017.
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

const Task = React.createClass({

    render: function () {

        return(
            <Paper style={style} zDepth={2} >

                <Table  selectable = {false}>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Тип миссии</TableRowColumn>
                            <TableRowColumn>{this.props.task.type}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        )},
});

export default Task;