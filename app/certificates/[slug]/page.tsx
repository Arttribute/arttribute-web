"use client";
import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import AppNavBar from "../../components/layout/AppNavBar";
import { DrawerHeader } from "../../components/layout/DrawerHeader";

import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TollIcon from "@mui/icons-material/Toll";

import { ArttributeAddress } from "../../../config.js";
import ArtAttribution from "../../../ArtAttribution.json";

export default function CertificateDetails({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  console.log("slug: ", slug);
  const id = parseInt(slug.toString().split("-arttcertificate-")[1]);
  console.log("id: ", id);

  const [certificate, setCertificate] = useState<any>({});
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCertificate();
  }, []);

  async function loadCertificate() {
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
    const data = await contract.getCertificateById(id);
    console.log(data);

    const meta = await axios.get(data.certificateUri);
    let certificateDetails = {
      id: data.certificateId.toNumber(),
      ownerAddress: data.owner,
      name: meta.data.ownerName,
      metadata: data.certificateUri,
      collectionId: data.collectionId.toNumber(),
      collectionName: meta.data.collectionName,
      featuredImage: meta.data.featuredImage,
      contribution: meta.data.contribution,
    };
    setCertificate(certificateDetails);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Box
          sx={{
            m: 3,
            p: 2,
            border: 1,
            borderRadius: 4,
            borderColor: "#c5cae9",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} lg={2}>
              <Box>
                <Box sx={{ display: "block", m: 1 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      width: 140,
                      height: 140,
                      backgroundColor: "#c5cae9",
                      borderRadius: 4,
                    }}
                    alt={certificate.collectionName}
                    src={
                      certificate.featuredImage ? certificate.featuredImage : ""
                    }
                  >
                    {!certificate.featuredImage ? (
                      <SummarizeOutlinedIcon />
                    ) : null}
                  </Avatar>
                  <BeenhereIcon
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      mt: -3,
                      mr: -3,
                      color: "#fff176",
                      fontSize: 40,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={10}>
              <Box sx={{ m: 2 }}>
                <Typography variant="h5" sx={{ m: 1, fontWeight: 700 }}>
                  Attribution Certificate for {certificate.collectionName}
                </Typography>
                <Typography variant="body1" sx={{ m: 1 }}>
                  Certificate ID: {certificate.id}
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Certificate Owner
                  </Typography>
                  <Typography variant="body1">
                    Name: {certificate.name}
                  </Typography>
                  <Typography variant="body1">
                    Address: {certificate.ownerAddress}
                  </Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Contribution
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <TollIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">
                      {certificate.contribution}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
