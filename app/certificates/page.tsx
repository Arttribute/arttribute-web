"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import CertificateList from "../components/certificates/CertificateList";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { ArttributeAddress } from "../../config.js";
import ArtAttribution from "../../artifacts/contracts/ArtAttribution.sol/ArtAttribution.json";

export default function OwnedCollections() {
  const [certificates, setCertificates] = useState<any>([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
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
    const data = await contract.getOwnedCertificates(address);

    /*  map over items returned from smart contract and format them */
    const ownedCertificates: any[] = await Promise.all(
      data.map(async (i: any) => {
        const meta = await axios.get(i.certificateUri);
        console.log("metadata", meta);
        let ownedCertificate = {
          id: i.collectionId.toNumber(),
          ownerAddress: i.owner,
          name: meta.data.name,
          metadata: i.certificateUri,
          collectionId: i.certificateId,
          collectionName: meta.data.collectionName,
          featuredImage: meta.data.featuredImage,
          contribution: meta.data.contribution,
        };
        return ownedCertificate;
      })
    );
    setCertificates(ownedCertificates);
    ownedCertificates.sort((a, b) => b.id - a.id);
    setLoading(false);
    setLoadingState("loaded");
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Box sx={{ m: 2 }}>
          <Typography variant="h4" sx={{ m: 1, fontWeight: 700 }}>
            Attribution Certificates
          </Typography>
          <Box sx={{ display: "flex" }}>
            <InfoOutlinedIcon sx={{ m: 1, mr: -0.5, mt: 0.5, fontSize: 20 }} />
            <Typography variant="body2" sx={{ m: 1 }}>
              These certificates are proof of that you have attributed the
              authors of the art you have used to train models on.
            </Typography>
          </Box>
        </Box>

        {loading ? <LinearProgress sx={{ ml: 2, mr: 2 }} /> : null}
        <CertificateList certificates={certificates} />
        {loadingState === "loaded" && !certificates.length ? (
          <Box sx={{ m: 3 }}>
            <Typography variant="h6">No certificates yet</Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
