/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Loadable';

import GlobalStyle from '../../global-styles';

const PREFIX = process.env.NODE_ENV === 'production' ? '/index.html' : '';

export default function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route exact path={`${PREFIX}/`} component={Dashboard} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
