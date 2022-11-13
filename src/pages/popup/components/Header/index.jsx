import React from "react";
import { Select, Space, Switch } from "antd";
import { AppstoreTwoTone, ToolOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "../../hooks";
import "./style.scss";

function Header({ style = {} }) {
  const dispatch = useDispatch();
  const isChecked = useSelector("proxyStatus");
  const { varName, currentValue: selectedVar, options = [] } = useSelector("varData") || {};

  const handleAllStatusChange = (checked) => {
    if (checked) {
      dispatch({
        type: "OPEN_PROXY",
      });
    } else {
      dispatch({
        type: "CLOSE_PROXY",
      });
    }
  };

  const handleOpenLink = () => {
    chrome.tabs.create({ url: "popup.html" }, (tab) => {});
  };

  const handleOpenOptions = () => {
    chrome.runtime.openOptionsPage(() => {});
  };

  const handleChangeVar = (value) => {
    dispatch({
      type: "CHANGE_VAR",
      payload: {
        currentValue: value,
      },
    });
    console.log(value);
  };

  return (
    <div className="header-wrap">
      <div className="header" style={style}>
        <div className="header__left">
          <div style={{ color: "white", paddingRight: "15px" }}>{varName + ": "}</div>
          <Select value={selectedVar} onChange={handleChangeVar}>
            {options.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </Select>
          <ToolOutlined style={{ color: "white", marginLeft: "10px" }} onClick={handleOpenOptions} />
        </div>
        <div className="header__right">
          <Space>
            <AppstoreTwoTone onClick={handleOpenLink} />
            <Switch checkedChildren="已开" unCheckedChildren="已关" checked={isChecked === 1 ? true : false} onChange={handleAllStatusChange} />
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Header;
