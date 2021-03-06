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
  backdrop-filter: blur(2px);
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

const hashCode = (s) =>
  s.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

const Dropzone = () => {
  const dataContext = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const dropzone = useRef();
  const url = "process.php";
  window.addEventListener("dragenter", () => {
    showDropZone();
  });
  const allowDrag = (event) => {
    if (true) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
  };
  const handleDrop = async (event) => {
    setLoading(true);
    event.preventDefault();
    const files = event.dataTransfer.files;
    const formData = new FormData();
    let storing = false;
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("files[]", file);
      const data = {
        client: "Flashtalking",
        category: "Upload",
        format: "",
        device: "–",
        tags: "–",
        url:
          "https://www.flashtalking.info/library/upload/" +
          files[i].name.replace(/[^a-zA-Z0-9._]/g, ""),
        lastChanged: new Date().toLocaleString(),
        timestamp: new Date().getTime().toString(),
        name: files[i].name.replace(/[^a-zA-Z0-9._]/g, ""),
        clientEditable: "true",
        formatEditable: "false",
        deviceEditable: "true",
        tagsEditable: "true",
        urlEditable: "false",
        user: dataContext.user.email,
        userName: dataContext.user.name,
        uid: dataContext.user.uid
      };
      switch (true) {
        case files[i].name.indexOf("pptx") !== -1:
          data.format = "powerpoint/pptx";
          break;
        case files[i].name.indexOf("ppsx") !== -1:
          data.format = "powerpoint/ppsx";
          break;
        case files[i].name.indexOf("docx") !== -1:
          data.format = "word/docx";
          break;
        case files[i].name.indexOf("xlsx") !== -1:
          data.format = "excel/xslx";
          break;
        default:
          data.format = files[i].type;
          break;
      }
      storing = await store(
        "Data",
        hashCode(files[i].name.replace(/[^a-zA-Z0-9._]/g, "")).toString(),
        data,
        "dropzone"
      );
      dataContext.setContent.setContent("Upload");
    }
    console.log(storing);
    if (storing) {
      await fetch(url, {
        method: "POST",
        body: formData
      }).then((response) => {
        console.log(response, files);
      });
    }
    hideDropZone();
    setLoading(false);
  };
  const showDropZone = () => {
    dropzone.current.style.display = "block";
    console.log("on");
  };
  const hideDropZone = () => {
    dropzone.current.style.display = "none";
    console.log("off");
  };
  return (
    <DropzoneContainer ref={dropzone} onDragLeave={hideDropZone}>
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
