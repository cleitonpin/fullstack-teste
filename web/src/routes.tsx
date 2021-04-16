import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/landing';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Landing}/>
        </BrowserRouter>
    )
}