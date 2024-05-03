import React, { useEffect, useState } from "react";
import { Stack, Divider, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { searchFunction } from "../utils/UtilFunctions";
import RowTable from "../components/RowTable";
import { Grid } from "@mui/material";
import ResponsiveAppBar from "/Users/xiaoyingzhang/Desktop/24Spring-CIS550-Group68-FinalProject/frontend/src/pages/ResponsiveAppBar.js";

function Homepage() {
  const [topPaper, setTopPaper] = useState([]);
  const [topAuthor, setTopAuthor] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Computer Science");

  // Create a use effect on the selectedSubject to fetch the top authors and top papers based on the selected subject
  useEffect(() => {
    // TODO: fetch the top authors and top papers based on the selected subject
  });

  const topAuthorColumns = [
    {
      field: "authorName",
      headerName: "Author Name",
      renderCell: (row) => (
        <Link to={`/author/${row.authorId}`}>{row.authorName}</Link>
      ), // A Link component is used just for formatting purposes
    },
    {
      field: "citation",
      headerName: "Citation Count",
    },
    {
      field: "hIndex",
      headerName: "H-Index",
    },
    {
      field: "paperCount",
      headerName: "Paper Count",
    },
  ];

  const topPaperColumns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: (row) => (
        <Link to={`/paper/${row.paperId}`}>{row.title}</Link>
      ), // A Link component is used just for formatting purposes
    },
    {
      field: "citation",
      headerName: "Citation Count",
    },
    {
      field: "year",
      headerName: "Year",
    },
    {
      field: "field",
      headerName: "Field",
    },
  ];

  return (
    <>
      <ResponsiveAppBar />
      <Stack
        direction={"column"}
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={10}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="flex-start"
          sx={{ width: "100%" }}
        >
          <Grid item sx={{ marginLeft: 30, marginRight: 5 }}>
            <img
              src="logo2.jpg"
              alt=""
              style={{ height: "150px", width: "auto" }}
            />
          </Grid>
          <Grid item sx={{ marginRight: 2 }}>
            <Select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <MenuItem value="Computer Science">Select Category</MenuItem>
              <MenuItem value="Physics">Physics</MenuItem>
              <MenuItem value="Mathematics">Mathematics</MenuItem>
              <MenuItem value="Biology">Biology</MenuItem>
              <MenuItem value="Chemistry">Chemistry</MenuItem>
            </Select>
          </Grid>
          <Grid item sx={{ minWidth: "50%" }}>
            <SearchBar />
          </Grid>
        </Grid>
        <h2 style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}>
          Top Authors
        </h2>
        <RowTable columnNames={topAuthorColumns} data={topAuthor} />
        <Divider />
        <h2 style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}>
          Top Papers
        </h2>
        <RowTable columnNames={topPaperColumns} data={topPaper} />
      </Stack>
    </>
  );
}

export default Homepage;
