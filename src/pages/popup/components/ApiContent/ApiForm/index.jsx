import React from "react";
import { Button, Form, Input, Drawer, Checkbox, Space, Row, Col } from "antd";

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
    <Drawer title={`${curApi.id ? "编辑" : "新增"}`} width={"60vw"} placement={"left"} closable={true} onClose={() => onClose(false)} visible={visible}>
      {visible && (
        <Form form={form} initialValues={curApi} layout="vertical" onFinish={handleSave}>
          <Form.Item label="描述" key={"desc"} name={"desc"} required>
            <Input bordered={false} placeholder="请输入描述" />
          </Form.Item>
          <Form.Item label="MOCKID" key={"mockId"} name={"mockId"} >
            <Input bordered={false} placeholder='请输入mockId'/>
          </Form.Item>
          <Form.Item label="接口路径" required>
            <div style={{ display: "flex" }}>
              <div style={{ width: "40px" }}>
                <div style={{ width: "100%", textAlign: "right", fontWeight: "350", margin: "3px 2px 0 0" }}>(.*)(</div>
              </div>
              <div style={{ flex: 1 }}>
                <Form.Item key={"from"} name={"from"} noStyle rules={[{ required: true, message: "请输入匹配规则" }]}>
                  <Input bordered={false} placeholder="请输入路径" />
                </Form.Item>
              </div>
              <div style={{ width: "40px" }}>
                <div style={{ width: "100%", fontWeight: "350", margin: "3px 0 0 2px" }}>)(.*)</div>
              </div>
            </div>
          </Form.Item>
          <Form.Item label="目标路径" key={"to"} name={"to"}>
            <Input bordered={false} placeholder="请输入目标路径" />
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
