import React from 'react';
// import PropTypes from 'prop-types';
import StyledWrapper from './style';

function Menu(props) {
  return (
    <StyledWrapper className="menu" {...props}>
      {props.titles.map((title, i) => (
        <button
          type="button"
          className={props.selectedGraph === i ? 'active' : ''}
          onClick={() => props.onChangeGraph(i)}
        >
          {title}
        </button>
      ))}
    </StyledWrapper>
  );
}

Menu.propTypes = {};

export default Menu;
