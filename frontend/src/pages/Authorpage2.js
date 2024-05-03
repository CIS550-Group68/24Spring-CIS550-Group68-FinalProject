import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Divider, Grid, Link, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar";
import RowTable from "../components/RowTable";
import { Card, CardContent, CardActions } from "@mui/material";
import authorImage from "/Users/xiaoyingzhang/Desktop/24Spring-CIS550-Group68-FinalProject/frontend/src/authorImage.png";
import CardMedia from "@mui/material/CardMedia";

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
      setAuthor(fetchedAuthor);
      const fetchedPublications = await getAuthorPapers(authorId);
      setPublications(fetchedPublications);
      const fetchedCoAuthors = await getAuthorCollaborators(authorId);
      setCoAuthors(fetchedCoAuthors);
    }
    fetchData();
  }, [authorId]);

  const publicationsColumns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: (row) => (
        <Link to={`/paper/${row.paperId}`}>{row.title}</Link>
      ),
    },
    { field: "citation", headerName: "Citation Count" },
    { field: "year", headerName: "Year" },
    { field: "field", headerName: "Field" },
  ];

  const coAuthorsColumns = [
    {
      field: "authorName",
      headerName: "Author Name",
      renderCell: (row) => (
        <Link to={`/author/${row.authorId}`}>{row.authorName}</Link>
      ),
    },
    { field: "citation", headerName: "Citation Count" },
    { field: "hIndex", headerName: "H-Index" },
    { field: "paperCount", headerName: "Paper Count" },
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
          <Card sx={{ maxWidth: 300, ml: 4, mb: 2, marginLeft: 50 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: 150, width: "auto", margin: "auto" }}
                image={authorImage}
                alt="Descriptive Alt Text"
              />
              <Typography variant="h4">{author.authorName}</Typography>
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
          <Typography variant="h5">Publications</Typography>
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
