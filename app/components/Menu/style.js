import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  button {
    font-size: 1rem;
    text-align: center;
    color: #ff703a;
    width: 100px;
    height: 30px;
    cursor: pointer;
    transition: 0.3s;
    text-transform: uppercase;
    &.active,
    &:hover {
      border-bottom: 2px solid #ff703a;
    }
  }
`;

export default StyledWrapper;
