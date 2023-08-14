import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SearchInput from "./components/searchBar";
import MediaCard from "./components/card";
import fetchAllSyndicateData from "./components/fetchallSyndicateData";
const ViewSyndicates = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchAllSyndicateData()
      .then((response) => {
        setData(response[0]);
        if (Array.isArray(response)) {
          setData(response);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);

  return (
    <>
      <SearchInput />
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
