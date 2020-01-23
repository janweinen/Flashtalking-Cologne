import React, { useRef } from "react";

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
  const url = "process.php";
  window.addEventListener("dragenter", event => {
    showDropZone();
  });
  const allowDrag = event => {
    if (true) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
  };
  const handleDrop = event => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files[]", file);
    }
    fetch(url, {
      method: "POST",
      body: formData
    }).then(response => {
      console.log(response, files);
    });
    hideDropZone();
  };
  const showDropZone = () => {
    containerRef.current.style.display = "block";
    console.log("on");
  };
  const hideDropZone = () => {
    containerRef.current.style.display = "none";
    console.log("off");
  };
  return (
    <form method="post" encType="multipart/form-data">
      <input
        type="file"
        name="files[]"
        multiple
        ref={containerRef}
        onDragEnter={allowDrag}
        onDragOver={allowDrag}
        onDragLeave={hideDropZone}
        onDrop={handleDrop}
        style={style}
      />
    </form>
  );
};

export default Dropzone;
