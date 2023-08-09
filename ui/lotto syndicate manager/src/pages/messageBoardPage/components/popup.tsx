import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGamesBySyndicateId } from "../../../services/games";
type GamePopupProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleGameSelect: (game: any) => void;
};

const GamePopup: React.FC<GamePopupProps> = ({
  isOpen,
  handleClose,
  handleGameSelect,
}) => {
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const { syndicateId } = useParams<{ syndicateId: string }>();
  const [data, setData] = useState<any[]>([]);
  const handleListItemClick = (game: any) => {
    setSelectedGame(game);
    handleClose();
    handleGameSelect(game); // Call this with the selected game
  };
  useEffect(() => {
    fetchGamesBySyndicateId(Number(syndicateId))
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

  return (
    <div>
      <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle>Select a Game</DialogTitle>
        <List>
          {data.map((item) => (
            <ListItem
              button
              onClick={() => handleListItemClick(item)}
              key={item.id}
            >
              <ListItemText
                primary={item.name}
                secondary={
                  "required Ticket Number " +
                  item.required_ticket_number.toString()
                }
              />
            </ListItem>
          ))}
        </List>
      </Dialog>
      {selectedGame && <p>Selected Game: {selectedGame.name}</p>}
    </div>
  );
};
export default GamePopup;
