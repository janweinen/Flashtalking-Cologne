import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { auth, database } from "./components/Firebase";
import Login from "./components/layout/Login";
import { DataProvider } from "./components/Context";
import Body from "./components/layout/Body";

import "./styles.css";

const App = () => {
  const returnNameFromEmail = (user) => {
    if (typeof user.email !== "string") return "";
    const rawName = user.email;
    const name = rawName.split("@");
    let fullName = "User";
    //const names = rawName[0].split(".");
    //const forname = names[0].charAt(0).toUpperCase() + names[0].slice(1);
    //const surname = names[1].charAt(0).toUpperCase() + names[1].slice(1);
    //return forname + " " + surname;
    switch (name[0]) {
      case "mmilosevic":
        fullName = "Milos Milosevic";
        break;
      case "gstrbo":
        fullName = "Goran Strbo";
        break;
      case "jcrickett":
        fullName = "John Crickett";
        break;
      case "cnachmias":
        fullName = "Christopher Nachmias";
        break;
      case "jphoelich":
        fullName = "Joost Phoelich";
        break;
      case "sbazec":
        fullName = "Sonia Bazec";
        break;
      case "tschloesser":
        fullName = "Thorben Schlösser";
        break;
      case "ssuhre":
        fullName = "Sebastian Suhre";
        break;
      case "flefering":
        fullName = "Frank Lefering";
        break;
      case "shennigfeld":
        fullName = "Stefanie Hennigfeld";
        break;
      case "caltemeier":
        fullName = "Christian Altemeier";
        break;
      case "hpflug":
        fullName = "Heike Pflug";
        break;
      case "agreve":
        fullName = "Alexander Greve";
        break;
      case "iweinen":
        fullName = "Ina Weinen";
        break;
      case "lisenberg":
        fullName = "Lukas Isenberg";
        break;
      case "sgharehbaghi":
        fullName = "Solmaz Gharehbaghi";
        break;
      case "gdipalma":
        fullName = "Gianna Di Palma";
        break;
      case "oguezey":
        fullName = "Orhun Güzey";
        break;
      case "jweinen":
        fullName = "Jan Weinen";
        break;
      case "cthelen":
        fullName = "Christian Thelen";
        break;
      case "rschmeisser":
        fullName = "Ronny Schmeisser";
        break;
      case "hsachs":
        fullName = "Heiko Sachs";
        break;
      default:
        fullName = "User";
    }
    return fullName;
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
              name: returnNameFromEmail(user),
            },
          };
          const unsubscribe = database
            .collection("Data")
            .where("category", "==", content)
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
              let entries = [];
              if (snapshot.size) {
                snapshot.forEach((doc) =>
                  entries.push({ ...doc.data(), id: doc.id }),
                );
                collection = {
                  ...collection,
                  entries: entries,
                  content: content,
                  setContent: { setContent },
                  unsubscribe: { unsubscribe },
                };
                setData(collection);
              }
            });
        } else {
          collection = {
            signedIn: false,
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

ReactDOM.render(<App />, document.getElementById("root"));
