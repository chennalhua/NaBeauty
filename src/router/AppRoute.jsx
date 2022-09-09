import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//view page
import HomePage from '../view/HomePage'

const AppRoute = () => {
    return (
        <>
            <Router>
                <Route exact path='/'><HomePage /></Route>
            </Router>
        </>
    )
}
export default AppRoute