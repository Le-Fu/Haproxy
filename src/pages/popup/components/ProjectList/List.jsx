import React from "react";
import { Radio, Space, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

function List({ list = [], onChange, selectedProject, onDelete }) {
    return (
        <div style={{ padding: 5 }}>
            <Radio.Group onChange={(e) => onChange(e.target.value)} value={selectedProject}>
                <Space direction="vertical">
                    {Array.isArray(list) &&
                        list.map((item) => (
                            <div className="project-flex" key={item.id}>
                                <Radio value={item.id}>
                                    {item.name}
                                </Radio>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => onDelete(item.id)}
                                >
                                    <DeleteOutlined className="delete-icon"/>
                                </Popconfirm>
                            </div>
                        ))}
                </Space>
            </Radio.Group>
        </div>
    );
}

export default List;
