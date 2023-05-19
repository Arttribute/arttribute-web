"use client";
import { useEffect } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import AppNavBar from "../../components/layout/AppNavBar";
import { DrawerHeader } from "../../components/layout/DrawerHeader";
import ArtCollectionList from "../../components/artcollection/ArtCollectionList";
import StatBox from "@/app/components/stats/StatBox";

import TollIcon from "@mui/icons-material/Toll";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

export default function OwnedCollections() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Typography variant="h4" sx={{ m: 3, fontWeight: 700 }}>
          My collections
        </Typography>

        <Grid container>
          <StatBox
            text="Total collections"
            icon={<FilterNoneOutlinedIcon />}
            value={5}
            bgcolor="#e3f2fd"
          />
          <StatBox
            text="Total earnings"
            icon={<TollIcon />}
            value={100}
            bgcolor="#e0f2f1"
          />
          <StatBox
            text="Models trained on"
            icon={<ModelTrainingIcon />}
            value={10}
            bgcolor="#ede7f6"
          />
        </Grid>
        <Divider sx={{ m: 3 }} />
        <ArtCollectionList artworks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} />
      </Box>
    </Box>
  );
}
