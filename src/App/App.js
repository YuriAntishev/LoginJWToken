import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from '../_helpers/history.js';
import { authenticationService } from '../_services/authentication.service';
import { PrivateRoute } from '../_components/PrivateRoute.js';
import { HomePage } from '../HomePage/HomePage.js';
import { LoginPage } from '../LoginPage/LoginPage.js';
import Navbar from '../Navbar/Navbar.js';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser && <Navbar onClick={this.logout} />}
                    <div>
                        <div className="container">
                            <div className="row">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App }; 