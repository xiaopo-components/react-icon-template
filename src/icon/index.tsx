import classnames from 'classnames';
import * as React from "react";
import {IconAssets} from "./icon.values";
import {HTMLAttributes} from "react";

type IconProps = {
  content: any,
} & HTMLAttributes<HTMLSpanElement>;

type XIcon = {
  Loading: React.FC<HTMLAttributes<HTMLSpanElement>>;
}

const IconComponent = React.memo<IconProps>(props => {
  const { className, content, ...spanProps } = props;
  return (
    <span
      className={classnames(className)}
      {...spanProps}
    >
      {content}
  </span>
  )
}, (prevProps, nextProps) => {
  if (prevProps.className !== nextProps.className) return false;
  if (prevProps.content !== nextProps.content) return false;

  return true;
})

export default {
  Loading: React.memo<HTMLAttributes<HTMLSpanElement>>((props) =>  (<IconComponent content={IconAssets.Loading} {...props} />))
} as XIcon;