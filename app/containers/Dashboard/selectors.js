import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.get('dashboard', initialState);

/**
 * Other specific selectors
 */

const selectConversations = state =>
  state.getIn(['dashboard', 'conversations'], initialState);

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, dashboard => dashboard);

export { makeSelectDashboard, selectConversations };
