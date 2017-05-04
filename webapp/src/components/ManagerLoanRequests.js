/**
 * Created by Mikhail Falaleev on 30.04.2017.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import RequestGrid from './RequestsGrid';
import {PATH_API_LOAN_REQUEST} from '../constants';
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

const ManagerLoanRequests = React.createClass({

    componentWillMount(){
        axios.get(PATH_API_LOAN_REQUEST, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                requestsList: response.data
            });
        }).catch();

    },

    shouldUpdate(){
        axios.get(PATH_API_LOAN_REQUEST, {
            headers: createAuthorizationTokenHeader()
        }).then(response => {
            this.setState({
                requestsList: response.data
            });
            console.log("Updated")
        }).catch();
    },


    getInitialState() {

        return {
            requestsList: [],
        }

    },


    render() {
        return (
            <div>
                <Tabs>
                    <Tab label="Новые" >
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList.filter((req)=>req.loanRequestStatus === "NOT_REVIEWED")}/>
                    </Tab>
                    <Tab label="Одобренные"  >
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList.filter((req)=>req.loanRequestStatus === "APPROVED")}/>
                    </Tab>
                    <Tab label="Отклоненные"  >
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList.filter((req)=>req.loanRequestStatus === "REJECTED")}/>
                    </Tab>
                    <Tab label="Все" value={3} >
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList}/>
                    </Tab>
                </Tabs>
            </div>
        )
    }
})

export default ManagerLoanRequests;