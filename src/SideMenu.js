import { useState, useEffect } from "react";
import { Popper, Paper, IconButton, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

import { ReactEditor, useSlate } from "slate-react";
import { Editor } from "slate";

import StyledToggleButtonGroup from "./StyledTBG";
import MarkButton from "./MarkButton";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  add: {
    display: "flex",
    alignItems: "center"
    // borderRadius: "50%"
    // background: "none"
  }
});

function SideMenu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [formats, setFormats] = useState(() => []);

  const id = open ? "sidemenu" : undefined;

  const editor = useSlate();
  const { selection } = editor;
  const nodeIndex = selection ? selection.anchor.path[0] : -1;

  // console.log(selection);

  useEffect(() => {
    const domSelection = window.getSelection();
    // console.log(domSelection.isCollapsed);

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Editor.node(editor, selection)[0].text !== "" ||
      nodeIndex < 0
    ) {
      setOpen(false);
      return;
    }

    const getBoundingClientRect = () => {
      if (domSelection.getRangeAt(0).startContainer.data === undefined) {
        return domSelection
          .getRangeAt(0)
          .startContainer.getBoundingClientRect();
      }
      return domSelection.getRangeAt(0).getBoundingClientRect();
    };

    // console.log(getBoundingClientRect());

    setOpen(true);
    setAnchorEl({
      clientWidth: getBoundingClientRect().width,
      clientHeight: getBoundingClientRect().height,
      getBoundingClientRect
    });
  }, [editor, selection, nodeIndex]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("click");
  };

  const handleFormats = (_, newFormat) => {
    setFormats(newFormat);
    setOpen(false);
  };

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="left"
      modifiers={{
        offset: {
          enabled: true,
          offset: "0,10"
        }
        /*
        flip: {
          enabled: false
        }
        */
      }}
    >
      <Paper className={classes.add} elevation={4}>
        <IconButton onClick={handleClick} size="small">
          <AddIcon style={{ color: grey[500] }} />
        </IconButton>
        <StyledToggleButtonGroup
          value={formats}
          size="small"
          aria-label="text format"
          onChange={handleFormats}
        >
          <MarkButton format="bold" label="bold">
            <FormatBoldIcon />
          </MarkButton>
        </StyledToggleButtonGroup>
      </Paper>
    </Popper>
  );
}

export default SideMenu;
