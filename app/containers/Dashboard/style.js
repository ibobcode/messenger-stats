import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  .loading-screen {
    position: fixed;
    z-index: 100;
    background-color: #ff703a;
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .steps {
      min-height: 70px;
    }
    &::after {
      content: 'MADE BY DYLAN HEIRSTRAETEN';
      position: absolute;
      /* right: 10px; */
      bottom: 5px;
      color: white;
      font-size: 0.8rem;
    }
  }
  .loading-screen-anim {
    display: inline-block;
    margin-left: 0.5rem;
    transform: scale(1.25);
  }
  .loading-screen-anim-enter {
    opacity: 0.01;
    transform: translateY(-100%) scale(0.75);
  }
  .loading-screen-anim-enter-active {
    opacity: 1;
    transform: translateY(0%) scale(1.25);
    transition: all 300ms ease-out;
  }
  .loading-screen-anim-exit {
    opacity: 1;
    transform: scale(1.25);
  }
  .loading-screen-anim-exit-active {
    opacity: 0;
    transform: scale(4);
    transition: all 300ms ease-in;
  }
  .not-on-messenger h1 {
    color: white;
    text-align: center;
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
`;

export default StyledWrapper;
