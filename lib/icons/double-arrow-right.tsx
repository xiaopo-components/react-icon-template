// THIS FILE CREATE BY build-tools/generate.js

import React from "react";
/**
 *  if you want custom component name
 *  you should modify template in 'build-tools/generate.js'
 *
 *  if you want custom your icon component, only modify 'lib/component/icon-component.tsx'
 */
import IconComponent, { IconProps } from "../component/icon-component";
import Icon from "../assets/double-arrow-right.svg";

const DoubleArrowRight = React.ForwardRef<HTMLSpanElement, IconProps>(
  (props, ref) => (
    <IconComponent {...props} ref={ref}>
      <Icon />
    </IconComponent>
  )
);

DoubleArrowRight.displayName = "IconDoubleArrowRight";

export default DoubleArrowRight;