import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import SearchParams from './SearchParams';
import PointCards from './PointCards';
import { 
    Container,
    Header,
    Menu,
    Image,
} from 'semantic-ui-react';

import './App.css';


function App() {
  return (
    <div className='App'>
      <Menu fixed="top" borderless={true} inverted>
        <Container>
          <Menu.Item as="a" href="/" header>
            <Image
              size="mini"
              src="/static/images/logo-100.png"
              style={{ marginRight: "1.5em" }}
            />
            Asana Story Points
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ marginTop: "7em" }} className="container">
        <Header className='App-header' as='h1' content='Asana Story Points' textAlign='center' />
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
