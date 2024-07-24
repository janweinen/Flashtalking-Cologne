import React from "react";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Dropzone from "../Dropzone";

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
  faSignOutAlt,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

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
  faSignOutAlt,
  faCircleNotch,
);

const style = {
  body: {
    height: "100vh",
    fontFamily: "Open Sans",
    backgroundColor: "#f4f5f5",
  },
};

const Body = () => {
  return (
    <div style={style.body}>
      <Header />
      <Dropzone />
      <Content />
      <Footer />
    </div>
  );
};

export default Body;
