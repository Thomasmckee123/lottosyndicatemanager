/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Typography, Paper, Container, Chip } from "@mui/material";
import { getTicketsByGameId } from "../../../services/tickets";
import { fetchGamesById } from "../../../services/games";

const SelectedNumbers: any = ({ gameId }: any) => {
  const [data, setData] = useState<any>([]);
  const [gameData, setGameData] = useState<any>([]);
  const getTicketData = async () => {
    try {
      const response = await getTicketsByGameId(Number(gameId));
      console.log("API Response:", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getTicketData();
  }, [gameId]);

  useEffect(() => {
    console.log("gameId", gameId);

    fetchGamesById(Number(gameId)).then((response) => {
      console.log("API Response:", response);
      setGameData(response);
    });
  }, [gameId]);

  const displayNumbers = () => {
    if (gameData?.gameTypes?.id === 1) {
      return numberDisplay1();
    } else if (gameData?.gameTypes?.id === 2) {
      return numberDisplay1();
    } else if (gameData?.gameTypes?.id === 3) {
      return numberDisplay1();
    } else if (gameData?.gameTypes?.id === 4) {
      return numberDisplay2();
    } else if (gameData?.gameTypes?.id === 5) {
      return numberDisplay2();
    } else if (gameData?.gameTypes?.id === 6) {
      return numberDisplay1();
    }
  };

  const numberDisplay1 = () => {
    return (
      <div>
        {data.map((item: any, ticketIndex: number) => (
          <Paper
            key={item?.id}
            style={{
              padding: "20px",
              marginBottom: "20px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {`Ticket ${ticketIndex + 1}`}
            </Typography>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {item?.ticketCode.split("-").map((num: string, index: number) => (
                <Chip
                  key={`${item?.id}-${index}`}
                  label={num}
                  color="primary"
                  style={{ margin: "5px" }}
                />
              ))}
            </div>
          </Paper>
        ))}
      </div>
    );
  };

  const numberDisplay2 = () => {
    return (
      <div>
        {data.map((item: any, ticketIndex: number) => {
          const numbers = item?.ticketCode.split("-");

          // Determine ball count and numbers per ball based on game type
          let ballCount, numbersPerBall;
          switch (gameData?.gameTypes?.id) {
            case 4: // Assuming game type ID 4 has 5 balls and 3 numbers each
              ballCount = 5;
              numbersPerBall = 3;
              break;
            case 5: // Assuming game type ID 5 has 6 balls and 1 number each
              ballCount = 6;
              numbersPerBall = 5;
              break;
            default:
              ballCount = 5; // Default to 5 balls
              numbersPerBall = 3; // Default to 3 numbers per ball
          }

          return (
            <Paper
              key={item?.id}
              elevation={5}
              style={{
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: "#f5f5f5",
                borderRadius: "12px",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  borderBottom: "2px solid #3f51b5",
                  paddingBottom: "10px",
                }}
              >
                {`Ticket ${ticketIndex + 1}`}
              </Typography>
              {Array.from({ length: ballCount }).map((_, ballIndex) => (
                <div
                  key={ballIndex}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <Chip
                    label={`Ball ${ballIndex + 1}`}
                    style={{
                      backgroundColor: "#3f51b5",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                  <div
                    style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
                  >
                    {Array.from({ length: numbersPerBall }).map(
                      (_, numIndex) => (
                        <Chip
                          key={numIndex}
                          label={numbers[ballIndex * numbersPerBall + numIndex]}
                          color="primary"
                          style={{ margin: "5px", fontWeight: "bold" }}
                        />
                      )
                    )}
                  </div>
                </div>
              ))}
            </Paper>
          );
        })}
      </div>
    );
  };

  return <Container maxWidth="sm">{displayNumbers()}</Container>;
};

export default SelectedNumbers;
