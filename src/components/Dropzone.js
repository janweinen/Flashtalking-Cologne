import React, { useRef, useState, useContext } from "react";
import { store } from "./Firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import DataContext from "./Context";

const DropzoneContainer = styled.div`
  box-sizing: border-box;
  display: none;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.3);
  border: 11px dashed rgba(255, 255, 255, 0.3);
`;

const Input = styled.input`
  opacity: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100000;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  font-size: 10vw;
  vertical-align: middle;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -5vw;
  margin-top: -5vw;
`;

const hashCode = s =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const Dropzone = () => {
  const dataContext = useContext(DataContext);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    event.preventDefault();
    const files = event.dataTransfer.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files[]", file);
      const data = {
        client: "Flashtalking",
        category: "Upload",
        format: "",
        device: "N/A",
        url:
          "https://flashtalking.info/Studio/Jan/build/upload/" + files[i].name,
        lastChanged: new Date().toLocaleString(),
        timestamp: new Date().getTime().toString(),
        name: files[i].name,
        contentEditable: {
          client: false,
          format: false,
          device: false,
          url: false
        }
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
      await store("Data", hashCode(files[i].name).toString(), data, "dropzone");
      dataContext.setContent.setContent("Upload");
    }
    await fetch(url, {
      method: "POST",
      body: formData
    });
    hideDropZone();
    setLoading(false);
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
    <DropzoneContainer ref={containerRef} onDragLeave={hideDropZone}>
      {loading ? (
        <div style={{ color: "#ffffff" }}>
          <StyledIcon icon={["fas", "sync"]} spin />
        </div>
      ) : (
        <div />
      )}
      <form method="post" encType="multipart/form-data">
        <Input
          type="file"
          name="files[]"
          multiple
          onDragEnter={allowDrag}
          onDragOver={allowDrag}
          onDrop={handleDrop}
        />
      </form>
    </DropzoneContainer>
  );
};

export default Dropzone;
