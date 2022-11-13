import React from "react";
import { Layout } from "antd";
import Header from "../Header";
import ApiContent from "../ApiContent";
import ProjectList from "../ProjectList";

const { Sider, Content } = Layout;

function Main() {
  return (
    <Layout style={{ minHeight: 500, minWidth: 700, width: "100%", height: "100vh" }}>
      <Header style={{ height: "10vh" }} />
      <Layout style={{ height: "90vh", overflow: "hidden" }}>
        <Sider width={200} theme="light">
          <ProjectList />
        </Sider>
        <Content>
          <ApiContent />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
