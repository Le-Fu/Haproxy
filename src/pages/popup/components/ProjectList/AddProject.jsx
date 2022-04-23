import React from "react";
import { Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./style.scss";

function AddProject({ onAdd }) {
  const [projectName, setProjectName] = React.useState("");
  const handleAdd = () => {
    if (!projectName) {
      return;
    }
    onAdd(projectName);
    setProjectName("");
  };
  return <Input placeholder="请输入项目名称" value={projectName} onChange={(e) => setProjectName(e.target.value)} suffix={<PlusCircleOutlined onClick={handleAdd} />} />;
}

export default AddProject;
