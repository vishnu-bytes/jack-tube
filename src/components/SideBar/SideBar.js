import React from "react";
import SideBarRow from "./../SideBarRow/SideBarRow";
import "./SideBar.css";
import HomeIcon from "@material-ui/icons/Home";
import { useWebinarStore } from "../../store";

const SideBar = () => {
  const [{ drawerValue }, {}] = useWebinarStore();
console.log(drawerValue,"drawer")
  return (
    <div className="sidebar">
      <SideBarRow selected Icon={HomeIcon} title="Home" />
    </div>
  );
};

export default SideBar;
