import React from 'react';
import {Link} from 'react-router';

const Logo = React.createClass({

    render: function () {
        return (
            <Link to="/">
                <div className="logo">
                    <img className="logoImg" src="img/logo-white.png"/>
                    <div><img src="img/tagline.png"/> </div>
                </div>
            </Link>
        );
    }
});

export default Logo;