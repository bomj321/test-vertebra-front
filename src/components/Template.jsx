import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  AreaChartOutlined,
  FundProjectionScreenOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import '../styles/components/Template.css';

const { Header, Footer, Content } = Layout;

const logout = () => {
  localStorage.clear();
  window.location = '/';
};

const Template = ({ children }) => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          className="header-menu-template"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/characters">Personajes</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AreaChartOutlined />}>
            <Link to="/locations">Lugares</Link>
          </Menu.Item>

          <Menu.Item key="3" icon={<FundProjectionScreenOutlined />}>
            <Link to="/episodes">Episodios</Link>
          </Menu.Item>

          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => logout()}>
            Salir
          </Menu.Item>
        </Menu>
      </Header>

      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Test Vertebra @2021 Created by José ortega
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Template;
