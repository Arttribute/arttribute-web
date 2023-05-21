"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Divider, Grid, LinearProgress, Typography } from "@mui/material";
import AppNavBar from "../../components/layout/AppNavBar";
import { DrawerHeader } from "../../components/layout/DrawerHeader";
import ArtCollectionList from "../../components/artcollection/ArtCollectionList";
import StatBox from "@/app/components/stats/StatBox";

import TollIcon from "@mui/icons-material/Toll";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

import { ArttributeAddress } from "../../../config.js";
import ArtAttribution from "../../../artifacts/contracts/ArtAttribution.sol/ArtAttribution.json";

export default function OwnedCollections() {
  const [collections, setCollections] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCollections();
  }, []);

  async function loadCollections() {
    setLoading(true);
    /* create a generic provider and query new items */
    const provider = new ethers.providers.JsonRpcProvider();
    //"https://api.hyperspace.node.glif.io/rpc/v1"
    const contract = new ethers.Contract(
      ArttributeAddress,
      ArtAttribution.abi,
      provider
    );

    const signer = provider.getSigner();
    const address = await (await signer.getAddress()).toString();
    const data = await contract.getOwnedCollections(address);

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
          price: i.price.toNumber(),
          collectionFilesUri: meta.data.files,
          description: meta.data.description,
          featuredImage: meta.data.featuredImage,
          totalAttributions: i.totalAttributions.toNumber(),
          totalRewards: i.totalRewards.toNumber(),
        };
        return artcollection;
      })
    );
    setCollections(artcollections);
    artcollections.sort((a, b) => b.id - a.id);
    setLoading(false);
    setLoadingState("loaded");
  }
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
