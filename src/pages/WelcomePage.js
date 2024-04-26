import { useState } from 'react';
import { Flex, Text, Box, VStack, Container, useToast } from '@chakra-ui/react';
import StockSelectionForm from '../components/StockSelectionForm';
import ResultsDisplay from '../components/ResultsDisplay';
import { calculateInvest } from '../services/calculateInvest';

function WelcomePage() {
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
          title: 'Calculation Error',
          description: "Failed to calculate investment returns. Please check your inputs or try again later.",
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
          <Text p={5}>Enter details and calculate to see results.</Text>
        )}
      </Box>
    </Flex>
  );
}

export default WelcomePage;
