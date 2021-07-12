import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Container className="p-4">
        <Header />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
