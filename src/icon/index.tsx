import {IconProps} from "../IconProps";
import classnames from 'classnames';
import * as React from "react";
import {IconAssets} from "./icon.values";
import {HTMLAttributes} from "react";


type XIcon = {
  Loading: React.FC<HTMLAttributes<HTMLSpanElement>>;
}

const IconComponent = React.memo<IconProps>(props => {
  const { className, style, type } = props;
  const icon = IconAssets[type];
  return (
    <span
      className={classnames(className)}
      style={style}
    >
      {icon}
  </span>
  )
}, (prevProps, nextProps) => {
  if (prevProps.className !== nextProps.className) return false;
  if (prevProps.type !== nextProps.type) return false;

  return true;
})