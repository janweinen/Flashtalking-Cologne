import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { auth, database } from "./components/Firebase";
import Login from "./components/layout/Login";
import { DataProvider } from "./components/Context";
import Body from "./components/layout/Body";

import "./styles.css";

const App = () => {
  const [data, setData] = useState({});
  const [content, setContent] = useState("File");
  useEffect(() => {
    let collection = {};
    const init = async () => {
      try {
        await auth.onAuthStateChanged(user => {
          if (user) {
            collection = {
              signedIn: true,
              user: { email: user.email }
            };
            // unscubscribe???
            // hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
            database
              .collection("Links")
              .where("type", "==", content)
              .orderBy("date", "desc")
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
    };
    init();
  }, [content]);

  return (
    <DataProvider value={data}>
      <div>{data.signedIn ? <Body /> : <Login />}</div>
    </DataProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
