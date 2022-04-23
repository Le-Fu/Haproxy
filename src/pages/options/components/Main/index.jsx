import React from "react";
import { Layout } from "antd";
import OptionForm from "../OptionForm";
const { Header, Content } = Layout;
function Main(params) {
  return (
    <Layout>
      <Header style={{ color: "white" }}>环境变量配置</Header>
      <Content
        style={{
          padding: "20px 30%",
          height: "100vh",
        }}
      >
        <OptionForm />
      </Content>
    </Layout>
  );
}

export default Main;
