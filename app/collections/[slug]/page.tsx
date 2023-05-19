"use client";
import { useEffect } from "react";
import { Box, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import AppNavBar from "../../components/layout/AppNavBar";
import { DrawerHeader } from "../../components/layout/DrawerHeader";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TollIcon from "@mui/icons-material/Toll";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";

import AttributeArt from "@/app/components/artcollection/AttributeArt";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
export default function CollectionDetails() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid container spacing={2} sx={{ m: 1 }}>
          <Grid item xs={12} md={3}>
            <Box
              sx={{ height: 300, backgroundColor: "#c5cae9", borderRadius: 6 }}
            />
            <Box
              sx={{
                width: "100%",
                mt: 2,
                p: 2,
                border: 1,
                borderRadius: 4,
                borderColor: "#c5cae9",
              }}
            >
              <Grid container>
                <Grid item xs={8} lg={8}>
                  <Box sx={{ display: "flex", m: 1 }}>
                    <TollIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">Collection Price:</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 700, m: 1 }}>
                    0.01 +
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={8} lg={8}>
                  <Box sx={{ display: "flex", m: 1 }}>
                    <ModelTrainingIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">Models trained:</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 700, m: 1 }}>
                    100
                  </Typography>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={8} lg={8}>
                  <Box sx={{ display: "flex", m: 1 }}>
                    <AutoAwesomeMotionOutlinedIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">total images:</Typography>
                  </Box>
                </Grid>
                <Grid item xs={4} lg={4}>
                  <Typography variant="body1" sx={{ fontWeight: 700, m: 1 }}>
                    100
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, m: 1 }}>
                <AttributeArt />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ m: 1 }}>
              <Typography variant="h4" sx={{ m: 1, fontWeight: 700 }}>
                Collection Name
              </Typography>
              <Typography variant="body1" sx={{ m: 1 }}>
                Collection Description. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
                nunc nisl aliquet nunc, eget aliquam nisl nunc eget nisl.
              </Typography>
            </Box>

            <ImageList
              sx={{ width: "90%", height: 500, m: 3, borderRadius: 3 }}
              cols={4}
              rowHeight={164}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
