import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { auth, database } from "./components/Firebase";
import Login from "./components/layout/Login";
import { DataProvider } from "./components/Context";
import Body from "./components/layout/Body";

import "./styles.css";

const App = () => {
  const returnNameFromEmail = (email) => {
    if (typeof email !== "string") return "";
    const rawName = email.split("@");
    const names = rawName[0].split(".");
    const forname = names[0].charAt(0).toUpperCase() + names[0].slice(1);
    const surname = names[1].charAt(0).toUpperCase() + names[1].slice(1);
    return forname + " " + surname;
  };
  const [data, setData] = useState({ signedIn: false });
  const [content, setContent] = useState("Demo");
  useEffect(() => {
    let collection = {};
    try {
      auth.onAuthStateChanged((user) => {
        if (user) {
          collection = {
            signedIn: true,
            user: {
              uid: user.uid,
              email: user.email,
              name: returnNameFromEmail(user.email)
            }
          };
          const unsubscribe = database
            .collection("Data")
            .where("category", "==", content)
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
              let entries = [];
              if (snapshot.size) {
                snapshot.forEach((doc) =>
                  entries.push({ ...doc.data(), id: doc.id })
                );
                collection = {
                  ...collection,
                  entries: entries,
                  content: content,
                  setContent: { setContent },
                  unsubscribe: { unsubscribe }
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
      console.table(error);
    }
  }, [content]);
  return (
    <DataProvider value={data}>
      <div>{data.signedIn ? <Body /> : <Login />}</div>
    </DataProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
