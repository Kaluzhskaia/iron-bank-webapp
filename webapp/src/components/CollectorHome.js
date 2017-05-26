/**
 * Created by Mikhail Falaleev on 17.01.2017.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {PATH_API_COLLECTOR_MISSIONS_ACTUAL_AND_MINE} from '../constants';
import {createAuthorizationTokenHeader} from '../utils';
import CollectorTasksGrid from './CollectorTasksGrid';
import {Tabs, Tab} from 'material-ui/Tabs';




const CollectorHome = React.createClass({
    getInitialState: function() {
        return {
            taskList: []
        }
    },

    componentWillMount(){
        axios.get(PATH_API_COLLECTOR_MISSIONS_ACTUAL_AND_MINE, {
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
                <Tab label="Текущие" >
                    <CollectorTasksGrid  taskList={this.state.taskList.filter((task)=>task.status === "IN_ACTION")}/>
                </Tab>
                <Tab label="Доступные" >
                    <CollectorTasksGrid shouldUpdate={this.shouldUpdate} taskList={this.state.taskList.filter((task)=>task.status === "ACTUAL")}/>
                </Tab>
                <Tab label="Выполненные" >
                    <CollectorTasksGrid shouldUpdate={this.shouldUpdate} taskList={this.state.taskList.filter((task)=>task.status === "COMPLETE" || task.status === "CHECKED")}/>
                </Tab>
            </Tabs>
        </div>
        );
    }
});

export default CollectorHome;