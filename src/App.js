import React, { useState, useEffect } from 'react';
import { Card, Container } from 'semantic-ui-react';
import SearchParams from './SearchParams';
import PointCards from './PointCards';

//import './App.css';


function App() {
  const [points, setPoints] = useState([]);

  return (
    <Container className="container" textAlign="center">
      <SearchParams setPoints={(data) => setPoints(data)} />
      <PointCards points={points} />
    </Container>
  );
}

export default App;
