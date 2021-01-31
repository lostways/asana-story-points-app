import React, { useState, useEffect } from 'react';
import ResourceDropdown from './ResourceDropdown';

function SearchParams ({setPoints}) {
    const [workspaces, setWorkspaces] = useState([]);
    const [projects, setProjects] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(''); 

    async function fetchResource (type, gid='') {
        let dataOut = [];

        await fetch(`/${type}/${gid}`)
            .then(res => res.json())
            .then(data => {dataOut = data; console.log(data)});

        return dataOut;
    }
    
    function getProjects(workspaceId) {
        setSections([]);
        setProjects([]);

        setLoading('projects');
        fetchResource('workspace',workspaceId)
            .then(data => setProjects(data))
            .then(setLoading(''));
    }

    function getSections(projectId) {
        setSections([]);
        
        setLoading('sections');
        fetchResource('project',projectId)
            .then(data => setSections(data))
            .then(setLoading(''));
    }

    function getPoints(sectionId) {
        fetchResource('section',sectionId)
            .then(data => setPoints(data))
    }

    useEffect( () => {
        setLoading('workspaces');
        fetch('/workspaces')
            .then(res => res.json())
            .then(data => {setWorkspaces(data); console.log(data)})
            .then(setLoading(''));
    },[]);

    return (
        <div className="search-params">
            <ResourceDropdown 
                type='Workspace' 
                resources={workspaces}
                updateFunction={(data) => getProjects(data)}
                loading={loading === 'workspaces'}
            />
            <ResourceDropdown 
                type='Project' 
                resources={projects}
                updateFunction={(data) => getSections(data)}
                loading={loading === 'projects'}
            />
            <ResourceDropdown 
                type='Section' 
                resources={sections}
                updateFunction={(data) => getPoints(data)}
                loading={loading === 'sections'}
            />
        </div>
    )
}

export default SearchParams;
