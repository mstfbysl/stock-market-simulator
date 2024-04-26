import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, VStack } from '@chakra-ui/react';

function ResultsDisplay({ investmentResults, stockName, startYear, monthlyInvestment }) {
  // Helper function to format numbers as currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  if (!investmentResults || Object.keys(investmentResults).length === 0) {
    return (
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Text>No results available. Please enter all the required details to see the results.</Text>
        </Box>
      </VStack>
    );
  }

  const summaryText = getSummaryText(
    stockName,
    startYear,
    monthlyInvestment,
    investmentResults.totalStocks,
    investmentResults.totalInvestment,
    investmentResults.currentWorth,
    investmentResults.profit,
    formatCurrency
  );

  return (
    <VStack spacing={4} align="stretch">
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>Total Investment</StatLabel>
          <StatNumber>{formatCurrency(investmentResults.totalInvestment)}</StatNumber>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>Total Stocks Acquired</StatLabel>
          <StatNumber>{parseFloat(investmentResults.totalStocks).toFixed(2)} shares</StatNumber>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>Current Worth</StatLabel>
          <StatNumber color="green.500">{formatCurrency(investmentResults.currentWorth)}</StatNumber>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>Profit / Gain</StatLabel>
          <StatNumber color="green.500">{formatCurrency(investmentResults.profit)}</StatNumber>
          <StatHelpText>{investmentResults.profit >= 0 ? 'Positive Return' : 'Negative Return'}</StatHelpText>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text>{summaryText}</Text>
      </Box>
    </VStack>
  );
}

function getSummaryText(stockName, startYear, monthlyInvestment, totalStocks, totalInvestment, currentWorth, profit, formatCurrency) {
  return `If you had started investing in ${stockName} in ${startYear} with a monthly contribution of ${formatCurrency(monthlyInvestment)}, you would now own approximately ${parseFloat(totalStocks).toFixed(2)} shares. Your total expenditure would have been ${formatCurrency(totalInvestment)}, but the current value of those shares is an impressive ${formatCurrency(currentWorth)}. This systematic investment strategy would have yielded you a profit of ${formatCurrency(profit)}, transforming a modest monthly investment into a significant financial gain.`;
}

export default ResultsDisplay;
