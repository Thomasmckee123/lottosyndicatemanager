import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import NameCard from "./members";
import Box from '@mui/material/Box';

function SyndicateMembers(){
return(
    <>
    <Typography variant="h2" gutterBottom>Members</Typography>
    <Box display="flex" justifyContent="center">
        <Grid container spacing={10} justifyContent="center">
            <Grid item xs={4}>
                <NameCard />
            </Grid>
            <Grid item xs={4}>
                <NameCard />
            </Grid>
            <Grid item xs={4}>
                <NameCard />
            </Grid>
            <Grid item xs={4}>
                <NameCard />
            </Grid>
            <Grid item xs={4}>
                <NameCard />
            </Grid>
            <Grid item xs={4}>
                <NameCard />
            </Grid>
            <Grid item xs={4}>
                <NameCard />
            </Grid>
        </Grid>
    </Box>
    <Box display="flex" justifyContent="center" mt={8}>
        <Grid container spacing={10} justifyContent="center">
            <Grid item xs={4}>
                <NameCard />
            </Grid>
        </Grid>
    </Box>
    </>
);
}
export default SyndicateMembers;
