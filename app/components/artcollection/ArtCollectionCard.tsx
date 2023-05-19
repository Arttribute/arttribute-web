import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
} from "@mui/material";

import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

interface Props {
  data: Object;
}

export default function ArtCollectionCard(props: Props) {
  const router = useRouter();

  const { data } = props;
  console.log(data);
  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/collections/${"slug"}`);
  };
  return (
    <Grid item xs={12} lg={3}>
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
          <Box sx={{ height: 200, backgroundColor: "#c5cae9" }} />
        </CardActionArea>
        <CardContent sx={{ m: 0.5 }}>
          <Typography variant="body1" component="div" gutterBottom noWrap>
            Artwork Name
          </Typography>
          <Grid container>
            <Grid item xs={7}>
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
            </Grid>
            <Grid item xs={5}>
              <Box sx={{ display: "flex" }}>
                <ModelTrainingIcon sx={{ ml: 4 }} />
                <Typography
                  variant="caption"
                  component="div"
                  noWrap
                  sx={{ m: 0.5 }}
                >
                  1000
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
