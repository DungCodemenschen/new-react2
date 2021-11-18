import { DragIconWrapper } from "../styles";
import { ReactComponent as DragHandleIcon } from "../coding.svg";
import React from "react";

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <DragHandleIcon />
    </DragIconWrapper>
  );
}