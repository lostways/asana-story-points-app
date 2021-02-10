import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ResourceDropdown from "./ResourceDropdown";
import { Form, Button, Header } from "semantic-ui-react";

function SearchParams() {
  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [sectionId, setSectionId] = useState("");
  const [loading, setLoading] = useState("workspaces");

  async function fetchResource(type, gid = "") {
    setLoading(type);

    let dataOut = [];

    await fetch(`/${type}/${gid}`)
      .then((res) => res.json())
      .then((data) => {
        dataOut = data;
        setLoading("");
        console.log(data);
      });

    return dataOut;
  }

  function getProjects(workspaceId) {
    setSections([]);
    setProjects([]);

    fetchResource("workspace", workspaceId).then((data) => setProjects(data));
  }

  function getSections(projectId) {
    setSections([]);

    fetchResource("project", projectId).then((data) => setSections(data));
  }

  useEffect(() => {
    fetch("/workspaces")
      .then((res) => res.json())
      .then((data) => {
        setWorkspaces(data);
        setLoading("");
        console.log(data);
      });
  }, []);

  return (
    <div className="search-params">
      <Header
        className="App-header"
        as="h1"
        content="Select A Project Section"
        textAlign="center"
      />
      <Form>
        <ResourceDropdown
          type="Workspace"
          resources={workspaces}
          updateFunction={(data) => getProjects(data)}
          loading={loading === "workspaces"}
        />
        <ResourceDropdown
          type="Project"
          resources={projects}
          updateFunction={(data) => getSections(data)}
          loading={loading === "workspace"}
        />
        <ResourceDropdown
          type="Section"
          resources={sections}
          updateFunction={(data) => setSectionId(data)}
          loading={loading === "project"}
        />
        <Button
          as={Link}
          to={`/points/${sectionId}`}
          disabled={sectionId === ""}
          primary
        >
          Get Points
        </Button>
      </Form>
    </div>
  );
}

export default SearchParams;
