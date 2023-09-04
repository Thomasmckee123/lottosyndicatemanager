import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SearchInput from "./components/searchBar";
import MediaCard from "./components/card";
import fetchAllSyndicateData, {
  fetchSyndicateByName,
} from "../../services/syndicates";
import { SearchPaper, StyledPaper } from "./styles/styled";
import SearchBar from "./components/searchBar";
import { Paper } from "@mui/material";

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
      <StyledPaper sx={{ width: "100%" }}>
        <SearchPaper sx={{ backgroundColor: "grey" }}>
          <SearchInput onSearchChange={setName} />
        </SearchPaper>
        <Paper
          sx={{
            marginTop: "2vh",
            backgroundColor: "darkGrey",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "spaceBetween",
            alignItems: "center",
            borderRadius: "2px",
            boxShadow: "0px 0px 20px black",
            padding: "20px",
            height: "60vh",
            overflow: "auto",
          }}
        >
          {data.map((item) => (
            <MediaCard data={item} />
          ))}
        </Paper>
      </StyledPaper>{" "}
    </>
  );
};

export default ViewSyndicates;
