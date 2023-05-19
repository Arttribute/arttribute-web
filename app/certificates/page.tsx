"use client";
import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import AppNavBar from "../components/layout/AppNavBar";
import { DrawerHeader } from "../components/layout/DrawerHeader";
import CertificateList from "../components/certificates/CertificateList";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function OwnedCollections() {
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

        <CertificateList
          certificates={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        />
      </Box>
    </Box>
  );
}
