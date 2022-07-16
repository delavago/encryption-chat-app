import React from 'react';
import styled from 'styled-components';
import "@fontsource/poppins"
import InitialCard from './InitialCard';

function App() {
  return (
    <PageContainer >
      <InitialCard/>
    </PageContainer>
  );
}

let PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
