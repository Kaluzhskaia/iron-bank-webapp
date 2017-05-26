/**
 * Created by Mikhail Falaleev on 11.05.2017.
 */


import React from 'react';
import Task from './Task.js';

const CollectorTasksGrid = React.createClass({

    render: function () {
        console.log(this.props.taskList.length)
        const taskList = this.props.taskList.length > 0 ? this.props.taskList.map(task =>
            <Task shouldUpdate={this.props.shouldUpdate} task={task} key={task.id}/>) : <h2>Данных нет</h2>;
        return(
            <div>
                {taskList}
            </div>
        )},
});

export default CollectorTasksGrid;
