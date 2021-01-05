import * as React from "react";
import { Message } from "../message";
import copy from "copy-to-clipboard";

type IconPreviewItemProps = {
  name: string;
  icon: React.ReactNode;
};
const IconPreviewItem = React.memo<IconPreviewItemProps>((props) => {
  const { icon, name } = props;
  const CopyCode = React.useCallback(() => {
    copy(`<XIcon.${name} />`);

    Message.info(`icon ${name} code copied`);
  }, []);
  if (React.isValidElement(icon)) {
    return (
      <div className="icon-preview-item" onClick={CopyCode}>
        <span className="icon-preview-item-wrapper">
          <span className="icon-preview-item--icon">{icon}</span>
          <span className="icon-preview-item--name">{name}</span>
        </span>
      </div>
    );
  }

  return null;
});

IconPreviewItem.displayName = "IconPreviewItem";

export default IconPreviewItem;
