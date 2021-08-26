import { Alert, AlertIcon, Box, Button, Center, Heading, Input, VStack } from "@chakra-ui/react"
import { useState } from "react"

import { useLocalStorage } from "react-use";
import { apiClient } from "./api";
import { Collapsible } from "./components/Collapsible";
import ServerlessCloudLogo from './assets/serverless-cloud-text.svg'
import CloudDots from './assets/cloud-dots.svg'

export const Login = () => {

    const [, setStoredPassword] = useLocalStorage('serverless-status', '');
    const [password, setPassword] = useState('')
    const [loading, setloading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const login = async () => {
        if (!password) {
            setErrorMessage('Please enter password value')
            return
        }


        try {
            setloading(true)
            await apiClient({ url: 'auth', password })

            setStoredPassword(password)
            window.location.href = '/'
        } catch (e) {
            
            setErrorMessage(e.message)

        }
        setloading(false)
    }
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
              <Box
               position="absolute"
               left="0"
               top="350px"
               z-index="-1"
               display="flex"
               justifyContent="space-between"
               width="100%"
               css={{
                   'img:nth-child(2)': {
                    '-webkit-transform': 'scaleX(-1)',
                    transform: 'scaleX(-1)'
                   }
               }}
              >
        <img src={CloudDots} alt="Serverless Cloud" />
        <img src={CloudDots} alt="Serverless Cloud" />
      </Box>
            <Center h="100vh" color="white">
                
                <VStack spacing="24px" >
                <img src={ServerlessCloudLogo} alt="Serverless Cloud" />

                    <Heading size="xl" fontSize="80px">status.serverless.com</Heading>
                    <Heading size="lg">Login</Heading>
                    <Input placeholder="Password" type="password" 
                    maxWidth="400px"
                    onChange={e => {
                        setPassword(e.target.value)
                        setErrorMessage('')
                    }}
                        onKeyUp={(event) => {
                            if (event.key === "Enter") {
                                login()
                            }
                        }}
                    />
                    <Button 
                    maxWidth="400px"
                    isLoading={loading} onClick={login} size="md" width="100%" colorScheme="brand" color="#fff">Login</Button>
                    <Collapsible collapsed={!errorMessage}>
                        <Alert status="error">
                            <AlertIcon />
                            {errorMessage}
                        </Alert>
                    </Collapsible>

                </VStack>
            </Center>


        </Box >
    )
}

