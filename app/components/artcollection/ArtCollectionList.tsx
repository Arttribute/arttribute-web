import { Grid } from "@mui/material";
import ArtCollectionCard from "./ArtCollectionCard";

interface Props {
  artworks: any[];
}

export default function ArtCollectionList(props: Props) {
  const { artworks } = props;
  return (
    <Grid container spacing={1}>
      {artworks.map((artwork, i) => (
        <ArtCollectionCard data={artwork} key={i} />
      ))}
    </Grid>
  );
}
