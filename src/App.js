import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react';

import Navbar from './components/Navbar';
import WelcomePage from './pages/WelcomePage';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<WelcomePage />} />
        </Routes>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
