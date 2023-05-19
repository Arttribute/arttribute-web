import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

export default function AttributeArt() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        fullWidth
        startIcon={<AutoAwesomeOutlinedIcon />}
        onClick={handleClickOpen}
        sx={{ textTransform: "none", mt: 2 }}
      >
        Use and Attribute Art
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Use and attribute art Collection</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount to pay"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="ETH 0.01+"
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            placeholder="Group or individual name"
            helperText="This is the name that will be displayed on your attribution certificate as proof of attribution."
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ textTransform: "none", mt: 2 }}
          >
            Confirm
          </Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
