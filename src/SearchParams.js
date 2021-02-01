import React, { useState, useEffect } from 'react';
import ResourceDropdown from './ResourceDropdown';
import { Form } from 'semantic-ui-react';

function SearchParams ({setPoints}) {
    const [workspaces, setWorkspaces] = useState([]);
    const [projects, setProjects] = useState([]);
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState('workspaces'); 

    async function fetchResource (type, gid='') {
        setLoading(type);

        let dataOut = [];

        await fetch(`/${type}/${gid}`)
            .then(res => res.json())
            .then(data => {
                dataOut = data; 
                setLoading('');
                console.log(data);
            });

        return dataOut;
    }
    
    function getProjects(workspaceId) {
        setSections([]);
        setProjects([]);

        fetchResource('workspace',workspaceId)
            .then(data => setProjects(data));
    }

    function getSections(projectId) {
        setSections([]);
        
        fetchResource('project',projectId)
            .then(data => setSections(data));
    }

    function getPoints(sectionId) {
        fetchResource('section',sectionId)
            .then(data => setPoints(data))
    }

    useEffect( () => {
        fetch('/workspaces')
            .then(res => res.json())
            .then(data => {
                setWorkspaces(data);
                setLoading('');
                console.log(data);
            });
    },[]);

    return (
        <div className="search-params">
            <Form>
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
                    loading={loading === 'workspace'}
                />
                <ResourceDropdown 
                    type='Section' 
                    resources={sections}
                    updateFunction={(data) => getPoints(data)}
                    loading={loading === 'project'}
                />
            </Form>
        </div>
    )
}

export default SearchParams;
