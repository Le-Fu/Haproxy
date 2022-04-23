import React from "react";
import { Form, Input, Button, Space, Select, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const areas = [
  { label: "Beijing", value: "Beijing" },
  { label: "Shanghai", value: "Shanghai" },
];

const sights = {
  Beijing: ["Tiananmen", "Great Wall"],
  Shanghai: ["Oriental Pearl", "The Bund"],
};

function OptionForm() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <Card>
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.Item name="varName" label="变量名" rules={[{ required: true, message: "请填写变量名称" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="varValue" label="变量值" rules={[{ required: true, message: "请填写变量值" }]}>
          <Input />
        </Form.Item>
        <Card>
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div>
                    <Space key={field.key} align="baseline">
                      <Form.Item {...field} label="选项名" name={[field.name, "label"]} rules={[{ required: true, message: "请填写选项名称" }]}>
                        <Input />
                      </Form.Item>
                      <Form.Item {...field} label="选项值" name={[field.name, "value"]} rules={[{ required: true, message: "请填写选项值" }]}>
                        <Input />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  </div>
                ))}

                <Form.Item>
                  <Button type="link" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
        <div style={{ textAlign: "center", marginTop: '30px' }}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Card>
  );
}

export default OptionForm;
