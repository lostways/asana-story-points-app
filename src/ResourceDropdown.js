import React from "react";
import { Dropdown, Form } from "semantic-ui-react";

function ResourceDropdown({ type, resources, updateFunction, loading }) {
  let options = resources.map((resource) => ({
    key: resource.gid,
    text: resource.name,
    value: resource.gid,
  }));

  let id = `dropdown-for-${type.toLowerCase()}`;
  return (
    <Form.Field id={id}>
      <label htmlFor={id}>{type}</label>
      <Dropdown
        placeholder={`Select ${type}`}
        fluid
        search
        selection
        onChange={(e, data) => updateFunction(data.value)}
        options={options}
        disabled={options.length === 0}
        loading={loading}
      />
    </Form.Field>
  );
}

export default ResourceDropdown;
