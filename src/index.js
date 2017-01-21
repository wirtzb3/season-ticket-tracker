import React, { Component } from 'react';
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './components/App';
import MatchDetail from './components/MatchDetail'
import store, { history } from './store/configure-store'
import { fetchMatches } from './actions/matches-actions'
import './styles/index.css';

store.dispatch(fetchMatches())

const Root = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App} />
        <Route path="/matches/:matchId" component={MatchDetail} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
