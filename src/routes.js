import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import SavedArticles from './Components/SavedArticles/SavedArticles';
import MyAccount from './Components/MyAccount/MyAccount';
import SingleArticle from './Components/SingleArticle/SingleArticle';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/register' component={Register} />
        <Route path='/home' component={Home} />
        <Route path='/savedarticles' component={SavedArticles} />
        <Route path='/singlearticle' component={SingleArticle} />
        <Route path='/myaccount' component={MyAccount} />
    </Switch>
)
