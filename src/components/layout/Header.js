import React, { useContext } from "react";
import { logout } from "../Firebase";
import DataContext from "../Context";
import Logo from "../../assets/images/FT-Logo@3x.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const style = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100vw",
    height: "64px",
    borderBottom: "3px solid #d6d8db",
    backgroundColor: "#374047",
    color: "rgba(255,255,255,1)"
  },
  headerItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "20px",
    image: {
      height: "22px",
      verticalAlign: "middle"
    },
    imageContainer: {
      borderRight: "1px solid #979797",
      paddingRight: "10px"
    },
    productName: {
      color: "rgba(255,255,255,1)",
      fontSize: "19px",
      fontWeight: "400",
      textTransform: "lowercase",
      margin: "0 0 0 10px"
    },
    button: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      borderRight: "1px solid #4a5258",
      height: "100%",
      marginRight: "20px",
      paddingRight: "20px",
      fontSize: "12px",
      cursor: "pointer",
      color: "#aeb2b5"
    },
    userIcon: {
      fontSize: "18px",
      verticalAlign: "middle",
      marginLeft: "10px"
    },
    buttonIcon: {
      fontSize: "18px",
      verticalAlign: "middle",
      marginRight: "10px"
    }
  }
};

const Header = () => {
  const data = useContext(DataContext);
  return (
    <header style={style.header}>
      <div style={style.headerItem}>
        <div style={style.headerItem.imageContainer}>
          <img style={style.headerItem.image} src={Logo} alt="Logo" />
        </div>
        <h1 style={style.headerItem.productName}>cologne</h1>
      </div>
      <div style={style.headerItem}>
        <div
          style={style.headerItem.button}
          onClick={() => data.setContent.setContent("File")}
        >
          <FontAwesomeIcon
            style={style.headerItem.buttonIcon}
            icon={faUserCircle}
          />
          Files
        </div>
        <div
          style={style.headerItem.button}
          onClick={() => data.setContent.setContent("Demo")}
        >
          <FontAwesomeIcon
            style={style.headerItem.buttonIcon}
            icon={faUserCircle}
          />
          Demos
        </div>
        <div style={style.headerItem.button} onClick={logout}>
          {data.user.email}
          <FontAwesomeIcon
            style={style.headerItem.userIcon}
            icon={faUserCircle}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
