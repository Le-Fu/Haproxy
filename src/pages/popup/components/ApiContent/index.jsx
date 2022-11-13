import React from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ApiList from "./ApiList";
import ApiForm from "./ApiForm";
import { useSelector, useDispatch } from "../../hooks";
import "./style.scss";

function ApiContent() {
  const dispatch = useDispatch();
  const [curApi, setCurApi] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const { currentValue: selectedVar } = useSelector("varData") || {};
  console.log(selectedVar);
  const { list } = useSelector("apiData") || {};
  const { currentValue: selectedProject } = useSelector("projectData") || {};
  const apiList = Array.isArray(list) ? list.filter((item) => item.projectId === selectedProject) : [];

  const handleModalVisible = (visible) => {
    setVisible(visible);
  };

  const handleAdd = async () => {
    await setCurApi({});
    await handleModalVisible(true);
  };

  const handleEdit = async (curApi) => {
    await setCurApi(curApi);
    await handleModalVisible(true);
  };

  const handleDelete = async (curApi) => {
    dispatch({ type: "DELETE_API", payload: { ...curApi } });
  };

  const handleSwitch = async (curApi, checked) => {
    dispatch({ type: "SWITCH_API_STATUS", payload: { ...curApi, checked } });
  };

  const handleSubmit = async (values) => {
    let res = null;
    if (curApi.id) {
      res = await dispatch({
        type: "UPDATE_API",
        payload: {
          ...curApi,
          ...values,
        },
      });
    } else {
      res = await dispatch({
        type: "ADD_API",
        payload: {
          ...values,
          projectId: selectedProject,
        },
      });
    }
    if (res?.code === 0) {
      await handleModalVisible(false);
    }
  };

  return (
    <div style={{ position: "relative", height: "90vh", overflowY: "scroll" }}>
      <Button style={{ position: "fixed", bottom: "15px", right: "15px", zIndex: 100 }} shape="circle" type="primary" onClick={handleAdd}>
        <PlusOutlined />
      </Button>
      <ApiList onEdit={handleEdit} onDelete={handleDelete} onSwitch={handleSwitch} list={apiList} curVar={selectedVar} />
      <ApiForm curApi={curApi} visible={visible} onClose={handleModalVisible} onSubmit={handleSubmit} />
    </div>
  );
}

export default ApiContent;
