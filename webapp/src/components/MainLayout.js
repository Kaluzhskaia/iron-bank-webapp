import React from 'react';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';

import Logo from './Logo';
import UserInfo from './UserInfo';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
const GroupIcon = <FontIcon className="material-icons">group</FontIcon>;
const EmailIcon = <FontIcon className="material-icons">face</FontIcon>;
import {browserHistory} from 'react-router';
import {PATH_API_USER, ROLES} from '../constants.js';
import axios from 'axios';
import {createAuthorizationTokenHeader} from '../utils.js'


const muiTheme = getMuiTheme({});

const MainLayout = React.createClass({
    getInitialState() {
        return {
            userInfo: {
                username: "",
                firstName: "",
                lastName: "",
                birthday: "",
                city: "",
                email: "",
                imagePath: "",
                skills: [],
                wish: [],
            },
        }
    },

    componentWillMount(){


        if (localStorage.getItem('token') == null) {
            browserHistory.push('login')
        } else{
            //browserHistory.push('/chats');
            axios.get(PATH_API_USER, {
                headers: createAuthorizationTokenHeader()
            }).then(response => {
                this.setState({
                    userInfo: response.data
                }                );
            }).catch(
                this.setState({
                userInfo: {firstName: "Can not get name"}
                })
            );

        };

    },
    renderChild(){
        var child = null;
        if (this.props.children.type.displayName=="UserEditor") {
            child=React.cloneElement(
              this.props.children, {
                  firstName: this.state.userInfo.firstName,
                  lastName: this.state.userInfo.lastName,
                  birthday:this.state.userInfo.birthday,
                  city:this.state.userInfo.city,
                  email:this.state.userInfo.email,
                  imagePath: this.state.userInfo.imagePath,
                  skills:this.state.userInfo.skills,
                  wish:this.state.userInfo.wish,
                  shouldUpdate:this.handleShouldUpdate
              })
        }
        else if (this.props.children.type.displayName=="Home") {
            child=React.cloneElement(
                this.props.children, {
                    skills:this.state.userInfo.skills,
                    wish:this.state.userInfo.wish,
                })
        } else {
            child = this.props.children;
        }
        return child;
    },


    render: function () {

        const roles = localStorage.getItem(ROLES);

        var menuItems = [];

        if (roles)
            if (roles.includes("ROLE_ADMIN"))
                menuItems = [
                    {
                        id: 1,
                        linkTo:  "/",
                        label: "Админ",
                        icon: GroupIcon
                    },
                    {
                        id: 2,
                        linkTo:  "/",
                        label: "Админ2",
                        icon: GroupIcon
                    }
                ];
            else if (roles.includes("ROLE_MANAGER"))
                menuItems = [
                    {
                        id: 1,
                        linkTo:  "/",
                        label: "Заявки",
                        icon: GroupIcon
                    },
                    {
                        id: 2,
                        linkTo:  "/",
                        label: "Кредиты",
                        icon: GroupIcon
                    },
                    {
                        id: 3,
                        linkTo:  "/manager-collector",
                        label: "Коллекторы",
                        icon: GroupIcon
                    }
                ];
            else if (roles.includes("ROLE_COLLECTOR"))
                menuItems = [
                    {
                        id: 1,
                        linkTo:  "/",
                        label: "Коллектор",
                        icon: GroupIcon
                    },
                    {
                        id: 2,
                        linkTo:  "/",
                        label: "Коллектор2",
                        icon: GroupIcon
                    }
                ];
            else if (roles.includes("ROLE_CLIENT"))
                menuItems = [
                    {
                        id: 1,
                        linkTo:  "/",
                        label: "Подать завявку",
                        icon: GroupIcon
                    },
                    {
                        id: 2,
                        linkTo:  "/my-requests",
                        label: "Заявки",
                        icon: GroupIcon
                    },
                    {
                        id: 3,
                        linkTo:  "/my-loans",
                        label: "Кредит",
                        icon: GroupIcon
                    }
                ];
            else
                menuItems =  [];

            const menu = menuItems ?
                menuItems.map(menuItem=><Link to={menuItem.linkTo} key={menuItem.id}>
                                            <BottomNavigationItem
                                            label={menuItem.label}
                                            icon={menuItem.icon}/>
                                        </Link>)
                :<div/>;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>

                 <Paper className="app" zDepth={0}>

                    <Paper zDepth={0} className="center-panel">
                        {this.props.children}
                    </Paper>


                     <Paper className="left-panel" zDepth={0}>

                        <Logo />

                        <UserInfo
                          firstName={this.state.userInfo.firstName}
                          lastName = {this.state.userInfo.lastName}
                          birthday = {this.state.userInfo.birthday}
                          city = {this.state.userInfo.city}
                          email = {this.state.userInfo.email}
                          imagePath={this.state.userInfo.imagePath}
                          skills = {this.state.userInfo.skills}
                          wish = {this.state.userInfo.wish}
                        />

                         <div className="test-ul">
                             <BottomNavigation className="bottom-navigation">
                                 {menu}
                             </BottomNavigation>

                         </div>

                    </Paper>

                </Paper>
            </MuiThemeProvider>
        );
    }
});

export default MainLayout;
