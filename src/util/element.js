import { ARROW_LENGTH, TOOL_ITEMS, COLORS } from "../constants";
import rough from "roughjs";
import getStroke from "perfect-freehand";
import { getArrowHeadsCoordinates , isPointCloseToLine} from "./math";
const gen = rough.generator();

export const getSvgPathFromStroke = (stroke) => {
    if (!stroke.length) return "";
    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            const [x1, y1] = arr[(i + 1) % arr.length];
            acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
            return acc;
        },
        ["M", ...stroke[0], "Q"]
    );
    d.push("Z");
    return d.join(" ");
};

export const createRoughElement = (id, x1, y1, x2, y2, { type, stroke = COLORS.BLACK }) => {
    const element = {
        id,
        x1,
        y1,
        x2,
        y2,
        type,
    };

    let options = {
        seed: id + 1,
    };

    switch (type) {
        case TOOL_ITEMS.BRUSH:
            const brushElement = {
                id,
                points: [{ x: x1, y: y1 }],
                path: new Path2D(getSvgPathFromStroke(getStroke([{ x: x1, y: y1 }]))),
                type,
                stroke,
            };
            return brushElement;
        case TOOL_ITEMS.LINE:
            element.roughEle = gen.line(x1, y1, x2, y2, options);
            return element;
        case TOOL_ITEMS.RECTANGLE:
            element.roughEle = gen.rectangle(x1, y1, x2 - x1, y2 - y1, options);
            return element;
        case TOOL_ITEMS.CIRCLE:
            const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
            const width = x2 - x1, height = y2 - y1;
            element.roughEle = gen.ellipse(cx, cy, width, height, options);
            return element;
        case TOOL_ITEMS.ARROW:
            const { x3, y3, x4, y4 } = getArrowHeadsCoordinates(x1, y1, x2, y2, ARROW_LENGTH);
            const points = [
                [x1, y1],
                [x2, y2],
                [x3, y3],
                [x2, y2],
                [x4, y4]
            ];
            element.roughEle = gen.linearPath(points, options);
            return element;
        default:
            throw new Error("Type not recognized");
    }
};

export const isPointNearElement = (element, pointX, pointY) => {
    const {x1, y1, x2, y2, type} = element;
    switch (type) {
        case TOOL_ITEMS.LINE:
        case TOOL_ITEMS.ARROW:
            return isPointCloseToLine(x1, y1, x2, y2, pointX, pointY);
        case TOOL_ITEMS.RECTANGLE:
            return (
                isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
                isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
                isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
                isPointCloseToLine(x1, y2, x1, y1, pointX, pointY) 
            );
        case TOOL_ITEMS.CIRCLE:
            return (
                isPointCloseToLine(x1, y1, x2, y1, pointX, pointY) ||
                isPointCloseToLine(x2, y1, x2, y2, pointX, pointY) ||
                isPointCloseToLine(x2, y2, x1, y2, pointX, pointY) ||
                isPointCloseToLine(x1, y2, x1, y1, pointX, pointY) 
            );
        case TOOL_ITEMS.BRUSH:
            const context = document.getElementById("canvas").getContext("2d");
            return context.isPointInPath(element.path, pointX, pointY);
        default:
            throw new Error("Type not recognized");
        
    }
};
