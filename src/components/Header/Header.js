import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";

function Header() {
  const [inputSearch, setInputSearch] = useState("");
  const history = useHistory();

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        // callMyFunction();
        history.push(`/search/${inputSearch}`);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [inputSearch]);

  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon />
        <Link to="/">
          <img
            className="header__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="header__center">
        <input
          type="text"
          onChange={(e) => setInputSearch(e.target.value)}
          value={inputSearch}
          placeholder="Search"
        />
        <SearchIcon className="header__searchbutton" />
      </div>

      {/* <div className="header__right"> */}
      {/* <VideoCallIcon className='header__icon'/>
            <AppsIcon className='header__icon'/>
            <NotificationsIcon className='header__icon'/> */}
      {/* <Avatar
          alt="Nouman Ahmed"
          stc="https://avatars1.githubusercontent.com/u/35970677?s=60&v=4"
        />
      </div> */}
      <Link to="/signin">
        <div
          className="header__right sign_in_header"
          style={{ cursor: "pointer" }}
        >
          SIGN IN
        </div>
      </Link>
    </div>
  );
}

export default Header;
