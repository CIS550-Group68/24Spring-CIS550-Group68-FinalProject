import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Divider, Stack } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { searchFunction } from "../utils/UtilFunctions";
import {Link} from 'react-router-dom';

import RowTable from "../components/RowTable";
import { getPaperbyId, getPaperAuthors } from "../api/API";

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
            field: 'title',
            headerName: 'Title',
            renderCell: (row) => <Link to={`/paper/${row.paperId}`}>{row.title}</Link> // A Link component is used just for formatting purposes
        },
        {
            field: 'citation',
            headerName: 'Citation Count'
        },
        {
            field: 'year',
            headerName: 'Year'
        },
        {
            field: 'field',
            headerName: 'Field'
        }
    ];


    return (
        <Stack spacing={2} direction="column" justifyContent="space-between">
            <h1>Paper Page</h1>
            <SearchBar searchFunction={searchFunction} />
            <Divider />
            <Stack direction="row" spacing={2}>
                {/* Paper title and author on the left hand side */}
                <Stack direction="column" spacing={2}>
                    <Stack direction="column" spacing={2} > 
                        <h2>{paper.title}</h2>
                        <Stack direction="row" spacing={2}>
                            {authors.map((author) => (
                                <Link to={`/author/${author.authorId}`}>{author.authorName}</Link>
                            ))}
                        </Stack>
                        <div>Publication Date: {paper.pub_date}</div>
                    </Stack>
                </Stack>
                {/* Paper stat information on the right hand side */}
                <Stack direction="column" spacing={2}>
                    
                    <div>Citation Count: {paper.citation_count}</div>
                    <div>Refenence Count: {paper.reference_count}</div>
                    <div>Influential Citation Count: {paper.influential_citation_count}</div>
                    <div>Venue: {paper.venue}</div>
                    <div>Journal: {paper.journal}</div>
                    
                </Stack>
            </Stack>
            <Divider />
            {/* IF there is an abstract, display it */}
            {/* <Stack direction="column" spacing={2}>
                <h2>Abstract</h2>
                <div>{paper.abstract}</div>
            </Stack> 
            <Divider />*/}
        <h1>Related Paper</h1>
        <RowTable columnNames={relatedPaperColumns} data={relatedPapers} />
        </Stack>
    );
}

export default Paperpage;