import React from 'react';
import { Dropdown } from 'semantic-ui-react';

function ResourceDropdown ({ type, resources, updateFunction, loading }) {
    let options = resources.map((resource) => ({
        'key': resource.gid,
        'text': resource.name,
        'value': resource.gid
    }));

    return (
        <Dropdown
            placeholder={`Select ${type.toUpperCase()}`}
            fluid
            search
            selection
            onChange={(e,data) => updateFunction(data.value)}
            options={options}
            disabled={options.length === 0}
            resourcetype={type}
            loading={loading}
          />
    )
}

export default ResourceDropdown;
