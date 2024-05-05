import React, { useEffect, useState } from "react";
import { Stack, Divider, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import RowTable from "../components/RowTable";
import { Grid } from "@mui/material";
import ResponsiveAppBar from "./ResponsiveAppBar.js";
import loader from "../loader.gif";
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
  const [isLoading, setIsLoading] = useState(true);

  // Create a use effect on the selectedSubject to fetch the top authors and top papers based on the selected subject
  useEffect(() => {
    async function fetchTopContents() {
      setIsLoading(true);
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
      setIsLoading(false);
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
      field: "venue",
      headerName: "Venue",
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
            {/* <MenuItem value="Computer Science">Select Category</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem> */}
            <MenuItem value="Sociology">Sociology</MenuItem>
            <MenuItem value="Psychology">Psychology</MenuItem>
            <MenuItem value="Political Science">Political Science</MenuItem>
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Philosophy">Philosophy</MenuItem>
            <MenuItem value="Medicine">Medicine</MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Materials Science">Materials Science</MenuItem>
            <MenuItem value="Linguistics">Linguistics</MenuItem>
            <MenuItem value="Law">Law</MenuItem>
            <MenuItem value="History">History</MenuItem>
            <MenuItem value="Geology">Geology</MenuItem>
            <MenuItem value="Geography">Geography</MenuItem>
            <MenuItem value="Environmental Science">
              Environmental Science
            </MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Economics">Economics</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
            <MenuItem value="Art">Art</MenuItem>
            <MenuItem value="Agricultural and Food Sciences">
              Agricultural and Food Sciences
            </MenuItem>
          </Select>
        </Grid>
        {isLoading ? (
          <img src={loader} alt="Loading..." />
        ) : (
          <>
            <h2
              style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}
            >
              Top Authors
            </h2>
            <RowTable columnNames={topAuthorColumns} data={topAuthor} />
            <Divider />
            <h2
              style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}
            >
              Top Papers
            </h2>
            <RowTable columnNames={topPaperColumns} data={topPaper} />
            <Divider />
            <h2
              style={{ width: "100%", textAlign: "left", marginLeft: "20px" }}
            >
              Papers by Rising Stars in recent years
            </h2>

            <RowTable columnNames={risingStarColumns} data={risingStartPaper} />
          </>
        )}
      </Stack>
    </>
  );
}

export default Homepage;
