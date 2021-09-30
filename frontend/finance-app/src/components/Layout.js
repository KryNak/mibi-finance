import React, {useEffect, useState} from 'react'
import {Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import Login from './Login'
import Dashboard from './Dashboard'
import PrivateRoute from '../PrivateRoute'

export default function Layout() {

    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        setIsAuth(false)
    }, [])
    
    const login = () => {

    }

    const logout = () => {
        
    }

    return (
        <Router>
            <Switch>
                <Route exact={true} path='/login' render={(props) => <Login {...props} />}></Route>
                <PrivateRoute exact path='/dashboard' auth={isAuth} component={Dashboard}></PrivateRoute>
                <Redirect to="/login"></Redirect>
            </Switch>
        </Router>
    )
}
