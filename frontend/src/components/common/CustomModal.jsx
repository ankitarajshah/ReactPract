import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const CustomModal = ({
  open,
  onClose,
  title,
  content,
  actions,
  showCloseIcon = true,
  maxWidth = "sm",
  fullWidth = true,
}) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      >
        {(title || showCloseIcon) && (
          <DialogTitle sx={{ m: 0, p: 2 }}>
            {typeof title === "string" ? (
              <Typography variant="h6">{title}</Typography>
            ) : (
              title
            )}
            {showCloseIcon && onClose && (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{ position: "absolute", right: 8, top: 0 }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </DialogTitle>
        )}
        {content && (
          <DialogContent>
            {typeof content === "string" ? (
              <Typography variant="h6">{content}</Typography>
            ) : (
              content
            )}
          </DialogContent>
        )}
        {actions && <DialogActions>{actions}</DialogActions>}
      </Dialog>
    </>
  );
};

export default CustomModal;
