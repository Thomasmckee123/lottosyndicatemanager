import * as React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchInputProps = {
  onSearchChange: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = () => {
    onSearchChange(searchTerm);
  };

  return (
    <TextField
      sx={{ width: "50%", backgroundColor: "white" }}
      label="Search"
      value={searchTerm}
      onChange={handleSearchChange}
      variant="outlined"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={performSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchInput;
