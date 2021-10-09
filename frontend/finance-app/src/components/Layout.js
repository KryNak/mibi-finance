import React from 'react'
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import PrivateRoute from './PrivateRoute'

export default function Layout() {

    return (
        <Router>
            <Switch>
                <Route exact path='/login' render={(props) => <Login {...props} />}></Route>
                <PrivateRoute path='/dashboard' component={Dashboard}></PrivateRoute>
                <Redirect to="/login"></Redirect>
            </Switch>
        </Router>
    )
}
