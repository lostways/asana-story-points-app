import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Dropdown, Container } from 'semantic-ui-react';
//import './App.css';


function App() {
    const [resource, setResource] = useState('workspaces');
    const [items, setItems] = useState({});
    const [resourceId, setResourceId] = useState(0);
    const [loading, setLoading] = useState(true);
   
    function displayPoints(points) {
        return (
          <ul>
            {Object.keys(points).map((name) => (
                <li>{name} : {points[name]}</li>
            ))}
          </ul>
        )
    }

    function displayResources(resources) {
        // TODO improve this....
        let resourceType = resources[Object.keys(resources)[0]].resource_type;

        let options = Object.keys(resources).map((name) => ({
            'key': name,
            'text': name,
            'value': resources[name].gid
        }));

        return (
            <Dropdown
                placeholder={'Select ' +  resource.toUpperCase()}
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

        if (resource == 'workspaces') {
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
