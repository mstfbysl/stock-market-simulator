import React from 'react';
import { useState } from 'react';
import { Flex, Text, Box, VStack, Container, useToast } from '@chakra-ui/react';
import StockSelectionForm from '../components/StockSelectionForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { calculateInvest } from '../services/calculateInvest';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function WelcomePage() {
  const { t } = useTranslation(); // Initialize the useTranslation hook

  const [investmentResults, setInvestmentResults] = useState(null);
  const [selectedStock, setSelectedStock] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [startYear, setStartYear] = useState('');

  const toast = useToast();

  const handleCalculate = (stock, investment, year) => {
    setSelectedStock(stock);
    setMonthlyInvestment(investment);
    setStartYear(year);
    calculateInvest(parseFloat(investment), year, stock)
      .then(results => {
        setInvestmentResults(results);
      })
      .catch(error => {
        console.error("Error in calculation:", error);
        toast({
          title: t('calculationError'), // Translate the title
          description: t('calculationErrorMessage'), // Translate the error message
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Flex m={5}>
      <Box flex="1" p={5}>
        <VStack spacing={8}>
          <Container>
            <StockSelectionForm onSubmit={handleCalculate} />
          </Container>
        </VStack>
      </Box>
      <Box flex="1" p={5} borderLeft="1px" borderColor="gray.200">
        {investmentResults ? (
          <ResultsDisplay 
            investmentResults={investmentResults} 
            stockName={selectedStock} 
            startYear={startYear} 
            monthlyInvestment={monthlyInvestment} 
          />
        ) : (
          <Text p={5}>{t('noResults')}</Text>
        )}
      </Box>
    </Flex>
  );
}

export default WelcomePage;
