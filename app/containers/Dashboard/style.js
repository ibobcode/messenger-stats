import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .loading-screen {
    h1 {
      color: white;
      font-size: 3rem;
    }
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 20px;

    background-color: #ff703a;
    position: absolute;
    z-index: 500;
    height: 100%;
    width: 100%;
    .steps {
      min-height: 70px;
    }
  }
  .loading-screen-anim {
    display: inline-block;
    margin-left: 0.5rem;
    transform: scale(1);
  }
  .loading-screen-anim-enter {
    opacity: 0;
    transform: scale(0.35);
  }
  .loading-screen-anim-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 300ms ease-out;
  }
  .loading-screen-anim-exit {
    opacity: 1;
    transform: scale(1);
  }
  .loading-screen-anim-exit-active {
    opacity: 0;
    transform: scale(4);
    transition: all 300ms ease-in;
  }
  .error {
    background-color: #ff703a;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 100%;
    color: white;
    text-align: center;
    img {
      height: auto;
      width: 70px;
    }
    .button {
      margin: 5px 0;
      &:hover {
        cursor: pointer;
      }
    }
    .action {
      color: white;
      text-decoration: underline;
      margin-bottom: 50px;
    }
  }
  .footer {
    position: absolute;
    /* right: 10px; */
    bottom: 5px;
    color: white;
    font-size: 1rem;
    font-weight: bold;
  }
  .dashboard {
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .graph-container {
      flex-grow: 1;
      width: 100%;
      background-color: white;
      box-shadow: 0 0 6px #0000000d;
      border-radius: 10px;
    }
  }
  .contact {
    position: absolute;
    top: 4px;
    right: 4px;
    .icon {
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
    &::after {
      content: 'BETA';
      color: #ff703a;
      position: absolute;
      right: 4px;
      bottom: -20px;
    }
  }
`;

export default StyledWrapper;
