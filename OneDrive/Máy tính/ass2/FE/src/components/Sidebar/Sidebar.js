
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaList } from "react-icons/fa";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
import "react-pro-sidebar/dist/css/styles.css";
import './Sidebar.css'
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import ListPage from "../../pages/Admin/ListPage/ListPage";
import Brand from "../../pages/Admin/Brand/Brand";
import Watch from "../../pages/Admin/Watch/Watch";
import User from "../../pages/Admin/User/User";

const Sidebar = () => {
  //menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false)
  //custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  }
  const navigate = useNavigate();
  const [active, setActive] = useState(true)
  const [active1, setActive1] = useState(false)
  const handleOnClick = () => {
    setActive(!active);
    setActive1(!active1);
  }

  const handleLogout = () => {

    // localStorage.setItem('token', '');
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* Icon change using menucollapse state */}
              <p style={{ marginLeft: "26px" }}>{menuCollapse ? <GiAbstract050 /> : <SiApacheairflow />}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle />
              ) : (
                <FiArrowLeftCircle />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">

            <MenuItem active={active} icon={<FaList />} onClick={handleOnClick}
              >List User
                <Link to={'/admin/users'} element={<User />} />
              </MenuItem>

              <MenuItem active={active} icon={<FaList />} onClick={handleOnClick}
              >List Brands
                <Link to={'/admin/brands'} element={<Brand />} />
              </MenuItem>

              <MenuItem active={active} icon={<FaList />} onClick={handleOnClick}
              >List Watch
                <Link to={'/admin/'} element={<Watch/>} />
              </MenuItem>

           

              
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />} onClick={handleLogout} >Đăng xuất
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
}
export default Sidebar;