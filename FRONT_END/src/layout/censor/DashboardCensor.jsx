import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "./DashboardCensor.model.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesPacking,
  faChartLine,
  faKey,
  faMoneyBills,
  faShop,
  faTags,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "antd/es/menu/SubMenu";
const { Header, Sider, Content } = Layout;
const DashboardCensor = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout-censor">
      <Sider trigger={null} collapsible collapsed={collapsed} width={225}>
        <Link to="/dashboard-management">
          <div className="logo">
            <img src={Logo} className="logo-content" alt="Logo" />
          </div>
        </Link>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline">
          <Menu.Item
            key="1"
            className="menu-item"
            icon={
              <FontAwesomeIcon icon={faChartLine} style={{ color: "white" }} />
            }
          >
            <Link to="/dashboard-management" style={{ color: "white" }}>
              Thống Kê
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            className="menu-item"
            icon={<FontAwesomeIcon icon={faShop} style={{ color: "white" }} />}
          >
            <Link to="/bill-management" style={{ color: "white" }}>
              Bán Hàng Tại Quầy
            </Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            className="menu-item"
            icon={
              <FontAwesomeIcon icon={faMoneyBills} style={{ color: "white" }} />
            }
          >
            <Link to="/dashboard" style={{ color: "white" }}>
              Quản Lý Thu Chi
            </Link>
          </Menu.Item>
          <SubMenu
            key="4"
            icon={
              <FontAwesomeIcon
                icon={faBoxesPacking}
                style={{ color: "white" }}
              />
            }
            title="Quản Lý Sản Phẩm"
            style={{ color: "white" }}
          >
            <Menu.Item key="4.0">
              <Link to="/product-detail-management">Sản Phẩm</Link>
            </Menu.Item>
            <Menu.Item key="4.1">
              <Link to="/category-management">Thể Loại</Link>
            </Menu.Item>
            <Menu.Item key="4.2">
              <Link to="/sole-management">Đế Giày</Link>
            </Menu.Item>
            <Menu.Item key="4.3">
              <Link to="/brand-management">Thương Hiệu</Link>
            </Menu.Item>
            <Menu.Item key="4.4">
              <Link to="/material-management">Chất Liệu</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="5"
            className="menu-item"
            icon={<FontAwesomeIcon icon={faKey} style={{ color: "white" }} />}
          >
            <Link to="/dashboard" style={{ color: "white" }}>
              Quản Lý khuyến mại
            </Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            className="menu-item"
            icon={<FontAwesomeIcon icon={faTags} style={{ color: "white" }} />}
          >
            <Link to="/dashboard" style={{ color: "white" }}>
              Quản Lý khuyến mãi
            </Link>
          </Menu.Item>
          <SubMenu
            key="7"
            icon={
              <FontAwesomeIcon icon={faUserGroup} style={{ color: "white" }} />
            }
            title="Quản Lý tài khoản"
            style={{ color: "white" }}
          >
            <Menu.Item key="7.0">
              <Link to="/employee-management">Nhân viên</Link>
            </Menu.Item>
            <Menu.Item key="7.1">
              <Link to="/custumer-management">Khách hàng</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="header-layout"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 7,
            minHeight: 280,
            borderRadius: "15px",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardCensor;
