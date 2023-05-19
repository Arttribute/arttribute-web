import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

interface Props {
  name: string;
  price: number;
  description: string;
  totalFiles: number;
}

export default function ConfirmCollectionDetails(props: Props) {
  const { name, price, description, totalFiles } = props;

  return (
    <Grid
      container
      sx={{
        width: "100%",
        p: 2,
        border: 1,
        borderColor: "#3949ab",
        borderRadius: 6,
      }}
    >
      <Grid item xs={5} lg={4}>
        <Typography variant="subtitle1" sx={{ m: 1, fontWeight: 700 }}>
          Collection name:
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 1, fontWeight: 700 }}>
          Collection price:
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 1, fontWeight: 700 }}>
          Description:
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 1, fontWeight: 700 }}>
          Total images:
        </Typography>
      </Grid>
      <Grid item xs={7} lg={8}>
        <Typography variant="subtitle1" sx={{ m: 1 }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 1 }}>
          {price} +
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 1 }}>
          {description}
        </Typography>
        <Typography variant="subtitle1" sx={{ m: 1 }}>
          {totalFiles}
        </Typography>
      </Grid>
    </Grid>
  );
}
