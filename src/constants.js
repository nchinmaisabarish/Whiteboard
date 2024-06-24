export const TOOL_ITEMS = {
    BRUSH: 'BRUSH',
    LINE: 'LINE',
    RECTANGLE: 'RECTANGLE',
    CIRCLE: 'CIRCLE',
    ARROW: 'ARROW',
    ERASER: 'ERASER',
  };

export const TOOL_ACTION_TYPES = {
    NONE: "NONE",
    DRAWING: "DRAWING",
    ERASING: "ERASING",
};

export const BOARD_ACTIONS = {
    CHANGE_TOOL: "CHANGE_TOOL",
    DRAW_DOWN: "DRAW_DOWN",
    DRAW_UP: "DRAW_UP",
    DRAW_MOVE: "DRAW_MOVE",
    ERASE: "ERASE",
    CHANGE_ACTION_TYPE: "CHANGE_ACTION_TYPE",
    UNDO: "UNDO",
    REDO: "REDO",
};

export const COLORS = {
    BLACK: "#000000",
    RED: "#ff0000",
    GREEN: "#00ff00",
    BLUE: "#0000ff",
    YELLOW: "#ffffff00",
    WHITE: "#ffffff",
};

export const ARROW_LENGTH = 20;

export const ELEMENT_ERASE_THRESHOLD = 0.1;