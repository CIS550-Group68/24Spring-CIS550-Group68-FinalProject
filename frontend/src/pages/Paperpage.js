import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Divider, Stack } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { searchFunction } from "../utils/UtilFunctions";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import RowTable from "../components/RowTable";
import { getPaperbyId, getPaperAuthors } from "../api/API";
import { Card, CardContent, CardActions } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import paperImage from "../paperImage.png";

function Paperpage() {
  let { paperId } = useParams();
  const [paper, setPaper] = useState({});
  const [authors, setAuthors] = useState([]);
  const [relatedPapers, setRelatedPapers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedPaper = await getPaperbyId(paperId);
      setPaper(fetchedPaper);
      const fetchedAuthor = await getPaperAuthors(paperId);
      setAuthors(fetchedAuthor);
      const fetchedRelatedPapers = await getPaperbyId(paperId);
      setRelatedPapers(fetchedRelatedPapers);
    }
    fetchData();
  }, [paperId]);

  const relatedPaperColumns = [
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
      {/* search bar */}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 300, ml: 4, mb: 2, marginLeft: 50 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: 150, width: "auto", margin: "auto" }}
                image={paperImage}
                alt="Descriptive Alt Text"
              />
              <Typography variant="h5" gutterBottom>
                title:{paper.title}
              </Typography>
              <Typography variant="body1">
                Citation Count: {paper.citation_count}
              </Typography>
              <Typography variant="body1">
                Refenence Count: {paper.reference_count}
              </Typography>
              <Typography variant="body1">
                Influential Citation Count: {paper.influential_citation_count}
              </Typography>
              <Typography variant="body1">Venue: {paper.venue}</Typography>
              <Typography variant="body1">
                Influential Citation Count: Journal: {paper.journal}
              </Typography>
              <Typography variant="body1">
                Publication Date: {paper.pub_date}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              {authors.map((author) => (
                <Link to={`/author/${author.authorId}`}>
                  {author.authorName}
                </Link>
              ))}
            </CardActions>
          </Card>
        </Grid>
        {/* Paper Title and Abstract on the Right */}
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            title:{paper.title}
          </Typography>
          <Typography variant="subtitle1">abstract:{paper.abstract}</Typography>
        </Grid>
      </Grid>

      {/* IF there is an abstract, display it */}
      {/* <Stack direction="column" spacing={2}>
                <h2>Abstract</h2>
                <div>{paper.abstract}</div>
            </Stack> 
            <Divider />*/}
      <h1>Related Paper</h1>
      <RowTable columnNames={relatedPaperColumns} data={relatedPapers} />
    </>
  );
}

export default Paperpage;
