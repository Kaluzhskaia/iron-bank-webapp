/**
 * Created by Mikhail Falaleev on 29.04.2017.
 */
import React from 'react';
import LoanRequest from './LoanRequest.js'

const RequestGrid = React.createClass({

    render: function () {
        const requestList = this.props.requestsList.map(loanRequest =>
            <LoanRequest shouldUpdate={this.props.shouldUpdate} loanRequest={loanRequest} key={loanRequest.id}/>);
        return(
            <div>
                {requestList}
            </div>
        )},
});

export default RequestGrid;