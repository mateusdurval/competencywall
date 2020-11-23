import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'

import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Home from './pages/Home'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={Welcome} />
                <Route path="/register" component={Register} />
                <PrivateRoute componenet={Home} path="/home" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes