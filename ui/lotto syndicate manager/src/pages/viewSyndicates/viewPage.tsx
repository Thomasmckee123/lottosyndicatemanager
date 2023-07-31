import Grid from "@mui/material/Grid";
import SearchInput from "./searchBar";
import MediaCard from "./card";
import { sampleData } from "./card"; // please replace with your actual file path

function ViewSyndicates() {
  return (
    <>
      <SearchInput />
      <Grid container spacing={2}>
        {sampleData.map((item) => (
          <Grid item xs={4} key={item.id}>
            <MediaCard id={item.id} data={item.data} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ViewSyndicates;
