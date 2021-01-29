import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
    const [resource, setResource] = useState('workspaces');
    const [items, setItems] = useState({});
    const [resourceId, setResourceId] = useState(0);
    const [loading, setLoading] = useState(false);
   
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
        return (
          <ul>
            {Object.keys(resources).map((name) => (
                <li>
                    <a onClick={() => fetchResource(resources[name].resource_type,resources[name].gid)}>{name}</a>
                </li>
            ))}
          </ul>
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
    },[resource]);
        


  return (
    <div className="App">
      <header className="App-header">
      {loading
          ? <p>Loading...</p>
          : resource == 'section' ? displayPoints(items) : displayResources(items)
      }
      </header>
    </div>
  );
}

export default App;
