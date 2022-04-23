import React from "react";
import { Space, Switch } from "antd";
import { AppstoreTwoTone } from "@ant-design/icons";
import { useSelector, useDispatch } from "../../hooks";
import "./style.scss";

function Header({ style = {} }) {
  const dispatch = useDispatch();
  const isChecked = useSelector("proxyStatus");

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

  return (
    <div className="header-wrap">
      <div className="header" style={style}>
        <div className="header__left"></div>
        <div className="header__right">
          <Space>
            <AppstoreTwoTone onClick={handleOpenLink} />
            <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={isChecked === 1 ? true : false} onChange={handleAllStatusChange} />
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Header;
