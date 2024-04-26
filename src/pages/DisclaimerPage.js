import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function DisclaimerPage() {
  const { t } = useTranslation(); // Initialize the useTranslation hook

  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>{t('disclaimerTitle')}</Heading>
      <Text>
        {t('disclaimerText')}
      </Text>
    </Box>
  );
}

export default DisclaimerPage;
