import React from 'react';
import { Box, Container, Text, Link, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaGithub, FaHeart } from 'react-icons/fa'; // Using react-icons for the heart icon
import { Link as ReactRouterLink } from 'react-router-dom'; // Importing ReactRouterLink for internal navigation

function Footer() {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
      <Container>
        <VStack spacing={1}>
          <HStack spacing={2} justifyContent="center">
            <Text fontSize="sm">Made with</Text>
            <Icon as={FaHeart} color="red.500" />
            <Text fontSize="sm">by the <Link href="https://www.github.com/mstfbysl" target="_blank" rel="noopener noreferrer">mstfbysl</Link></Text>
          </HStack>
          <Text fontSize="sm">For disclaimers, please visit <Link as={ReactRouterLink} to="/disclaimer">here</Link></Text>
        </VStack>
      </Container>
    </Box>
  );
}

export default Footer;
