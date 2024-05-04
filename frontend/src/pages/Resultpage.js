import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RowTable from "../components/RowTable";
import { getAuthorByName } from "../api/API";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { Box } from "@mui/system";
import loader from "../loader.gif";
import { Typography } from "@mui/material";
import { TablePagination } from "@mui/material";

function Resultpage() {
  // Create a result page, use the Row table I defined to show the result of a author search result
  // The author search result should be fetched from the backend

  const [authorResult, setAuthorResult] = useState([]);
  const [isLaoding, setIsLoading] = useState(true);

  let { authorSearchWord } = useParams();

  useEffect(() => {
    async function fetchAuthor() {
      const fetchedAuthor = await getAuthorByName(authorSearchWord);
      setAuthorResult(fetchedAuthor.data);
      setIsLoading(false);
    }
    fetchAuthor();
  }, [authorSearchWord]);

  const authorColumns = [
    {
      field: "name",
      headerName: "Author Name",
      renderCell: (row) => (
        <Link to={`/author/${row.author_id}`}>{row.name}</Link>
      ), // A Link component is used just for formatting purposes
    },
    {
      field: "citation_count",
      headerName: "Citation Count",
    },
    {
      field: "h_index",
      headerName: "H-Index",
    },
    {
      field: "paper_count",
      headerName: "Paper Count",
    },
    {
      field: "fields",
      headerName: "Fields",
    },
  ];

  if (isLaoding) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={loader} alt="Loading..." />
      </Box>
    );
  }

  return (
    <div>
      <Grid item xs={12}>
        <Grid
          item
          sx={{ minWidth: "60%" }}
          marginTop={3}
          marginBottom={3}
          marginLeft={50}
        >
          <SearchBar />
        </Grid>
      </Grid>

      <div>About ? results for {authorSearchWord}</div>
      {isLaoding ? (
        <Typography variant="body1" sx={{ fontSize: "20px" }}>
          About ? results for {authorSearchWord}
        </Typography> // Display loading message
      ) : (
        <>
          <RowTable columnNames={authorColumns} data={authorResult} />
        </>
      )}
    </div>
  );
}

export default Resultpage;
