import React from 'react';
import { Button, Text, VStack, HStack, Input, useToast, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

import { calculateInvest } from '../services/calculateInvest';

function StockSelectionForm({ onSubmit }) {
  const { t } = useTranslation(); // Initialize the useTranslation hook
  const [selectedStock, setSelectedStock] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [startYear, setStartYear] = useState('');

  const handleSubmit = () => {
    if (!selectedStock || !monthlyInvestment || !startYear) {
      toast({
        title: t('errorTitle'), // Translate the title
        description: t('errorMessage'), // Translate the error message
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit(selectedStock, monthlyInvestment, startYear);
  };

  const toast = useToast();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - i).reverse();

  return (
    <VStack spacing={4} align="start">

      <Text>{t('selectStock')}</Text> {/* Translate the 'Which stock would you like to invest in?' text */}
      <HStack>
        <Button colorScheme={selectedStock === 'AMZN' ? 'purple' : 'gray'} onClick={() => setSelectedStock('AMZN')}>
          AMZN
        </Button>
        <Button colorScheme={selectedStock === 'AAPL' ? 'purple' : 'gray'} onClick={() => setSelectedStock('AAPL')}>
          AAPL
        </Button>
        <Button colorScheme={selectedStock === 'GOOG' ? 'purple' : 'gray'} onClick={() => setSelectedStock('GOOG')}>
          GOOG
        </Button>
        <Button colorScheme={selectedStock === 'MSFT' ? 'purple' : 'gray'} onClick={() => setSelectedStock('MSFT')}>
          MSFT
        </Button>
        <Button colorScheme={selectedStock === 'SBUX' ? 'purple' : 'gray'} onClick={() => setSelectedStock('SBUX')}>
          SBUX
        </Button>
      </HStack>
      <Text>{t('selectStartYear')}</Text> {/* Translate the 'Select start year of investment:' text */}
      <Select placeholder={t('selectYear')} value={startYear} onChange={(e) => setStartYear(e.target.value)}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
      <Text>{t('monthlyInvestment')}</Text> {/* Translate the 'How much money will you invest each month?' text */}
      <Input
        placeholder={t('placeholder')}
        value={monthlyInvestment}
        onChange={(e) => setMonthlyInvestment(e.target.value)}
        type="number"
      />
      <Button colorScheme="blue" onClick={handleSubmit}>
        {t('calculateButton')} {/* Translate the 'Calculate' button text */}
      </Button>
    </VStack>
  );
}

export default StockSelectionForm;
