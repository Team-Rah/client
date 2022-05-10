import React from 'react';
import List from '@mui/material/List';
import styled from 'styled-components';

export default function LobbyChatRoom() {
  return (
    <StyledChatBox>
      INSIDE HERE IS THE CHAT... INSIDE HERE IS THE CHAT... INSIDE HERE IS THE CHAT... INSIDE HERE
      IS THE CHAT... INSIDE HERE IS THE CHAT... INSIDE HERE IS THE CHAT...
    </StyledChatBox>
  );
}

const StyledChatBox = styled(List)`
  border: 1px solid black;
  margin-top: 1em;
  min-width: 100%;
  min-height: 60%;
  overflow: auto;
  padding: 7px;
`;
