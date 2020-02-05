import React, { useRef } from "react";
import { firestoreAdd, store } from "./Firebase";

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

const hashCode = s =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const Dropzone = () => {
  const containerRef = useRef(null);
  const url = "process.php";
  window.addEventListener("dragenter", () => {
    showDropZone();
  });
  const allowDrag = event => {
    if (true) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
  };
  const handleDrop = async event => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files[]", file);
      const data = {
        client: "Flashtalking",
        type: "File",
        branch: "Link",
        format: "",
        device: "N/A",
        url:
          "https://flashtalking.info/Studio/Jan/build/upload/" + files[i].name,
        date: new Date().getTime().toString(),
        created: new Date().toLocaleString()
      };
      switch (true) {
        case files[i].type.indexOf("presentation") !== -1:
          data.format = "pptx";
          break;
        case files[i].type.indexOf("document") !== -1:
          data.format = "docx";
          break;
        default:
          data.format = files[i].type;
          break;
      }
      await store("Links", hashCode(files[i].name).toString(), data);
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
