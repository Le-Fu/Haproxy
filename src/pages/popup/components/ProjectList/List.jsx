import React from "react";
import { Radio, Space } from "antd";

function List({ list = [], onChange, selectedProject }) {
  return (
    <div style={{ padding: 5 }}>
      <Radio.Group onChange={(e) => onChange(e.target.value)} value={selectedProject}>
        <Space direction="vertical">
          {Array.isArray(list) &&
            list.map((item) => (
              <Radio key={item.id} value={item.id}>
                {item.name}
              </Radio>
            ))}
        </Space>
      </Radio.Group>
    </div>
  );
}

export default List;
