import React, { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  files: any;
  handleFileChange: Dispatch<SetStateAction<any>>;
}

export default function DatasetForm(props: Props) {
  const { name, setName, files, handleFileChange } = props;
  return (
    <Grid sx={{ width: "100%" }}>
      <TextField
        required
        id="name"
        label="Collection name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          border: 1,
          borderRadius: 3,
          borderColor: "#556cd6",
          borderStyle: "dashed",
          p: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          component="label"
          sx={{ textTransform: "none" }}
        >
          Upload files
          <input type="file" multiple hidden onChange={handleFileChange} />
        </Button>

        {files.length > 0 ? (
          <Card
            elevation={0}
            sx={{
              ml: 2,
              border: 1,
              borderRadius: 2,
              borderColor: "#cfd8dc",
              width: "70%",
            }}
          >
            <Grid container>
              <Grid
                item
                xs={2}
                lg={2}
                alignItems="center"
                sx={{ bgcolor: "#556cd6" }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, color: "#fff", m: 1, ml: 2 }}
                >
                  {files.length}
                </Typography>
              </Grid>
              <Grid item xs={2} lg={10}>
                <Typography
                  noWrap
                  variant="body2"
                  color="text.secondary"
                  sx={{ m: 1 }}
                >
                  {name} files
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </Box>
    </Grid>
  );
}
