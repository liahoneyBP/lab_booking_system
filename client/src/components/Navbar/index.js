import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";


import { getAuth, signOut } from "firebase/auth";

import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';

const { SubMenu, Item } = Menu;


const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/sign-in");
  };

  return (
    <Menu theme="dark" onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      <Item key="lab" icon={<AppstoreOutlined />}>
        <Link to="/lab">Lab</Link>
      </Item>

      <Item key="mybookings" icon={<AppstoreOutlined />}>
        <Link to="/mybookings">My Bookings</Link>
      </Item>

      <Item key="schedule" icon={<AppstoreOutlined />}>
        <Link to="/schedule">Schedule</Link>
      </Item>

      <Item key="sign-up" icon={<UserAddOutlined />} className="float-right">
        <Link to="/sign-up">Sign Up</Link>
      </Item>

      <Item key="sign-in" icon={<UserOutlined />} className="float-right">
        <Link to="/sign-in">Sign In</Link>
      </Item>

      <SubMenu icon={<SettingOutlined />} title="Username">
        <Item key="setting:1">Option 1</Item>
        <Item key="setting:2">Option 2</Item>
        <Item icon={<LogoutOutlined />} onClick={logout}>
          Logout
        </Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
