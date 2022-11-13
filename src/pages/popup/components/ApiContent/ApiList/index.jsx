import React from "react";
import { Button, Descriptions, Switch, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons';

function ApiList({ list = [], curVar='https://hapi.69corp.com', onEdit = () => { }, onDelete = () => { }, onSwitch = () => { } }) {
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
                            <>
                                <Popconfirm
                                    title="确认删除?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => onDelete(item)}
                                >
                                    <DeleteOutlined className="delete-icon"/>
                                </Popconfirm>
                                <Button type="link" onClick={(e) => onEdit(item)}>
                                    编辑
                                </Button>
                                <Switch checkedChildren="已开" unCheckedChildren="已关" checked={item.status} onChange={(e) => onSwitch(item, e)} />
                            </>
                        }
                    >
                        {/* <Descriptions.Item label="MOCKID">{item.mockId}</Descriptions.Item> */}
                        <Descriptions.Item label="接口路径">{item.from}</Descriptions.Item>
                        <Descriptions.Item label="目标路径">{curVar === 'https://hapi.69corp.com'? `https://hapi.69corp.com/mock/${item.mockId}` : `${curVar}${item.from}`}</Descriptions.Item>
                    </Descriptions>
                ))}
        </div>
    );
}

export default ApiList;
