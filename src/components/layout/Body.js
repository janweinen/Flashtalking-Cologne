import React from "react";
import Header from "./Header";
import Content from "./Content";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faPlusCircle,
  faExternalLinkAlt,
  faCog,
  faTrashAlt,
  faSync,
  faFolder,
  faDesktop,
  faUser,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import Dropzone from "../Dropzone";

library.add(
  faSearch,
  faPlusCircle,
  faExternalLinkAlt,
  faCog,
  faTrashAlt,
  faSync,
  faFolder,
  faDesktop,
  faUser,
  faSignOutAlt
);

const style = {
  body: {
    height: "100vh",
    fontFamily: "Open Sans",
    backgroundColor: "#f4f5f5"
  }
};

const Body = () => {
  return (
    <div style={style.body}>
      <Header />
      <Dropzone />
      <Content />
    </div>
  );
};

export default Body;
