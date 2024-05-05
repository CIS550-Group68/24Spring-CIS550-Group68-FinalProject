import React, { useEffect, useState } from "react";
import { Stack, Divider, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RowTable from "../components/RowTable";
import { Grid } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import {
  getTopAuthorOfField,
  getTopPaperOfField,
  getRisingStarPapers,
} from "../api/API";

function Homepage() {
  const [topPaper, setTopPaper] = useState([]);
  const [topAuthor, setTopAuthor] = useState([]);
  const [risingStartPaper, setRisingStartPaper] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Computer Science");

  // Create a use effect on the selectedSubject to fetch the top authors and top papers based on the selected subject
  useEffect(() => {
    async function fetchTopContents() {
      // Start all promises simultaneously
      const [topAuthors, topPapers, risingStarPapers] = await Promise.all([
        getTopAuthorOfField(10, selectedSubject),
        getTopPaperOfField(10, selectedSubject),
        getRisingStarPapers(10, selectedSubject),
      ]);

      // Process each result as necessary
      setTopAuthor(topAuthors.data);

      const topPapersData = topPapers.data.map((paper) => ({
        ...paper,
        field: selectedSubject,
      }));
      setTopPaper(topPapersData);

      const risingStarPapersData = risingStarPapers.data.map((paper) => ({
        ...paper,
        emerging_author_names:
          paper.emerging_author_names.length > 30
            ? paper.emerging_author_names.slice(0, 15) + "..."
            : paper.emerging_author_names,
        field: selectedSubject,
      }));

      setRisingStartPaper(risingStarPapersData);
    }
    fetchTopContents();
  }, [selectedSubject]);

  const topAuthorColumns = [
    {
      field: "name",
      headerName: "Author Name",
      width: "25%",
      renderCell: (row) => (
        <Link to={`/author/${row.author_id}`}>{row.name}</Link>
      ), // A Link component is used just for formatting purposes
    },
    {
      field: "citation_count",
      headerName: "Citation Count",
      width: "25%",
    },
    {
      field: "h_index",
      headerName: "H-Index",
      width: "25%",
    },
    {
      field: "paper_count",
      headerName: "Paper Count",
      width: "25%",
    },
  ];

  const topPaperColumns = [
    {
      field: "title",
      headerName: "Title",
      width: "25%",
      renderCell: (row) => (
        <Link to={`/paper/${row.paper_id}`}>{row.title}</Link>
      ), // A Link component is used just for formatting purposes
    },
    {
      field: "citation_count",
      headerName: "Citation Count",
      width: "25%", // Add width to the columns, made sure each column header is aligned with the data
    },
    {
      field: "year",
      headerName: "Year",
      width: "25%",
    },
    {
      field: "field",
      headerName: "Field",
      width: "25%",
    },
  ];

  const risingStarColumns = [
    {
      field: "title",
      headerName: "Title",
      width: "25%",
      renderCell: (row) => (
        <Link to={`/paper/${row.paper_id}`}>{row.title}</Link>
      ), // A Link component is used just for formatting purposes
    },
    {
      field: "citation_count",
      headerName: "Citation Count",
      width: "25%", // Add width to the columns, made sure each column header is aligned with the data
    },
    {
      field: "emerging_author_names",
      headerName: "Authors",
      width: "25%",
    },
    {
      field: "pub_date",
      headerName: "Publication Date",
      width: "25%",
    },
  ];

  return (
    <>
      {/* <ResponsiveAppBar /> */}
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
          {/* <Grid item sx={{ marginRight: 2 }}>
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
          </Grid> */}
          <Grid item sx={{ minWidth: "70%" }}>
            <SearchBar />
          </Grid>
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

        <h2 style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}>
          Top Authors
        </h2>
        <RowTable columnNames={topAuthorColumns} data={topAuthor} />
        <Divider />
        <h2 style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}>
          Top Papers
        </h2>
        <RowTable columnNames={topPaperColumns} data={topPaper} />
        <Divider />
        <h2 style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}>
          Rising Stars in recent years
        </h2>
        <RowTable columnNames={risingStarColumns} data={risingStartPaper} />
      </Stack>
    </>
  );
}

export default Homepage;
