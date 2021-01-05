import * as React from "react";
import XIcon  from "../../../lib";
import IconPreviewItem from "./icon-preview-item";

const IconPreviewList = React.memo(() => {
  return (
    <div className="icon-preview-list">
      {Object.entries(XIcon).map(([name, Icon]) => (
        <IconPreviewItem name={name} key={name} icon={<Icon />} />
      ))}
    </div>
  );
});

export default IconPreviewList;
