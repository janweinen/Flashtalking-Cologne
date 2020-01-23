import React, { useRef } from "react";

// Completely based on this answer:
// http://stackoverflow.com/a/33917000
// … and the according JSfiddle:
// https://jsfiddle.net/oL2akhtz/
//
// Enhanced for my own purposes

// https://codepen.io/nekobog/pen/JjoZvBm

// var dropZone = document.getElementById("dropzone");

// 1

// 2
//dropZone.addEventListener("dragenter", allowDrag);
//dropZone.addEventListener("dragover", allowDrag);

// 3
/*dropZone.addEventListener("dragleave", function(e) {
  console.log("dragleave");
  hideDropZone();
});*/

// 4
//dropZone.addEventListener("drop", handleDrop);

const style = {
  boxSizing: "border-box",
  display: "none",
  position: "fixed",
  width: "100%",
  height: "100%",
  left: "0",
  top: "0",
  zIndex: "99999",

  background: "rgba(0,0,0, 0.3)",
  border: "11px dashed rgba(255,255,255, 0.3)"
};

const Dropzone = () => {
  const containerRef = useRef(null);
  window.addEventListener("dragenter", function(e) {
    showDropZone();
  });
  function allowDrag(e) {
    if (true) {
      // Test that the item being dragged is a valid one
      e.dataTransfer.dropEffect = "copy";
      e.preventDefault();
    }
  }
  function handleDrop(e) {
    e.preventDefault();
    hideDropZone();

    alert("Drop!");
  }
  function showDropZone() {
    containerRef.current.style.display = "block";
    console.log("on");
  }
  function hideDropZone() {
    containerRef.current.style.display = "none";
    console.log("off");
  }
  return (
    <div
      id="dropzone"
      ref={containerRef}
      onDragEnter={allowDrag}
      onDragOver={allowDrag}
      onDragLeave={hideDropZone}
      onDrop={handleDrop}
      style={style}
    />
  );
};

export default Dropzone;
