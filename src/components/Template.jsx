import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  AreaChartOutlined,
  FundProjectionScreenOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const Template = ({ children }) => {
  return (
    <Layout>
      <Header className="header">Salir</Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
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
          </Menu>
        </Sider>
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
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Template;
