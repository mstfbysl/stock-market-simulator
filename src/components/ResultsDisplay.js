import React from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

function ResultsDisplay({ investmentResults, stockName, startYear, monthlyInvestment }) {
  const { t } = useTranslation(); // Initialize the useTranslation hook

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
          <Text>{t('noResults')}</Text> {/* Translate the 'No results available' message */}
        </Box>
      </VStack>
    );
  }

  const summaryText = getSummaryText(
    t,
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
          <StatLabel>{t('totalInvestment')}</StatLabel> {/* Translate the 'Total Investment' label */}
          <StatNumber>{formatCurrency(investmentResults.totalInvestment)}</StatNumber>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>{t('totalStocksAcquired')}</StatLabel> {/* Translate the 'Total Stocks Acquired' label */}
          <StatNumber>{parseFloat(investmentResults.totalStocks).toFixed(2)} {t('shares')}</StatNumber>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>{t('currentWorth')}</StatLabel> {/* Translate the 'Current Worth' label */}
          <StatNumber color="green.500">{formatCurrency(investmentResults.currentWorth)}</StatNumber>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Stat>
          <StatLabel>{t('profitGain')}</StatLabel> {/* Translate the 'Profit / Gain' label */}
          <StatNumber color="green.500">{formatCurrency(investmentResults.profit)}</StatNumber>
          <StatHelpText>{investmentResults.profit >= 0 ? t('positiveReturn') : t('negativeReturn')}</StatHelpText>
        </Stat>
      </Box>
      <Box p={5} shadow="md" borderWidth="1px">
        <Text>{summaryText}</Text>
      </Box>
    </VStack>
  );
}

function getSummaryText(t, stockName, startYear, monthlyInvestment, totalStocks, totalInvestment, currentWorth, profit, formatCurrency) {
  return t('investmentSummary', {
    stockName,
    startYear,
    monthlyInvestment: formatCurrency(monthlyInvestment),
    totalStocks: parseFloat(totalStocks).toFixed(2),
    totalInvestment: formatCurrency(totalInvestment),
    currentWorth: formatCurrency(currentWorth),
    profit: formatCurrency(profit)
  });
}

export default ResultsDisplay;
