import React from "react";
import SideBarRow from "./../SideBarRow/SideBarRow";
import "./SideBar.css";
import HomeIcon from "@material-ui/icons/Home";
import { useWebinarStore } from "../../store";
import { Drawer } from "antd";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import Youtube from "../Assets/youtube.png";

const SideBar = () => {
  const [{ drawerValue }, { drawerOn }] = useWebinarStore();
  return (
    <Drawer
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MenuIcon onClick={() => drawerOn(!drawerValue)} />
          <Link to="/">
            <img className="header__logo" src={Youtube} alt="" />
          </Link>
        </div>
      }
      placement={"left"}
      closable={false}
      onClose={() => drawerOn(!drawerValue)}
      visible={drawerValue}
      key={"left"}
      mask={false}
    >
      <div className="sidebar">
        <SideBarRow selected Icon={HomeIcon} title="Home" />
      </div>
    </Drawer>
  );
};

export default SideBar;
