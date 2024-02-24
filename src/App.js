import { useMemo, useState, useCallback } from "react";
import { Box, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import HoveringToolbar from "./HoveringToolbar";
import SideMenu from "./SideMenu";

// Unfinish
// Inspired by Editor.js (https://editorjs.io/)

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(7)
  },
  paper: {
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(0.5, 1)
  },
  editor: {
    fontSize: 16
  }
}));

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  return <span {...attributes}>{children}</span>;
};

export default function App() {
  const classes = useStyles();
  /* /
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        {
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In hac habitasse platea dictumst quisque sagittis purus sit amet. "
        },
        { text: "Sit amet", bold: true },
        {
          text:
            "  consectetur adipiscing elit ut. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Eget aliquet nibh praesent tristique. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero."
        }
      ]
    }
  ]);
  /* */
  /* */
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [
        {
          text: ""
        }
      ]
    }
  ]);
  /* */
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback((props) => {
    const { element, attributes, children } = props;
    switch (element.type) {
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  return (
    <Box className={classes.wrapper}>
      <Paper elevation={0} className={classes.paper}>
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <HoveringToolbar />
          <SideMenu />
          <Editable
            className={classes.editor}
            placeholder="Type something..."
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck={false}
            // autoFocus
          />
        </Slate>
      </Paper>
    </Box>
  );
}
