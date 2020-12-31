// @ts-ignore
import React, {ForwardRefExoticComponent, HTMLAttributes, PropsWithoutRef, RefAttributes} from "react";
import classnames from 'classnames';
import './index.css';
import ChevronLeft from './assets/chevron-left.svg';
import ContentCopy from './assets/content-copy.svg';
import DoneAll from './assets/done-all.svg';
import Done from './assets/done.svg';
import DoubleArrowLeft from './assets/double-arrow-left.svg';
import DoubleArrowRight from './assets/double-arrow-right.svg';
import Loading from './assets/loading.svg';


function CreateIconComponent(Component: React.FunctionComponent) {
  return React.forwardRef<HTMLSpanElement>((props: HTMLAttributes<HTMLSpanElement>, ref) => {
    const {className, ...otherProps} = props;
    return (
      <span {...otherProps} className={classnames(
        className,
      )} ref={ref}>
            <Component/>
          </span>
    )
  })
}

const XIconAssets = {
  ChevronLeft: CreateIconComponent(ChevronLeft),
  ContentCopy: CreateIconComponent(ContentCopy),
  DoneAll: CreateIconComponent(DoneAll),
  Done: CreateIconComponent(Done),
  DoubleArrowLeft: CreateIconComponent(DoubleArrowLeft),
  DoubleArrowRight: CreateIconComponent(DoubleArrowRight),
  Loading: CreateIconComponent(Loading),

}

export default {XIconAssets};
  