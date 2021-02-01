import React, { useState, useEffect } from 'react';
import SearchParams from './SearchParams';
import PointCards from './PointCards';
import { 
    Card, 
    Container,
    Header,
} from 'semantic-ui-react';

import './App.css';


function App() {
  const [points, setPoints] = useState([]);

  return (
    <div className='App'>
      <Header className='App-header' as='h1' content='Asana Story Points' textAlign='center' />
      <Container className="container">
         <SearchParams setPoints={(data) => setPoints(data)} />
         <PointCards points={points} />
      </Container>
    </div>
  );
}

export default App;
