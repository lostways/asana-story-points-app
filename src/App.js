import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import SearchParams from './SearchParams';
import PointCards from './PointCards';
import { 
    Container,
    Header,
} from 'semantic-ui-react';

import './App.css';


function App() {
  return (
    <div className='App'>
      <Header className='App-header' as='h1' content='Asana Story Points' textAlign='center' />
      <Container className="container">
        <Router>
            <Switch>
                <Route path="/points/:sectionId">
                    <PointCards />
                </Route>
                <Route path="/">
                    <SearchParams />
                </Route>
            </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
