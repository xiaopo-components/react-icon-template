import React, { HTMLAttributes } from "react";
import classnames from "classnames";

// icon props
export type IconProps = {} & HTMLAttributes<HTMLSpanElement>;

const IconComponent = React.forwardRef<HTMLSpanElement, IconProps>(
  (props: IconProps, ref: React.MutableRefObject<HTMLSpanElement>) => {
    const { className, ...otherProps } = props;
    return (
      <span
        {...otherProps}
        className={classnames(className, "x-icon")}
        ref={ref}
      >
        {props.children}
      </span>
    );
  }
);

IconComponent.displayName = "IconComponent";

export default IconComponent;
