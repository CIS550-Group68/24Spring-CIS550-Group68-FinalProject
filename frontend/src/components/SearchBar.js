import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [input, setInput] = useState("");

  let navigate = useNavigate();

  const searchFunction = () => {
    navigate(`/search/${input}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "0.8",
        margin: 10,
      }}
    >
      <Box width={0.8}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Enter a keyword to search for a researcher"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      {/* TODO: add the onclick logic here*/}
      <Button variant="contained" color="primary" onClick={searchFunction}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
