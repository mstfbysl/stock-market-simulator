import React from 'react';
import { Box, Flex, Spacer, Button, Icon, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHome, FiCoffee } from 'react-icons/fi';

function Navbar() {
  const { t, i18n } = useTranslation();

  const buyMeACoffee = () => {
    window.open('https://buymeacoffee.com/mbaysal', '_blank');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Box boxShadow="md" p={4}>
      <Flex align="center">
        Stock Market Simulator
        <Spacer />
        <Button as={ReactRouterLink} to="/" variant="ghost" mr={2} leftIcon={<Icon as={FiHome} />}>
          {t('home')}
        </Button>
        <Button onClick={buyMeACoffee} variant="ghost" mr={2} leftIcon={<Icon as={FiCoffee} />}>
          {t('buyMeACoffee')}
        </Button>
        <Menu>
          <MenuButton as={Button} variant="ghost">
            Language
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
            <MenuItem onClick={() => changeLanguage('tr')}>Turkish</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}

export default Navbar;
