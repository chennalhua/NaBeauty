import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//view page
import HomePage from '../view/HomePage'
import NoFound from '../view/NoFound';

const AppRoute = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path='/'><HomePage /></Route>
                    <Route exact path='*'><NoFound /></Route>
                </Switch>
            </Router>
        </>
    )
}
export default AppRoute