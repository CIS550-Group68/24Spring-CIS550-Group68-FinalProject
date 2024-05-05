import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import RowTable from "../components/RowTable";
import {
  getPaperbyId,
  getPaperAuthors,
  getRelatedPaperByPaperId,
} from "../api/API";
import { Card, CardContent } from "@mui/material";
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
      setPaper(fetchedPaper.data[0]);
      const fetchedAuthor = await getPaperAuthors(paperId);
      setAuthors(fetchedAuthor.data);
      const fetchedRelatedPapers = await getRelatedPaperByPaperId(paperId);
      setRelatedPapers(fetchedRelatedPapers.data);
    }
    fetchData();
  }, [paperId]);

  const relatedPaperColumns = [
    {
      field: "title",
      headerName: "Title",
      renderCell: (row) => (
        <Link to={`/paper/${row.paper_id}`}>{row.title}</Link>
      ),
    },
    {
      field: "citation_count",
      headerName: "Citation Count",
    },
    {
      field: "year",
      headerName: "Year",
    },
    {
      field: "venue",
      headerName: "Venue",
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
          <Card
            sx={{ width: "40%", maxWidth: 500, ml: 4, mb: 2, marginLeft: 50 }}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <CardMedia
                component="img"
                sx={{
                  height: 150,
                  width: "auto",
                  marginBottom: 2,
                  marginLeft: 0,
                  marginRight: 10,
                }}
                image={paperImage}
                alt="Descriptive Alt Text"
              />
              {/* <Typography variant="h5" gutterBottom>
                title:{paper.title}
              </Typography> */}
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Citation Count: {paper.citation_count}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Refenence Count: {paper.reference_count}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Influential Citation Count: {paper.influential_citation_count}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Venue: {paper.venue}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Journal: {paper.journal}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1 }}>
                Publication Year: {paper.year}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Paper Title and Abstract on the Right */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ maxWidth: "50%", marginLeft: 10, marginRight: 10 }}
          >
            {paper.title}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ maxWidth: "50%", marginLeft: 10, fontSize: "1.2rem" }}
          >
            <span style={{ fontWeight: "bold" }}>Author:</span> 
            {authors.map((author) => {
                return (
                    <Link to={`/author/${author.author_id}`}>
                        <span>{author.name+'.  '}</span>
                    </Link>
                );
            })}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ maxWidth: "50%", marginLeft: 10, fontSize: "1.2rem" }}
          >
            <span style={{ fontWeight: "bold" }}>Abstract:</span>{" "}
            {paper.abstract? paper.abstract: "No abstract available"}
          </Typography>
        </Grid>
      </Grid>

      {/* IF there is an abstract, display it */}
      {/* <Stack direction="column" spacing={2}>
                <h2>Abstract</h2>
                <div>{paper.abstract}</div>
            </Stack> 
            <Divider />*/}
      <h1 style={{ marginLeft: "20px" }}>Related Paper</h1>
      <RowTable columnNames={relatedPaperColumns} data={relatedPapers} />
    </>
  );
}

export default Paperpage;
