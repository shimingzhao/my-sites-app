import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Navbar } from './components/navbar';
import { SitesPage } from './pages/sitesPage';
import { SingleSitePage } from './pages/singleSitePage';

export const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/sites" component={SitesPage} />
        <Route exact path="/sites/:id" component={SingleSitePage} />
        <Redirect to="/sites" />
      </Switch>
    </Router>
  )
}
