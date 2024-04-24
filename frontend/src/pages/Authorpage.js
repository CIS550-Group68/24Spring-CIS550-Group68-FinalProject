import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Divider, Stack } from "@mui/material";
import SearchBar from "../components/SearchBar";
import { searchFunction } from "../utils/UtilFunctions";
import {Link} from 'react-router-dom';
import RowTable from "../components/RowTable";

import { getAuthorById, getAuthorCollaborators, getAuthorPapers } from "../api/API";

function AuthorPage() {
    const { authorId } = useParams(); 

    const [author, setAuthor] = useState({});
    const [publications, setPublications] = useState([]);
    const [coAuthors, setCoAuthors] = useState([]);

    // TODO: May need to avoid an infinite loop here
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

    const coAuthorsColumns = [
        {
            field: 'authorName',
            headerName: 'Author Name',
            renderCell: (row) => <Link to={`/author/${row.authorId}`}>{row.authorName}</Link> // A Link component is used just for formatting purposes
        },
        {
            field: 'ciation',
            headerName: 'Citation Count'
        },
        {
            field: 'hIndex',
            headerName: 'H-Index'
        },
        {
            field: 'paperCount',
            headerName: 'Paper Count'
        }
    ];

    return (
        <Stack spacing={2} direction="column" justifyContent="space-between">
            <h1>Author Page</h1>
            <SearchBar searchFunction={searchFunction} />
            <Divider />
            <Stack direction="row" spacing={2}>
                {/* Author name and co-authors on the left hand side */}
                <Stack direction="column" spacing={2}>
                    <h2>{author.authorName}</h2>
                    <Stack direction="row" spacing={2}>
                        {coAuthors.map((coAuthor) => (
                            <Link to={`/author/${coAuthor.authorId}`}>{coAuthor.authorName}</Link>
                        ))}
                    </Stack>
                </Stack>
                {/* Author stat information on the right hand side */}
                <Stack direction="column" spacing={2}>
                    <div>Citation Count: {author.citation_count}</div>
                    <div>Paper Count: {author.paper_count}</div>
                    <div>H-Index: {author.h_index}</div>
                </Stack>
            </Stack>
            <Divider />
            <h2>Publications</h2>
            <RowTable columnNames={publicationsColumns} data={publications} />
            <Divider />
            <h2>Co-Authors</h2>
            <RowTable columnNames={coAuthorsColumns} data={coAuthors} />
        </Stack>
    );
}

export default AuthorPage;