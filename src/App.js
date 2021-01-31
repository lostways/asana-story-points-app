import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Dropdown, Card, Container } from 'semantic-ui-react';
//import './App.css';


function App() {
    const [resource, setResource] = useState('workspaces');
    const [items, setItems] = useState({});
    const [resourceId, setResourceId] = useState(0);
    const [loading, setLoading] = useState(true);
   
    function displayPoints(points) {
        return (
          <Card.Group centered>
            {points.map((pointSum) => (
                <Card>
                    <Card.Content>
                        <Card.Header>{pointSum.name}</Card.Header>
                        <Card.Meta>{pointSum.points}</Card.Meta>
                    </Card.Content>
                </Card>
            ))}
          </Card.Group>
        )
    }

    function displayResources(resources) {
        // TODO improve this....
        let resourceType = resources ? resources[0].resource_type : "";

        let options = resources.map((resource) => ({
            'key': resource.gid,
            'text': resource.name,
            'value': resource.gid
        }));

        return (
            <Dropdown
                placeholder={'Select ' +  resourceType.toUpperCase()}
                fluid
                search
                selection
                onChange={(e,data) => fetchResource(data.resourcetype,data.value)}
                options={options}
                disabled={options.length === 0}
                resourcetype={resourceType}
              />
        )
    }

    function fetchResource(resourceType,id) {
       setLoading(true);
       setResourceId(id);
       setResource(resourceType);
    }

    useEffect( () => {
        setItems({});

        if (resource === 'workspaces') {
            fetch('/workspaces')
                .then(res => res.json())
                .then(data => {setItems(data); setLoading(false); console.log(data)});
        } else {
            fetch(`/${resource}/${resourceId}`)
                .then(res => res.json())
                .then(data => {setItems(data); setLoading(false); console.log(data)});
        }
    },[resource, setLoading, setItems]);
        


  return (
    <Container className="container" textAlign="center">
      {loading
          ? <h2>Loading...</h2>
          : resource == 'section' ? displayPoints(items) : displayResources(items)
      }
    </Container>
  );
}

export default App;
