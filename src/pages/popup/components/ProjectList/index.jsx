import React from "react";
import { useSelector, useDispatch } from "../../hooks";
import AddProject from "./AddProject";
import List from "./List";
import "./style.scss";

function ProjectList() {
  const dispatch = useDispatch();
  const { currentValue: selectedProject, list } = useSelector("projectData") || {};

  const handleAddProject = (projectName) => {
    dispatch({
      type: "ADD_PROJECT",
      payload: projectName,
    });
  };

  const handleSelectProject = (projectId) => {
    dispatch({
      type: "SELECT_PROJECT",
      payload: projectId,
    });
  };

  const handleDelete = async (projectId) => {
    dispatch({ type: "DELETE_PROJECT", payload: projectId });
  };

  return (
    <div className="project-list">
      <AddProject onAdd={handleAddProject} />
      <List selectedProject={selectedProject} list={list} onChange={handleSelectProject} onDelete={handleDelete} />
    </div>
  );
}

export default ProjectList;
