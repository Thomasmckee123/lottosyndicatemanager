import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SearchInput from "./components/searchBar";
import MediaCard from "./components/card";
import fetchAllSyndicateData, {
  fetchSyndicateByName,
} from "../../services/syndicates";

const ViewSyndicates = () => {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    fetchAllSyndicateData()
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching all syndicate data:", error);
      });
  }, []);

  useEffect(() => {
    if (name) {
      fetchSyndicateByName(name)
        .then((response) => {
          setData(response);
        })
        .catch((error) => {
          console.error("Error fetching data by name:", error);
        });
    }
  }, [name]);

  return (
    <>
      <SearchInput onSearchChange={setName} />

      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={4} key={item.id}>
            <MediaCard data={item} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ViewSyndicates;
