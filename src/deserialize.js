import { jsx } from "slate-hyperscript";

const deserialize = (el) => {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{ text: "" }];
  }

  switch (el.nodeName) {
    case "BODY":
      return jsx("fragment", {}, children);
    case "BR":
      return "\n";
    case "P":
      return jsx("element", { type: "paragraph" }, children);
    case "OL":
      return jsx("element", { type: "bulleted-list" }, children);
    case "UL":
      return jsx("element", { type: "numbered-list" }, children);
    case "LI":
      return jsx("element", { type: "list-item" }, children);
    case "STRONG":
      return jsx("text", { bold: true }, children);
    case "EM":
      return jsx("text", { italic: true }, children);
    case "U":
      return jsx("text", { underline: true }, children);
    default:
      return el.textContent;
  }
};

export default deserialize;
