import React, { useState } from "react";
import { createPortal } from "react-dom";
import { firestoreAdd } from "../Firebase";

const style = {
  overlay: {
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "98",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  modal: {
    fontFamily: "sans-serif",
    position: "relative",
    zIndex: "99",
    width: "50%",
    height: "50%",
    maxWidth: "768px",
    margin: "0 auto",
    animation: "fadeIn 200ms",
    body: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(30,30,30,0.8)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)"
    },
    close: {
      position: "absolute",
      color: "white",
      top: "0",
      right: "0",
      paddingRight: "5px",
      WebkitAppearance: "none",
      background: "none",
      cursor: "pointer",
      zIndex: "100",
      padding: "0.1em 0.35em",
      fontFamily: "Arial",
      borderRadius: "1em",
      fontSize: "1.25em",
      border: "0"
    }
  }
};

const Modal = ({ activator, item }) => {
  const [show, setShow] = useState(false);
  const submit = async event => {
    event.preventDefault();
    const form = document.querySelector("#entry");
    const data = {
      client: form.client.value,
      url: form.url.value
    };
    await firestoreAdd("Links", data);
    setShow(false);
  };
  const content = show && (
    <div style={style.overlay}>
      <div style={style.modal}>
        <button
          aria-label="Close Modal"
          style={style.modal.close}
          type="button"
          onClick={() => setShow(false)}
        >
          &times;
        </button>
        <div style={style.modal.body}>
          <form id="entry">
            <label htmlFor="client">Client:</label>
            <input type="text" id="client" />
            <label htmlFor="url">URL:</label>
            <input type="text" id="url" />
            <button id="login" onClick={submit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {activator({ setShow })}
      {createPortal(content, document.body)}
    </>
  );
};

export default Modal;
