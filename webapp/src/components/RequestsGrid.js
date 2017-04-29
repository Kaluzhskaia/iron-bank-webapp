/**
 * Created by Mikhail Falaleev on 29.04.2017.
 */
import React from 'react';

import LoanRequest from './LoanRequest.js'
import {PATH_API_NEW_LOAN_REQUESTS_LIST} from '../constants'

import axios from 'axios';
import {createAuthorizationTokenHeader} from '../utils.js'




const RequestGrid = React.createClass({

    getInitialState() {
        return {
            requestInfo: []
        }
    },


    componentWillMount(){
        axios.get(PATH_API_NEW_LOAN_REQUESTS_LIST, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                requestInfo: response.data
            });
        }).catch();
    },

    render: function () {
        const requestList = this.state.requestInfo.map(loanRequest =>
            <LoanRequest loanRequest={loanRequest} key={loanRequest.id}/>);
        return(
            <div>
                {requestList}
            </div>
        )},
});

export default RequestGrid;