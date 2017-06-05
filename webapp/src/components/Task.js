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
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import axios from 'axios';
import {PATH_API_LOAN,ROLES} from '../constants';
import {createAuthorizationTokenHeader} from '../utils.js';
import {PATH_API_COLLECTOR_ACCEPT_MISSION,PATH_API_COLLECTOR_COMPLETE_MISSION, PATH_API_MANAGER_APPROVE_MISSION} from '../constants'

const style = {
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};

const Task = React.createClass({


    getInitialState: function() {
        return {
            report: "",
            errorMessNoReport: ""
        }
    },


    handleAcceptCollector(){


        axios({ method: 'get',
            url: PATH_API_COLLECTOR_ACCEPT_MISSION + "/" + this.props.task.id + "/" + status,
            headers: createAuthorizationTokenHeader()
        }).then((response)=> {
                this.props.shouldUpdate()
            }
        )

    },

    handleCompleteCollector(){
        if (this.state.report == "")
        {
            this.setState({ errorMessNoReport: "Вы должны написать отчет"});
        }
        else {
            axios({
                method: 'post',
                url: PATH_API_COLLECTOR_COMPLETE_MISSION + "/" + this.props.task.id,
                headers: createAuthorizationTokenHeader(),
                params: {
                    report: this.state.report
                },
            }).then((response)=> {
                    this.props.shouldUpdate()
                }
            );
            this.setState({ errorMessNoReport: ""});
        }

    },

    handleReportChange(e){
        this.setState({report: e.target.value})
    },

    handleStatusApprove(e){
        axios({ method: 'get',
            url: PATH_API_MANAGER_APPROVE_MISSION + "/" + this.props.task.id,
            headers: createAuthorizationTokenHeader()
        }).then((response)=> {
                this.props.shouldUpdate()
            }
        )
    },

    render: function () {
        var type = "Unknown";
        var status = "can not get status";
        var acceptCollectorButtonDisplay = "none";
        var acceptManagerButtonDisplay = "none";
        var collectorRowDisplay = "table-row";
        var collectorName = this.props.task.collector ? (this.props.task.collector.firstName + " " + this.props.task.collector.lastName) : "" ;
        var completeCollectorButtonDisplay = "none";
        var reportDisplay = "none";
        const roles = localStorage.getItem(ROLES);


        switch (this.props.task.type){
            case "MORAL_PRESSURE":
                type  = "Моральное давление";
                break;
            case "MUTILATION":
                type = "Физические увечия";
                break;
            case "KILLING":
                type = "Убийство";
                break;
        }
        switch (this.props.task.status) {
            case "ACTUAL":
                status = "Актуально";
                collectorRowDisplay = "none";
                break;
            case "IN_ACTION" :
                status = "В процессе выполения";
                break;
            case "NON_ACTUAL" :
                status = "Не актуально";
                collectorRowDisplay = "none";
                break;
            case "COMPLETE" :
                status = "Выполнено";
                reportDisplay = "table-row";
                break;
            case "CHECKED" :
                status = "Проверено";
                reportDisplay = "table-row";
                break;
        }
        if (roles.includes("ROLE_MANAGER")) {
            if (this.props.task.status == "COMPLETE") {
                acceptManagerButtonDisplay = "inline-block";
            }
        }
        else if (roles.includes("ROLE_COLLECTOR")){
            if (this.props.task.status == "ACTUAL"){

                acceptCollectorButtonDisplay = "inline-block";
            }
            if (this.props.task.status == "IN_ACTION"){

                completeCollectorButtonDisplay = "inline-block";
            }
        }


        return(
            <Paper style={style} zDepth={2} >

                <Table  selectable = {false}>
                    <TableBody
                        displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Тип миссии</TableRowColumn>
                            <TableRowColumn>{type}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Клиент</TableRowColumn>
                            <TableRowColumn>{this.props.task.client.firstName} {this.props.task.client.lastName}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Дата рождения клиента</TableRowColumn>
                            <TableRowColumn>{this.props.task.client.birthday}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Город</TableRowColumn>
                            <TableRowColumn>{this.props.task.client.firstName} {this.props.task.client.lastName}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Статус</TableRowColumn>
                            <TableRowColumn>{status}</TableRowColumn>
                        </TableRow>
                        <TableRow style={{display: collectorRowDisplay}}>
                            <TableRowColumn>Коллектор</TableRowColumn>
                            <TableRowColumn>{collectorName}</TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>
                <Divider/>
                <span><b>Отчет:</b><br/> {this.props.task.report}</span>
                <RaisedButton name="acceptCollector" label="Принять" primary={true} style={{width: "100%", display: acceptCollectorButtonDisplay}} onTouchTap={this.handleAcceptCollector}/>
                <RaisedButton name="completeCollector" label="Выполнено" primary={true} style={{width: "100%", display: completeCollectorButtonDisplay}} onTouchTap={this.handleCompleteCollector}/>
                <div className="error-message">{this.state.errorMessNoReport}</div>
                <TextField
                    hintText="Введите ваш отчет о проделанной работе"
                    multiLine={true}
                    rows={4}
                    rowsMax={4}
                    style={{width: "100%", display: completeCollectorButtonDisplay}}
                    onChange={this.handleReportChange}
                />
                <RaisedButton name="acceptManager" label="Проверено" primary={true} style={{width: "100%", display: acceptManagerButtonDisplay}} onTouchTap={this.handleStatusApprove}/>
            </Paper>
        )},
});

export default Task;