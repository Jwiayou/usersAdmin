import React from "react";
import styled from "@emotion/styled";
import { Layout, Menu, MenuProps } from "antd";
// prettier-ignore
import { useLocation, useNavigate, Route, Routes, RouteProps } from "react-router-dom";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

import Register from "./pages/Register";
import Management from "./pages/Management";

const { Content, Sider } = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  margin: 12px;
  padding: 12px;
  background: #fff;
`;

const menuItems: MenuProps["items"] = [
  {
    label: "注册用户",
    key: "/user/register",
    icon: <UserOutlined />,
  },
  {
    label: "用户管理",
    key: "/user/management",
    icon: <TeamOutlined />,
  },
];

const routes: RouteProps[] = [
  {
    element: <Register />,
    path: "/user/register",
  },
  {
    element: <Management />,
    path: "/user/management",
  },
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedKeys = [location.pathname];

  const handleMenuClick: MenuProps["onClick"] = (info) => {
    navigate(info.key);
  };

  return (
    <StyledLayout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
          items={menuItems}
          theme="dark"
        />
      </Sider>
      <Layout>
        <StyledContent>
          <Routes>
            {routes.map((route, index) => (
              <Route {...route} key={index} />
            ))}
          </Routes>
        </StyledContent>
      </Layout>
    </StyledLayout>
  );
};

export default App;
