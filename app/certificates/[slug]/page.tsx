"use client";
import { useEffect } from "react";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import AppNavBar from "../../components/layout/AppNavBar";
import { DrawerHeader } from "../../components/layout/DrawerHeader";

import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import TollIcon from "@mui/icons-material/Toll";

export default function CertificateDetails() {
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
                  >
                    <SummarizeOutlinedIcon />
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
                  Attribution Certificate for Collection Name
                </Typography>
                <Typography variant="body1" sx={{ m: 1 }}>
                  Certificate ID: 0x1234567890
                </Typography>
                <Box sx={{ m: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Certificate Owner
                  </Typography>
                  <Typography variant="body1">
                    Name: Certificate Owner
                  </Typography>
                  <Typography variant="body1">Address: 0x1234567890</Typography>
                </Box>
                <Box sx={{ m: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    Contribution
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <TollIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">0.1 ETH</Typography>
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
