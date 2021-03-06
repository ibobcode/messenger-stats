/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { CSSTransition } from 'react-transition-group';
import { Icon, Step, Button } from 'semantic-ui-react';
import { Eye } from 'react-preloading-component';
import History from 'components/History';
import Average from 'components/Average';
import Ranking from 'components/Ranking';
import Menu from 'components/Menu';
import warn from 'images/warn.png';
import StyledWrapper from './style';
import messages from './messages';
import { makeSelectDashboard } from './selectors';
import reducer from './reducer';
import { init, changeUsersFilter } from './actions';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedGraph: 0,
    };
    this.props.init();
  }

  render() {
    const graphSelector = {
      history: (
        <History
          conv={
            this.props.dashboard.conversations[this.props.dashboard.activeConv]
          }
          filter={this.props.dashboard.usersFilter}
        />
      ),
      average: (
        <Average
          conv={
            this.props.dashboard.conversations[this.props.dashboard.activeConv]
          }
          filter={this.props.dashboard.usersFilter}
        />
      ),
      ranking: (
        <Ranking
          conv={
            this.props.dashboard.conversations[this.props.dashboard.activeConv]
          }
          filter={this.props.dashboard.usersFilter}
        />
      ),
    };
    return (
      <StyledWrapper>
        <CSSTransition
          in={
            this.props.dashboard.status > -1 && this.props.dashboard.status < 5
          }
          timeout={300}
          classNames="loading-screen-anim"
          unmountOnExit
          // onExited={}
        >
          {this.props.dashboard.status > 0 ? (
            <div className="loading-screen">
              <h1>MESSENGER STATS</h1>
              <Step.Group>
                <Step
                  completed={this.props.dashboard.status > 1}
                  disabled={this.props.dashboard.status <= 1}
                  active={this.props.dashboard.status === 1}
                >
                  <Icon name="facebook messenger" />
                  <Step.Content>
                    <Step.Title>
                      <FormattedMessage {...messages.step1Title} />
                    </Step.Title>
                    <Step.Description>
                      <FormattedMessage {...messages.step1Body} />
                    </Step.Description>
                  </Step.Content>
                </Step>
                <Step
                  completed={this.props.dashboard.status > 2}
                  disabled={this.props.dashboard.status <= 2}
                  active={this.props.dashboard.status === 2}
                >
                  <Icon name="database" />
                  <Step.Content>
                    <Step.Title>
                      <FormattedMessage {...messages.step2Title} />
                    </Step.Title>
                    <Step.Description>
                      <FormattedMessage {...messages.step2Body} />
                    </Step.Description>
                  </Step.Content>
                </Step>
                <Step
                  completed={this.props.dashboard.status > 3}
                  disabled={this.props.dashboard.status <= 3}
                  active={this.props.dashboard.status === 3}
                >
                  <Icon name="conversation" />
                  <Step.Content>
                    <Step.Title>
                      <FormattedMessage {...messages.step3Title} />
                    </Step.Title>
                    <Step.Description>
                      <FormattedMessage {...messages.step3Body} />
                    </Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
              <Eye color="#FFFFFF" size={50} />
              <span className="footer">BY DYLAN HEIRSTRAETEN</span>
            </div>
          ) : (
            <div className="error">
              <img alt="WARNING" src={warn} />
              <h2>{this.props.dashboard.error.message}</h2>
              <a
                className="action"
                target={this.props.dashboard.error.target}
                href={this.props.dashboard.error.link}
              >
                {this.props.dashboard.error.action}
              </a>
              <Button
                content="By clicking here"
                icon="mail"
                label={{
                  as: 'a',
                  basic: true,
                  pointing: 'right',
                  content:
                    'If the problem persists, do not hesitate to contact me',
                }}
                labelPosition="left"
                onClick={() =>
                  window.open('mailto:dylan.heirstraeten@epitech.eu', '_blank')
                }
              />
              <Button
                content="By clicking here"
                icon="github"
                label={{
                  as: 'a',
                  basic: true,
                  pointing: 'right',
                  content: 'Or directly open an issue on the github repository',
                }}
                labelPosition="left"
                onClick={() =>
                  window.open(
                    'https://github.com/ibobcode/messenger-stats/issues',
                    '_blank',
                  )
                }
              />
            </div>
          )}
        </CSSTransition>
        {this.props.dashboard.status > 3 ? (
          <div className="dashboard">
            <Menu
              titles={Object.keys(graphSelector)}
              selectedGraph={this.state.selectedGraph}
              usersFilter={this.props.dashboard.usersFilter}
              onChangeGraph={selectedGraph => this.setState({ selectedGraph })}
              onChangeUsersFilter={this.props.changeUsersFilter}
              conv={
                this.props.dashboard.conversations[
                  this.props.dashboard.activeConv
                ]
              }
            />
            <div className="graph-container">
              {Object.values(graphSelector)[this.state.selectedGraph]}
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="contact">
          <Icon
            name="github"
            color="grey"
            onClick={() =>
              window.open(
                'https://github.com/ibobcode/messenger-stats',
                '_blank',
              )
            }
          />
          <Icon
            name="mail"
            color="grey"
            onClick={() =>
              window.open('mailto:dylan.heirstraeten@epitech.eu', '_blank')
            }
          />
        </div>
      </StyledWrapper>
    );
  }
}

Dashboard.propTypes = {
  init: PropTypes.func.isRequired,

  dashboard: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    init: bindActionCreators(init, dispatch),
    changeUsersFilter: bindActionCreators(changeUsersFilter, dispatch),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
