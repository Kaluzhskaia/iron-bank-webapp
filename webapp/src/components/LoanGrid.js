/**
 * Created by Mikhail Falaleev on 10.05.2017.
 */
import React from 'react';
import Loan from './Loan.js'

const LoanGrid = React.createClass({

    render: function () {
        const loanList = this.props.loanList.length > 0 ? this.props.loanList.map(loan =>
            <Loan shouldUpdate={this.props.shouldUpdate} loan={loan} key={loan.id}/>) : <h2>Данных нет</h2>;
        return(
            <div>
                {loanList}
            </div>
        )},
});

export default LoanGrid;