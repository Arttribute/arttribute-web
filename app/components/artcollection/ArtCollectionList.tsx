import { Grid } from "@mui/material";
import ArtCollectionCard from "./ArtCollectionCard";

interface Props {
  collections: any[];
}

export default function ArtCollectionList(props: Props) {
  const { collections } = props;
  return (
    <Grid container spacing={1}>
      {collections && collections.map((collection, i) => (
        <ArtCollectionCard data={collection} key={i} />
      ))}
    </Grid>
  );
}
