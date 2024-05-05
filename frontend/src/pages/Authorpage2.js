import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Divider, Grid, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import RowTable from "../components/RowTable";
import { Card, CardContent, CardActions } from "@mui/material";
import authorImage from "../authorImage.png";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

import {
  getAuthorById,
  getAuthorCollaborators,
  getAuthorPapers,
} from "../api/API";

function Authorpage2() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState({});
  const [publications, setPublications] = useState([]);
  const [coAuthors, setCoAuthors] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedAuthor = await getAuthorById(authorId);
      setAuthor(fetchedAuthor.data[0]);
      const fetchedPublications = await getAuthorPapers(authorId);
      setPublications(fetchedPublications.data);
      const fetchedCoAuthors = await getAuthorCollaborators(authorId);
      setCoAuthors(fetchedCoAuthors.data);
    }
    fetchData();
  }, [authorId]);

  const publicationsColumns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: (row) => (
        <Link to={`/paper/${row.paper_id}`}>{row.title}</Link>
      ),
      width: "25%",
    },
    { field: "citation_count", headerName: "Citation Count", width: "25%" },
    { field: "year", headerName: "Year", width: "25%" },
    { field: "venue", headerName: "Venue", width: "25%" },
  ];

  const coAuthorsColumns = [
    {
      field: "name",
      headerName: "Author Name",
      renderCell: (row) => (
        <Link to={`/authorById/${row.author_id}`}>{row.name}</Link>
      ),
    },
    { field: "citation_count", headerName: "Citation Count", width: "25%" },
    { field: "h_index", headerName: "H-Index", width: "25%" },
    { field: "paper_count", headerName: "Paper Count", width: "25%" },
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
      <Grid container spacing={2} className="authorInfo">
        {/* Search Bar across the top */}

        {/* Left Column: Author Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 300, ml: 4, mb: 2, marginLeft: 20 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: 150, width: "auto", margin: "auto" }}
                image={authorImage}
                alt="Descriptive Alt Text"
              />
              <Typography variant="h4">{author.name}</Typography>
              <Typography variant="body1">
                Citation Count: {author.citation_count}
              </Typography>
              <Typography variant="body1">
                Paper Count: {author.paper_count}
              </Typography>
              <Typography variant="body1">H-Index: {author.h_index}</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              {coAuthors.map((coAuthor, index) => (
                <Link
                  key={index}
                  to={`/author/${coAuthor.authorId}`}
                  style={{ margin: "0 8px" }}
                >
                  {coAuthor.authorName}
                </Link>
              ))}
            </CardActions>
          </Card>
        </Grid>

        {/* Right Column: Publications and Co-Authors */}
        <Grid item xs={12} md={8} paddingRight={10}>
          <Typography variant="h5">Selected Publications</Typography>
          <RowTable columnNames={publicationsColumns} data={publications} />
          <Divider />
          <Typography variant="h5">Co-Authors</Typography>
          <RowTable columnNames={coAuthorsColumns} data={coAuthors} />
        </Grid>
      </Grid>
    </>
  );
}

export default Authorpage2;
