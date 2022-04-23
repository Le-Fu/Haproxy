import React from "react";
import { Button, Descriptions } from "antd";

function ApiList({ list = [], onEdit = () => {} }) {
  return (
    <div style={{ padding: "0 5px", backgroundColor: "#ffffff" }}>
      {Array.isArray(list) &&
        list.map((item) => (
          <Descriptions
            bordered
            column={1}
            key={item.id}
            size={"small"}
            title={item.desc}
            extra={
              <Button type="link" onClick={(e) => onEdit(item)}>
                编辑
              </Button>
            }
          >
            <Descriptions.Item label="MOCKID">{item.mockId}</Descriptions.Item>
            <Descriptions.Item label="FROM">{item.from}</Descriptions.Item>
            <Descriptions.Item label="TO">{item.to}</Descriptions.Item>
          </Descriptions>
        ))}
    </div>
  );
}

export default ApiList;
