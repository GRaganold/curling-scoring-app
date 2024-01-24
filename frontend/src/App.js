import React from 'react';
import Game from './components/Game';
import { Box,  } from '@chakra-ui/react';




export default function App() {

  return (
    <>

      <br />
      <br />
      <br />
      <br />
      <p> Hello</p>
      <br />
      <Box p={1}>
        <Game />
      </Box>
    </>
  );
}
