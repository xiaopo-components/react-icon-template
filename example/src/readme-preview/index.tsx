import * as React from "react";
import ReactMarkDown from "react-markdown";
import README from "../../../README.md";
import "./readme-peview.scss";

const ReadMePreview = React.memo(() => {
  return (
    <div className="readme-preview">
      <ReactMarkDown source={README} />
    </div>
  );
});

ReadMePreview.displayName = "ReadMePreview";

export default ReadMePreview;
