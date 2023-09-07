import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import SearchInput from "./components/searchBar";
import MediaCard from "./components/card";
import fetchAllSyndicateData, {
  fetchSyndicateByName,
} from "../../services/syndicates";
import { SearchPaper, StyledPaper } from "./styles/styled";
import SearchBar from "./components/searchBar";
import { Paper, Typography } from "@mui/material";
import TokenUtils from "../../integrations/token";
import fetchUserDetails from "../../services/users";
import SyndicateContainer from "../HomePage/components/SyndicateContainer";

const ViewSyndicates = () => {
  const [data, setData] = useState<any[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>();
  const [role, setRole] = useState<number>();
  const jwt = TokenUtils.getJWT();
  console.log(jwt.claims, "JWT");
  const claimsUserId = jwt.claims.userId;
  useEffect(() => {
    fetchUserDetails(claimsUserId).then((response) => {
      setUserData(response);
      setRole(response?.data?.userTypes?.id);
    });
  }, []);
  console.log(userData);
  console.log("USER DATA", userData);

  console.log("role", role);

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
  console.log("ROLEEEEEEE", role);
  return (
    <>
      {role !== 2 ? (
        <StyledPaper sx={{ width: "100%" }}>
          <SearchPaper>
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
        </StyledPaper>
      ) : (
        <>
          <SyndicateContainer role={role} />
        </>
      )}
    </>
  );
};
export default ViewSyndicates;
