import styled from 'styled-components';

const StyledWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  .pie-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .line-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    bottom: 0;
  }
`;

export default StyledWrapper;
