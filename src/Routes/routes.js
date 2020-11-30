import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Welcome from '../pages/Welcome'
import Register2 from '../pages/Register2'

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
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Welcome} />
                <Route path="/register2" component={Register2} />
                <PrivateRoute path="/app" component={() => <h1>App</h1>} />

                <Route path="*" component={() => <h1>Page not found</h1>} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes