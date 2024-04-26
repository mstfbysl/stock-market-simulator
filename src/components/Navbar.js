import React from 'react';
import {
  Box,
  Flex,
  Spacer,
  Button,
  Icon,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { FiHome, FiCoffee } from 'react-icons/fi';



function Navbar() {

  const buyMeACoffe = () => {
    window.open('https://buymeacoffee.com/mbaysal', '_blank');
  }

  return (
    <Box boxShadow="md" p={4}>
      <Flex align="center">
        Stock Market Simulator
        <Spacer />
        <Button as={ReactRouterLink} to="/" variant="ghost" mr={2} leftIcon={<Icon as={FiHome} />}>
          Home
        </Button>
        <Button onClick={buyMeACoffe} variant="ghost" mr={2} leftIcon={<Icon as={FiCoffee} />}>
          Buy me a coffee
        </Button>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>
    </Box>
  );
}

export default Navbar;
