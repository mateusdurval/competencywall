import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRout = props => {
    const isLogged = !localStorage.getItem('app-token')
    return isLogged ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRout