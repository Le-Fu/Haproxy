import React from 'react'
import { Layout } from 'antd'
import Header from '../Header';
import ApiForm from '../ApiForm';
import ProjectList from '../ProjectList';

import './style.scss'

const { Sider, Content } = Layout;

function Main() {
    return (
        <Layout style={{ width: 700, height: 500 }}>
            <Header />
            <Layout>
                <Sider width={100} theme='light'><ProjectList /></Sider>
                <Layout>
                    <Sider width={100} theme='light'>Sider</Sider>
                    <Content><ApiForm /></Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default Main