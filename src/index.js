import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { auth, database } from "./components/Firebase";
import Login from "./components/layout/Login";
import { DataProvider } from "./components/Context";
import Body from "./components/layout/Body";

import "./styles.css";

const App = () => {
  const [data, setData] = useState({});
  const [content, setContent] = useState("Upload");
  useEffect(() => {
    let collection = {};
    try {
      auth.onAuthStateChanged(user => {
        console.log(user.email);
        if (user) {
          collection = {
            signedIn: true,
            user: { email: user.email }
          };
          // unscubscribe???
          console.log(collection.signedIn);
          database
            .collection("Data")
            .where("category", "==", content)
            .orderBy("timestamp", "desc")
            .onSnapshot(snapshot => {
              let entries = [];
              if (snapshot.size) {
                snapshot.forEach(doc =>
                  entries.push({ ...doc.data(), id: doc.id })
                );
                collection = {
                  ...collection,
                  entries: entries,
                  setContent: { setContent }
                };
                setData(collection);
              }
            });
        } else {
          collection = {
            signedIn: false
          };
          setData(collection);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [content]);
  console.log(data);
  return (
    <DataProvider value={data}>
      <div>{data.signedIn ? <Body /> : <Login />}</div>
    </DataProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
