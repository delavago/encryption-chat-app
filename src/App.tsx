import React, { useState } from 'react';
import styled from 'styled-components';
import "@fontsource/poppins"
import InitialCard from './InitialCard';
import ChatUI from './ChatUI';

function App() {

  let [page, setPage] = useState<string>("login");

  return (
    <PageContainer >
      {page==="login"&&<InitialCard changeComponent={()=>setPage("chat")}/>}
      {page==="chat"&&<ChatUI/>}
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
