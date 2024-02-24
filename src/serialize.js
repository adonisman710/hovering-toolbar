import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import escapeHtml from "escape-html";
import { Text } from "slate";
import { Typography } from "@material-ui/core";

const jsxToHtml = (value) => {
  return renderToStaticMarkup(value).toString();
};

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }
    if (node.italic) {
      string = `<em>${string}</em>`;
    }
    if (node.underline) {
      string = `<u>${string}</u>`;
    }
    return string;
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "h3":
      return jsxToHtml(<Typography variant="h3">{children}</Typography>);
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "link":
      return `<a href="${node.url}">${children}</a>`;
    default:
      return children;
  }
};

export default serialize;
