import { Button, Text, VStack, HStack, Input, useToast, Select } from '@chakra-ui/react';
import { useState } from 'react';

import { calculateInvest } from '../services/calculateInvest';

function StockSelectionForm({ onSubmit }) {
  const [selectedStock, setSelectedStock] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [startYear, setStartYear] = useState('');

  const handleSubmit = () => {

    calculateInvest(500, 2020, "AAPL").then((results) => {
      console.log(results);
    });

    if (!selectedStock || !monthlyInvestment || !startYear) {
      toast({
        title: 'Error',
        description: "Please fill in all fields",
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
  const years = Array.from({length: 21}, (_, i) => currentYear - i).reverse();


  return (
    <VStack spacing={4}>
      <Text>Which stock would you like to invest in?</Text>
      <HStack>
        <Button colorScheme={selectedStock === 'AMZN' ? 'green' : 'blue'} onClick={() => setSelectedStock('AMZN')}>AMZN</Button>
        <Button colorScheme={selectedStock === 'AAPL' ? 'green' : 'blue'} onClick={() => setSelectedStock('AAPL')}>AAPL</Button>
        <Button colorScheme={selectedStock === 'GOOG' ? 'green' : 'blue'} onClick={() => setSelectedStock('GOOG')}>GOOG</Button>
        <Button colorScheme={selectedStock === 'MSFT' ? 'green' : 'blue'} onClick={() => setSelectedStock('MSFT')}>MSFT</Button>
        <Button colorScheme={selectedStock === 'SBUX' ? 'green' : 'blue'} onClick={() => setSelectedStock('SBUX')}>SBUX</Button>
      </HStack>
      <Text>Select start year of investment:</Text>
      <Select placeholder="Select year" value={startYear} onChange={(e) => setStartYear(e.target.value)}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </Select>
      <Text>How much money will you invest each month?</Text>
      <Input placeholder="Monthly Investment ($)" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} />
      <Button colorScheme="green" onClick={handleSubmit}>Calculate</Button>
    </VStack>
  );
}

export default StockSelectionForm;
