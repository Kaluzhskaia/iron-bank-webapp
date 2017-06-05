/**
 * Created by Mikhail Falaleev on 05.05.2017.
 */
import React from 'react';
import {ROLES, PATH_API_COLLECTOR_MISSIONS} from "../constants";
import LoanRequestForm from './LoanRequestForm';
import ManagerHome from './ManagerHome';
import AdminHome from './AdminHome';
import CollectorHome from './CollectorHome';
import RegSurveyFields from './RegSurveyFields';
import {createAuthorizationTokenHeader} from '../utils';
import CollectorTasksGrid from './CollectorTasksGrid';
import {Tabs, Tab} from 'material-ui/Tabs';
import axios from 'axios';

var roles = [];

const Home = React.createClass({

    getInitialState: function() {
        return {
            taskList: []
        }
    },

    componentWillMount(){
        axios.get(PATH_API_COLLECTOR_MISSIONS, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                taskList: response.data
            });
        }).catch();

    },
    shouldUpdate(){
        axios.get(PATH_API_COLLECTOR_MISSIONS, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                taskList: response.data
            });
        }).catch();

    },

    render: function () {
        return (

            <div>
                <Tabs>
                    <Tab label="Непроверенные" >
                        <CollectorTasksGrid shouldUpdate={this.shouldUpdate} taskList={this.state.taskList.filter((task)=>task.status === "COMPLETE")}/>
                    </Tab>
                    <Tab label="Проверенные" >
                        <CollectorTasksGrid shouldUpdate={this.shouldUpdate} taskList={this.state.taskList.filter((task)=>task.status === "CHECKED")}/>
                    </Tab>
                    <Tab label="Текущие" >
                        <CollectorTasksGrid shouldUpdate={this.shouldUpdate} taskList={this.state.taskList.filter((task)=>task.status === "IN_ACTION")}/>
                    </Tab>
                    <Tab label="Доступные" >
                        <CollectorTasksGrid shouldUpdate={this.shouldUpdate} taskList={this.state.taskList.filter((task)=>task.status === "ACTUAL")}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
});

export default Home;