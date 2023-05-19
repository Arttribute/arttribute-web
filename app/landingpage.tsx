"use client";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Grid>
      <Box
        sx={{
          backgroundColor: "#1a237e",
          backgroundImage:
            "linear-gradient(30deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(150deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(30deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(150deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(60deg, #f7458177 25%, transparent 25.5%, transparent 75%, #f7458177 75%, #f7458177), linear-gradient(60deg, #f7458177 25%, transparent 25.5%, transparent 75%, #f7458177 75%, #f7458177)",
          backgroundSize: "80px 140px",
          backgroundPosition: "0 0, 0 0, 40px 72px, 40px 72px, 0 0, 40px 72px;",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Grid sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="secondary"
            sx={{ m: 2, textTransform: "none", borderRadius: 2, fontSize: 18 }}
          >
            Connect Wallet
          </Button>
        </Box>

        <Grid
          container
          height="32vh"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Typography variant="h1" sx={{ color: "#fff", fontWeight: 700 }}>
            Artribute.io
          </Typography>
        </Grid>
      </Box>

      <Grid
        container
        height="60vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid maxWidth="sm">
          <Typography variant="h4" sx={{ m: 2, fontWeight: 600 }}>
            Empowering Artists through the Decentralized Web
          </Typography>
          <Typography variant="body1" sx={{ m: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Typography>

          <Button
            variant="outlined"
            sx={{ m: 2, textTransform: "none", borderRadius: 2, fontSize: 18 }}
          >
            Get started
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
