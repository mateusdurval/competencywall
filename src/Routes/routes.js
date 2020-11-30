import React from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { history } from './history'

import Welcome from '../pages/Welcome'
import Register from '../pages/Register'
import Home from '../pages/Home'

import { isAuthenticated } from "../services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />
  );

const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact={true} path="/" component={Welcome} />
                <Route path="/register" component={Register} />
                <PrivateRoute path="/app" component={Home} />

                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </Router>
    )
}

export default Routes