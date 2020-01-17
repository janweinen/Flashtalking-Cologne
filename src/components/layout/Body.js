import React from "react";
import Header from "./Header";
import Content from "./Content";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faPlusCircle,
  faExternalLinkAlt
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";

library.add(faSearch, faPlusCircle, faExternalLinkAlt);

const style = {
  body: {
    height: window.innerHeight + "px",
    fontFamily: "Open Sans",
    backgroundColor: "#f4f5f5"
  }
};

const Body = () => {
  return (
    <div style={style.body}>
      <Header />
      <Content />
    </div>
  );
};

export default Body;
