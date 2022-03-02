import React from 'react'
import { Button, Form, Input } from 'antd'
import './style.scss'

function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

function FormPage() {
    const onFinish = (values) => {
        chrome.storage.sync.set({ color: values.color });
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageBackgroundColor,
            });
        });
    }

    return (
        <div className='form-wrap'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="颜色"
                    name="color"
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交颜色
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default FormPage