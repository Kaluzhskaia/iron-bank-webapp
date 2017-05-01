/**
 * Created by Mikhail Falaleev on 30.04.2017.
 */
import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
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
            userInfo: {
                slideIndex: 0,
            },
        }

    },

    handleChange(value){
        this.setState({
            slideIndex: value,
        });
    },

    isNew(loanRequest) {
    return loanRequest.loanRequestStatus === "NOT_REVIEWED";
    },

    isA(loanRequest) {
        return loanRequest.loanRequestStatus === "NOT_REVIEWED";
    },
    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab label="Новые" value={0} />
                    <Tab label="Одобренные" value={1} />
                    <Tab label="Отклоненные" value={2} />
                    <Tab label="Все" value={3} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList.filter((req)=>req.loanRequestStatus === "NOT_REVIEWED")}/>
                    </div>
                    <div>
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList.filter((req)=>req.loanRequestStatus === "APPROVED")}/>
                    </div>
                    <div>
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList.filter((req)=>req.loanRequestStatus === "REJECTED")}/>
                    </div>
                    <div>
                        <RequestGrid shouldUpdate={this.shouldUpdate} requestsList={this.state.requestsList}/>
                    </div>
                </SwipeableViews>
            </div>
        )
    }
})

export default ManagerLoanRequests;