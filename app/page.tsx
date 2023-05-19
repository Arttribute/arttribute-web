"use client";
import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AppNavBar from "./components/layout/AppNavBar";
import { DrawerHeader } from "./components/layout/DrawerHeader";
import ArtCollectionList from "./components/artcollection/ArtCollectionList";

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box
          sx={{
            m: 1,
            borderRadius: 6,
            backgroundColor: "#1a237e",
            backgroundImage:
              "linear-gradient(30deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(150deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(30deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(150deg, #f74581 12%, transparent 12.5%, transparent 87%, #f74581 87.5%, #f74581), linear-gradient(60deg, #f7458177 25%, transparent 25.5%, transparent 75%, #f7458177 75%, #f7458177), linear-gradient(60deg, #f7458177 25%, transparent 25.5%, transparent 75%, #f7458177 75%, #f7458177)",
            backgroundSize: "80px 140px",
            backgroundPosition:
              "0 0, 0 0, 40px 72px, 40px 72px, 0 0, 40px 72px;",
          }}
        >
          <Grid
            container
            height="32vh"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Typography variant="h1" sx={{ color: "#fff", fontWeight: 700 }}>
              Arttribute.io
            </Typography>
          </Grid>
        </Box>
        <ArtCollectionList artworks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
      </Box>
    </Box>
  );
}
