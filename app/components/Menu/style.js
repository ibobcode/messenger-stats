import styled, { keyframes } from 'styled-components';

export const rota = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const fill = keyframes`
  0%        { opacity: 0; }
  50%, 100% { opacity: 1; }
`;
export const mask = keyframes`
  0%        { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

const StyledWrapper = styled.div`
  padding-bottom: 10px;
  position: relative;
  h1 {
    font-size: 2rem;
    color: #ff703a;
    text-transform: uppercase;
    margin: 0;
    text-align: center;
  }
  .menu-navigation {
    background-color: white;
    box-shadow: 0 0 6px #0000000d;
    border-radius: 10px;
    justify-content: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    button {
      height: 40px;
      font-size: 1rem;
      text-align: center;
      color: #ff703a;
      width: 100px;
      cursor: pointer;
      transition: 0.2s;
      text-transform: uppercase;
      background-color: #fff;
      &.active,
      &:hover {
        background-color: #ff703a;
        color: #fff;
      }
    }
  }
  .menu-filters {
    justify-content: center;
    display: flex;
    flex-direction: row;
    position: relative;
    &:hover {
      &::after {
        opacity: 1;
      }
    }
    &::after {
      content: 'Click to select / Hold to highlight';
      color: #ff703a;
      font-size: 0.7rem;
      position: absolute;
      bottom: 0;
      opacity: 0;
      transition: 0.3s;
    }
    .pic-container {
      position: relative;
      .wrapper {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
        background: white;
        position: absolute;
      }
      .pie {
        width: 50%;
        height: 100%;
        position: absolute;
        background: #ff703a;
      }
      .spinner-container {
        width: 100%;
        height: 100%;
        position: absolute;
        .spinner {
          border-radius: 125px 0 0 125px;
          z-index: 200;
          right: 50%;
        }
      }
      .filler {
        border-radius: 0 125px 125px 0;
        z-index: 100;
        border-left: none;
        left: 50%;
        opacity: 0;
      }
      .mask {
        width: 50%;
        height: 100%;
        position: absolute;
        z-index: 300;
        opacity: 1;
        background: inherit;
      }
      border-radius: 50%;
      background-color: red;
      margin: 5px 5px 25px 5px;
      width: 35px;
      height: 35px;
      transition: 0.2s;
      &.inactive {
        opacity: 0.2;
      }
      &.loading {
        img {
          transform: scale(0.8);
        }
        .spinner-container {
          animation: ${rota} 0.7s linear;
        }
        .filler {
          animation: ${fill} 0.7s steps(1, end);
        }
        .mask {
          animation: ${mask} 0.7s steps(1, end);
        }
      }
      img {
        position: absolute;
        z-index: 400;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        transition: 0.2s;
      }
      &:hover {
        cursor: pointer;
        transform: scale(1.2);
      }
    }
  }
`;

export default StyledWrapper;
