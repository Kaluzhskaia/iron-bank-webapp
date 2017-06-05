/**
 * Created by Mikhail Falaleev on 08.05.2017.
 */

import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import LoanGrid from './LoanGrid';
import {PATH_API_LOAN} from '../constants';
import {createAuthorizationTokenHeader} from '../utils.js';
import axios from 'axios';


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

const ManagerLoans = React.createClass({

    componentWillMount(){
        axios.get(PATH_API_LOAN, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                loanList: response.data
            });
        }).catch();

    },

    shouldUpdate(){
        axios.get(PATH_API_LOAN, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                loanList: response.data
            });
        }).catch();
    },


    getInitialState() {

        return {
            loanList: [],
        }

    },


    render() {
        return (
            <LoanGrid shouldUpdate={this.shouldUpdate} loanList={this.state.loanList}/>
        )
    }
})

export default ManagerLoans;