import React, { useContext } from "react";
import classes from "./index.module.css";
import cx from "classnames";
import { 
    FaSlash,
    FaRegCircle,
    FaArrowRight,
    FaPaintBrush,
    FaEraser,
    FaUndoAlt,
    FaRedoAlt
 } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";
import { TOOL_ITEMS } from "../../constants";
import BoardContext from "../../store/board-context";

const Toolbar = () => {
  const { activeToolItem, changeToolHandler, undo, redo } = useContext(BoardContext);

  return (
    <div className={classes.container}>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.BRUSH,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.BRUSH)}
      >
        <FaPaintBrush />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.LINE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.LINE)}
      >
        <FaSlash />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.RECTANGLE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.RECTANGLE)}
      >
        <LuRectangleHorizontal />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.CIRCLE,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.CIRCLE)}
      >
        <FaRegCircle />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ARROW,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ARROW)}
      >
        <FaArrowRight />
      </div>
      <div
        className={cx(classes.toolItem, {
          [classes.active]: activeToolItem === TOOL_ITEMS.ERASER,
        })}
        onClick={() => changeToolHandler(TOOL_ITEMS.ERASER)}
      >
        <FaEraser />
      </div>
      <div
        className={classes.toolItem}
        onClick={undo}
      >
        <FaUndoAlt />
      </div>
      <div
        className = {classes.toolItem}
        onClick={redo}
      >
        <FaRedoAlt />
      </div>
    </div>
  );
};

export default Toolbar;
