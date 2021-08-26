import React, { useState } from "react";
import ReactDOM from "react-dom";

import theme from "./theme";
import {
  ChakraProvider,
  ColorModeScript,
  Button,
  Box,
  Container,
  HStack,

  Heading,
} from "@chakra-ui/react";
import ServerlessCloudLogo from './assets/serverless-cloud-text.svg'

import reportWebVitals from "./reportWebVitals";

import { Incidents } from "./Incidents";
import { Services } from "./Services";
import { useLocalStorage } from "react-use";
import { Login } from "./Login";

const App = () => {
  const [activePage, setActivePage] = useState('/')
  const [storedPassword] = useLocalStorage('serverless-status', '');
  const isLoggedIn = !!storedPassword

  const logout = () => {
    localStorage.removeItem("serverless-status");
    window.location.reload();
  };



  return (

    <Box minHeight="100vh">
      {

        <Box p={5} borderBottomWidth="1px">
          <Container maxW="container.lg">
            <HStack justifyContent="space-between">
                <img src={ServerlessCloudLogo} style={{ maxWidth: '200px' }} alt="Serverless Cloud" onClick={() => setActivePage('/')}/>
              Ç
              {isLoggedIn ?
                <Button onClick={logout}>Logout</Button>
                :
                <Button onClick={() => setActivePage('/login')}>Login</Button>
              }

            </HStack>
          </Container>
        </Box>
      }
      <Container maxW="container.lg">
        {activePage === '/' ?
          <>
            <Services />
            <Incidents />
          </>
          : activePage === '/login' ? <Login /> : null}


      </Container>
    </Box>

  );
};

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
