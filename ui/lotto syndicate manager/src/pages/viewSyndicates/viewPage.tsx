import Grid from "@mui/material/Grid";
import SearchInput from "./searchBar";
import MediaCard from "./card";

function ViewSyndicates(){

return(
    <><SearchInput /><Grid container spacing={2}>
        <Grid item xs={4}>
           <MediaCard />
        </Grid>
        <Grid item xs={4}>
        <MediaCard />
        </Grid>
        <Grid item xs={4}>
        <MediaCard />
        </Grid>
        <Grid item xs={4}>
        <MediaCard />
        </Grid>
    </Grid></>
)

}
export default ViewSyndicates;