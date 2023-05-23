"use client";
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Box, Grid, Typography, LinearProgress } from "@mui/material";
import AppNavBar from "./components/layout/AppNavBar";
import { DrawerHeader } from "./components/layout/DrawerHeader";
import ArtCollectionList from "./components/artcollection/ArtCollectionList";

import { ArttributeAddress } from "../config.js";
import ArtAttribution from "../ArtAttribution.json";

export default function Dashboard() {
  const [collections, setCollections] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    setLoading(true);
    /* create a generic provider and query new items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.hyperspace.node.glif.io/rpc/v1"
    );

    const contract = new ethers.Contract(
      ArttributeAddress,
      ArtAttribution.abi,
      provider
    );
    const data = await contract.fetchAllCollections();

    /*  map over items returned from smart contract and format then */

    const artcollections: any[] = await Promise.all(
      data.map(async (i: any) => {
        const meta = await axios.get(i.collectionUri);
        console.log("metadata", meta);
        let artcollection = {
          id: i.collectionId.toNumber(),
          name: meta.data.name,
          creator: i.creator,
          metadata: i.collectionUri,
          price: meta.data.price,
          collectionFilesUri: meta.data.files,
          description: meta.data.description,
          featuredImage: meta.data.featuredImage,
          totalAttributions: i.totalAttributions.toNumber(),
        };
        return artcollection;
      })
    );
    setCollections(artcollections);
    artcollections.sort((a, b) => b.id - a.id);
    setLoading(false);
    setLoadingState("loaded");
  }
  console.log("collections", collections);
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
              Arttribute
            </Typography>
          </Grid>
        </Box>
        {loading ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
        <ArtCollectionList collections={collections} />
        {loadingState === "loaded" && !collections.length ? (
          <Box sx={{ m: 3 }}>
            <Typography variant="h6">No collections yet</Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
