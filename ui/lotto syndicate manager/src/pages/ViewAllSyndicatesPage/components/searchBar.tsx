import * as React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = () => {
    // Place your search function here
    console.log("Searching for: " + searchTerm);
  };

  return (
    <TextField
    sx={{width: '50%'}}
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
        )
      }}
    />
  );
};

export default SearchInput;
