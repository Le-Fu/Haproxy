import React from "react";
import { Button, Form, Input, Drawer } from "antd";

function ApiForm({ curApi = {}, visible, onClose, onSubmit }) {
  const [form] = Form.useForm();
  const handleSave = (values) => {
    onSubmit(values);
  };

  React.useEffect(() => {
    if (!!form && visible) {
      form.resetFields();
      form.setFieldsValue(curApi);
    }
  }, [!!form, curApi, curApi.id, visible]);

  return (
    <Drawer title={`${curApi.id ? "编辑" : "新增"}`} placement={"left"} closable={true} onClose={() => onClose(false)} visible={visible}>
      {visible && (
        <Form form={form} initialValues={curApi} layout="vertical" onFinish={handleSave}>
          <Form.Item label="描述" key={"desc"} name={"desc"}>
            <Input />
          </Form.Item>
          <Form.Item label="MOCKID" key={"mockId"} name={"mockId"}>
            <Input />
          </Form.Item>
          <Form.Item label="FROM" key={"from"} name={"from"}>
            <Input />
          </Form.Item>
          <Form.Item label="TO" key={"to"} name={"to"}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      )}
    </Drawer>
  );
}

export default ApiForm;
