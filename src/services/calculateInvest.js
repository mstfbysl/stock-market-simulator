import Papa from 'papaparse';

const fetchCsv = async (filePath) => {
    try {
        const response = await fetch(filePath);
        return await response.text();
    } catch (error) {
        console.error('Error fetching CSV:', error);
        throw error;
    }
};

const parseCsv = (csvData) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csvData, {
            header: true,
            dynamicTyping: true,
            complete: results => resolve(results.data),
            error: err => reject(err)
        });
    });
};

const calculateInvest = async (monthlyInvestment, startYear, stockName) => {
    const stockFilePath = `/data/${stockName}.csv`;

    try {
        const stockCsv = await fetchCsv(stockFilePath);
        const stockData = await parseCsv(stockCsv);

        return simulateInvestment(stockData, monthlyInvestment, startYear);
    } catch (error) {
        console.error('Error in calculation service:', error);
        return null;
    }
};

const simulateInvestment = (stockData, monthlyInvestment, startYear) => {
    const filteredData = stockData.filter(row => {
        const year = new Date(row.Date).getFullYear();
        return year >= parseInt(startYear);
    });

    let totalInvestment = 0;
    let totalStocks = 0;

    filteredData.forEach(month => {
        totalInvestment += parseFloat(monthlyInvestment);
        totalStocks += parseFloat(monthlyInvestment) / month['Adj Close'];
    });

    const finalStockValue = totalStocks * filteredData[filteredData.length - 1]['Adj Close'];
    const profit = finalStockValue - totalInvestment;

    return {
        totalInvestment,
        totalStocks: totalStocks.toFixed(2),
        currentWorth: finalStockValue.toFixed(2),
        profit: profit.toFixed(2)
    };
};

export { calculateInvest };
