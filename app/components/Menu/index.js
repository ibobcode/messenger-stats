import React from 'react';
import PropTypes from 'prop-types';
import StyledWrapper from './style';

export class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerA: false,
      activeId: null,
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
  }

  handleButtonPress(val) {
    this.setState({
      triggerA: false,
      activeId: val,
    });
    this.buttonTapTimer = setTimeout(() => {
      if (this.state.activeId) {
        this.setState({
          triggerA: true,
          activeId: val,
        });
      }
    }, 200);
    this.buttonHoldTimer = setTimeout(() => {
      if (this.state.triggerA) {
        this.props.onChangeUsersFilter(val, true);
        this.setState({
          triggerA: false,
          activeId: null,
        });
      }
    }, 900);
  }

  handleButtonRelease() {
    if (this.state.activeId && !this.state.triggerA) {
      this.props.onChangeUsersFilter(this.state.activeId, false);
    }
    this.setState({
      triggerA: false,
      activeId: null,
    });
    clearTimeout(this.buttonTapTimer);
    clearTimeout(this.buttonHoldTimer);
  }

  render() {
    return (
      <StyledWrapper className="menu">
        <h1>{this.props.conv.name}</h1>
        <div className="menu-filters">
          {Object.values(this.props.usersFilter).map(user => (
            <div
              key={user.id}
              className={`${user.status ? '' : 'inactive'} ${
                this.state.activeId === user.id && this.state.triggerA
                  ? 'loading'
                  : ''
              } pic-container`}
              onMouseDown={() => this.handleButtonPress(user.id)}
              onMouseUp={this.handleButtonRelease}
              onMouseLeave={this.handleButtonRelease}
            >
              <div className="wrapper">
                <div className="spinner-container">
                  <div className="spinner pie" />
                </div>
                <div className="filler pie" />
                <div className="mask" />
              </div>
              <img alt="Profile pic" src={this.props.conv.data[user.id].pic} />
            </div>
          ))}
        </div>
        <div className="menu-navigation">
          {this.props.titles.map((title, i) => (
            <button
              key={title}
              type="button"
              className={this.props.selectedGraph === i ? 'active' : ''}
              onClick={() => this.props.onChangeGraph(i)}
            >
              {title}
            </button>
          ))}
        </div>
      </StyledWrapper>
    );
  }
}

Menu.propTypes = {
  conv: PropTypes.object.isRequired,
  titles: PropTypes.array.isRequired,
  usersFilter: PropTypes.object.isRequired,
  selectedGraph: PropTypes.number.isRequired,
  onChangeGraph: PropTypes.func.isRequired,
  onChangeUsersFilter: PropTypes.func.isRequired,
};

export default Menu;
