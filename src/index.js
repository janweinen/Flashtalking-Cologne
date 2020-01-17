import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { auth, database } from "./components/Firebase";
import Login from "./components/layout/Login";
import { DataProvider } from "./components/Context";
import Body from "./components/layout/Body";

import "./styles.css";

const App = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    let collection = {};
    async function init() {
      try {
        await auth.onAuthStateChanged(user => {
          if (user) {
            collection = {
              signedIn: true,
              user: { email: user.email }
            };
            database.collection("Links").onSnapshot(snapshot => {
              let entries = [];
              if (snapshot.size) {
                snapshot.forEach(doc =>
                  entries.push({ ...doc.data(), id: doc.id })
                );
                collection = { ...collection, entries: entries };
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
    }
    init();
  }, []);

  return (
    <DataProvider value={data}>
      <div>{data.signedIn ? <Body /> : <Login />}</div>
    </DataProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
