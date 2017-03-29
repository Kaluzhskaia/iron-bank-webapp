import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import axios from 'axios';
import {browserHistory} from 'react-router';
import {PATH_AUTH, TOKEN} from '../constants.js';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const muiTheme = getMuiTheme({});
const LoginForm = React.createClass({

    getInitialState() {
        return {
            username: "",
            password: "",
            role: 1,
            errorMessage: ""
        }
    },

    handleChange(e) {
        if (e.target.name == "username") {
            this.setState({username: e.target.value});
            this.setState({errorMessage: ""});
        }
        if (e.target.name == "password") {
            this.setState({password: e.target.value});
            this.setState({errorMessage: ""});
        }
        if (e.target.name == "dropRole") {
            this.setState({role: e.target.value});
            this.setState({errorMessage: ""});
        }
    },

    handleTouchTap: function (e) {
        this.login();
    },

    login: function () {
        axios.post(PATH_AUTH,
            {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                this.setState({errorMessage: ""});
                localStorage.setItem(TOKEN, response.data.token);
                // localStorage.setItem('userId', response.data.id);
                browserHistory.push('/');
            })
            .catch(response => {
                this.setState({errorMessage: "Неправильно введен username или пароль. Попробуйте еще раз"});
            });
    },

    render: function () {
        return (
            <div className="login-form">
                <div className="label">Вход</div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Paper zDepth={2}>
                        <form>
                            <TextField name='username' ref='username' hintText="Email"
                                       style={{width: '360px', margin: '20px'}} onChange={this.handleChange}/>
                            <TextField name='password' ref='password' hintText="Password" type="password"
                                       style={{width: '360px', margin: '20px', marginTop: '0px'}}
                                       onChange={this.handleChange}/>
                            <div>
                                <RaisedButton
                                    primary={true}
                                    style={{width: '400px'}}
                                    label="Войти"
                                    onTouchTap={this.handleTouchTap}
                                />
                            </div>
                            <div className="error-message">{this.state.errorMessage}</div>
                        </form>
                    </Paper>
                </MuiThemeProvider>
                <Link to="/registration">
                    <RaisedButton
                        primary={true}
                        style={{width: '400px', marginTop: '40px'}}
                        label="Регистрация"
                    />
                </Link>
            </div>
        );
    }
});

export default LoginForm;