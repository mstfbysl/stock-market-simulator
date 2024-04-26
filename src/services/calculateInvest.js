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

const adjustForSplits = (stockData, splits) => {
    const adjustedData = stockData.map(data => {
        const dataDate = new Date(data.Date);
        splits.forEach(split => {
            const splitDate = new Date(split.Date);
            if (dataDate <= splitDate) {
                const [numerator, denominator] = split['Stock Splits'].split(':').map(Number);
                data['Adj Close'] *= (denominator / numerator);
            }
        });
        return data;
    });
    return adjustedData;
};

const calculateInvest = async (monthlyInvestment, startYear, stockName) => {
    const stockFilePath = `/data/${stockName}.csv`;
    const splitsFilePath = `/data/${stockName}-SPLITS.csv`;

    try {
        const [stockCsv, splitsCsv] = await Promise.all([fetchCsv(stockFilePath), fetchCsv(splitsFilePath)]);
        const [stockData, splitsData] = await Promise.all([parseCsv(stockCsv), parseCsv(splitsCsv)]);
        const adjustedData = adjustForSplits(stockData, splitsData);

        return simulateInvestment(adjustedData, monthlyInvestment, startYear);
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
