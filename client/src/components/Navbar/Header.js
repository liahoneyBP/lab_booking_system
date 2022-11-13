import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  InsertRowBelowOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  SolutionOutlined,
  
} from "@ant-design/icons";
import { Link } from "react-router-dom";


import { getAuth, signOut } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';

import Box from '@mui/material/Box';

const { SubMenu, Item } = Menu;


const Header = () => {
  const [current, setCurrent] = useState("home");

  let dispatch = useDispatch();
  const navigate = useNavigate();
  let { user } = useSelector((state) => ({ ...state}));


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
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>


      <Item key="lab" icon={<InsertRowBelowOutlined />}>
        <Link to="/lab">Lab</Link>
      </Item>
      
      <Item key="mybookings" icon={<SolutionOutlined />}>
        <Link to="/mybookings">My Bookings</Link>
      </Item>

      <Item key="schedule" icon={<ScheduleOutlined />}>
        <Link to="/schedule">Schedule</Link>
      </Item>



{!user && (
      <Item key="sign-up" icon={<UserAddOutlined />} className="float-right">
        <Link to="/sign-up">Sign Up</Link>
      </Item>
)}

{!user && (
      <Item key="sign-in" icon={<UserOutlined />} className="float-right">
        <Link to="/sign-in">Sign In</Link>
      </Item>
)}

{user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "user" && (
            <Item>
              <Link to="/user/profile">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;
