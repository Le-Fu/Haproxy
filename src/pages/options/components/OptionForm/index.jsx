import React from "react";
import { Form, Input, Button, Space, Select, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "../../hooks";

function OptionForm() {
  const dispatch = useDispatch();
  const varData = useSelector("varData") || {};
  const [disable, setDisable] = React.useState(true);
  const toggleDisable = (flag) => setDisable(flag);

  const onFinish = async (values) => {
    let res = await dispatch({
      type: "UPDATE_VAR_DATA",
      payload: {
        ...values,
      },
    });
    console.log(res);
    if (res?.code === 0) {
      await toggleDisable(true);
    }
  };

  return (
    <Card>
      {Object.keys(varData).length > 0 ? (
        <Form initialValues={varData} onFinish={onFinish}>
          <Form.Item name="varName" label="变量名" rules={[{ required: true, message: "请填写变量名称" }]}>
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item name="varValue" label="变量值" rules={[{ required: true, message: "请填写变量值" }]}>
            <Input disabled={disable} />
          </Form.Item>
          <Card>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space align="baseline" key={field.key}>
                      <Form.Item {...field} key={field.key + 0} label="选项名" name={[field.name, "label"]} rules={[{ required: true, message: "请填写选项名称" }]}>
                        <Input disabled={disable || index === 0} />
                      </Form.Item>
                      <Form.Item {...field} key={field.key + 1} label="选项值" name={[field.name, "value"]} rules={[{ required: true, message: "请填写选项值" }]}>
                        <Input disabled={disable || index === 0} />
                      </Form.Item>
                      {!disable && index !== 0 ? <MinusCircleOutlined onClick={() => remove(field.name)} /> : null}
                    </Space>
                  ))}
                  {!disable && (
                    <Form.Item>
                      <Button type="link" onClick={() => add()} block icon={<PlusOutlined />}>
                        添加选项
                      </Button>
                    </Form.Item>
                  )}
                </>
              )}
            </Form.List>
          </Card>
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            {!disable ? (
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            ) : (
              <Button type="primary" onClick={(e) => toggleDisable(false)}>
                编辑
              </Button>
            )}
          </div>
        </Form>
      ) : null}
    </Card>
  );
}

export default OptionForm;
