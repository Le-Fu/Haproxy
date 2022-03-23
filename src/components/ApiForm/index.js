import React from 'react'
import { Button, Card, Form, Input, Select, Collapse, Space, Switch } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './style.scss'

function FormPage() {
    const [form] = Form.useForm()

    const handleSave = (values) => {
        console.log(values)

        // chrome.runtime.sendMessage({ action: 'changeList', value: values }, () => {

        // })
    }

    return (
        <Card
            title='Haproxy'

        >
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 3 }}
                wrapperCol={{ span: 21 }}
                onFinish={handleSave}
            >
                <Form.List name="configs">
                    {(fields, { add, remove }) => (
                        <>
                            <div>
                                {fields.map((field) => (
                                    <Card
                                        key={field.key}
                                        title={form.getFieldValue(['rulesets', field.name, 'desc'])}
                                        extra={
                                            <Space align='center'>
                                                <Form.Item
                                                    {...field}
                                                    label=""
                                                    valuePropName="checked"
                                                    name={[field.name, 'status']}
                                                >
                                                    <Switch size='small' checkedChildren="开启" unCheckedChildren="关闭" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        }
                                    >
                                        <Form.Item
                                            {...field}
                                            label="描述"
                                            key={field.key + 'desc'}
                                            name={[field.name, 'desc']}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="MOCKID"
                                            key={field.key + 'mockid'}
                                            name={[field.name, 'mockid']}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="FROM"
                                            key={field.key + 'from'}
                                            name={[field.name, 'from']}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            label="TO"
                                            key={field.key + 'to'}
                                            name={[field.name, 'to']}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Card>
                                ))}
                            </div>
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    添加规则
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                </Form.Item>
            </Form>

        </Card>
    )
}

export default FormPage