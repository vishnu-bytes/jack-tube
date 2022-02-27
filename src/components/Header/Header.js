import React, { useEffect, useState } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import { useWebinarStore } from "../../store";
import ColumnGroup from "antd/lib/table/ColumnGroup";

// const email = localStorage.getItem("email");

function Header() {
  const [inputSearch, setInputSearch] = useState("");
  const [{ token ,drawerValue}, { onSignout, search,drawerOn }] = useWebinarStore();
  const [email, setemail] = useState("");
  const [name, setname] = useState("");

  useEffect(() => {
    const emaildat = localStorage.getItem("email");
    setemail(emaildat);

    const namedat = localStorage.getItem("name");
    setname(namedat);
    console.log(namedat,"name value")

    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        // callMyFunction();
        search(inputSearch);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [inputSearch, token, search]);

  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon onClick={()=>drawerOn(!drawerValue)} />
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
          onChange={(e) => {
            setInputSearch(e.target.value);
            search(e.target.value);
          }}
          value={inputSearch}
          placeholder="Search"
        />
        <SearchIcon className="header__searchbutton" />
      </div>

      {localStorage.getItem("token") === null ? (
        <Link to="/signin">
          <div
            className="header__right sign_in_header"
            style={{ cursor: "pointer" }}
          >
            SIGN IN
          </div>
        </Link>
      ) : (
        <Popover
          placement="bottomRight"
          content={
            <div>
              <p style={{ color: "white", textAlign: "center" }}>{email}</p>
              <button onClick={() => onSignout()}>Signout</button>
            </div>
          }
          trigger="click"
        >
          <Avatar
            style={{
              backgroundColor: "#ffbf00",
              verticalAlign: "middle",
            }}
            size="large"
          >
            {email?.toUpperCase()?.slice(0, 1)}
          </Avatar>
        </Popover>
      )}
    </div>
  );
}

export default Header;
