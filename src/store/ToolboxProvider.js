import React, { useReducer } from "react";
import toolboxContext from "./toolbox-context";
import { COLORS, TOOL_ITEMS } from "../constants";

function toolboxReducer(state, action) {
  switch (action.type) {
    case "SET_STROKE":
      return {
        ...state,
        [action.payload.tool]: {
          ...state[action.payload.tool],
          stroke: action.payload.stroke,
        },
      };
    case "SET_SIZE":
      return {
        ...state,
        [action.payload.tool]: {
          ...state[action.payload.tool],
          size: action.payload.size,
        },
      };
    case "SET_FILL":
      return {
        ...state,
        [action.payload.tool]: {
          ...state[action.payload.tool],
          fill: action.payload.fill,
        },
      };
    default:
      return state;
  }
}

const initialToolboxState = {
  [TOOL_ITEMS.LINE]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
  [TOOL_ITEMS.RECTANGLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.CIRCLE]: {
    stroke: COLORS.BLACK,
    fill: null,
    size: 1,
  },
  [TOOL_ITEMS.ARROW]: {
    stroke: COLORS.BLACK,
    size: 1,
  },
};

const ToolboxProvider = ({ children }) => {
  const [toolboxState, dispatchToolboxAction] = useReducer(toolboxReducer, initialToolboxState);

  const setStroke = (tool, stroke) => {
    dispatchToolboxAction({ type: "SET_STROKE", payload: { tool, stroke } });
  };

  const setSize = (tool, size) => {
    dispatchToolboxAction({ type: "SET_SIZE", payload: { tool, size } });
  };

  const setFill = (tool, fill) => {
    dispatchToolboxAction({ type: "SET_FILL", payload: { tool, fill } });
  };

  const toolboxContextValue = {
    toolboxState,
    setStroke,
    setSize,
    setFill,
  };

  return (
    <toolboxContext.Provider value={toolboxContextValue}>
      {children}
    </toolboxContext.Provider>
  );
};

export default ToolboxProvider;
