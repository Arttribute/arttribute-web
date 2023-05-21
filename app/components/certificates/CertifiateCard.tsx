import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";

import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BeenhereIcon from "@mui/icons-material/Beenhere";

interface Props {
  data: {
    id: number;
    ownerAddress: string;
    name: string;
    metadata: string;
    collectionId: number;
    collectionName: string;
    featuredImage: string;
    contribution: number;
  };
}

export default function CertificateCard(props: Props) {
  const router = useRouter();

  const { data } = props;

  console.log(data);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/certificates/${"id"}`);
  };
  return (
    <Grid item xs={12} lg={12}>
      <Card
        elevation={0}
        sx={{
          m: 1,
          border: 1,
          borderRadius: 6,
          borderColor: "#3949ab",
        }}
      >
        <CardActionArea onClick={handleClick}>
          <CardContent sx={{ m: 0.5 }}>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "block" }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 70,
                    height: 70,
                    backgroundColor: "#c5cae9",
                    borderRadius: 4,
                  }}
                  alt={data.collectionName}
                  src={data.featuredImage ? data.featuredImage : ""}
                >
                  {!data.featuredImage ? <SummarizeOutlinedIcon /> : null}
                </Avatar>
                <BeenhereIcon
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    mt: -2,
                    mr: -2,
                    color: "#fff176",
                  }}
                />
              </Box>

              <Box sx={{ display: "block", m: 1 }}>
                <Typography variant="body1" component="div" gutterBottom noWrap>
                  {data.collectionName}
                </Typography>
                <Box sx={{ display: "flex" }}>
                  <Avatar sx={{ width: 24, height: 24 }} />

                  <Typography
                    variant="caption"
                    component="div"
                    noWrap
                    sx={{ m: 0.5 }}
                  >
                    Artist Name
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
