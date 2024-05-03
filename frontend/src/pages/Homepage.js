import React, { useEffect, useState } from 'react';
import {Stack, Divider, Select, MenuItem} from '@mui/material';
import {Link} from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { searchFunction } from '../utils/UtilFunctions';
import RowTable from '../components/RowTable';
import { Grid } from '@mui/material';


function Homepage() {
    const [topPaper, setTopPaper] = useState([]);
    const [topAuthor, setTopAuthor] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('Computer Science');

    // Create a use effect on the selectedSubject to fetch the top authors and top papers based on the selected subject
    useEffect(() => {
        // TODO: fetch the top authors and top papers based on the selected subject
        
    });

    const topAuthorColumns = [
        {
            field: 'authorName',
            headerName: 'Author Name',width: '25%',
            renderCell: (row) => <Link to={`/author/${row.authorId}`}>{row.authorName}</Link> // A Link component is used just for formatting purposes
        },
        {
            field: 'citation',
            headerName: 'Citation Count',width: '25%'
        },
        {
            field: 'hIndex',
            headerName: 'H-Index',width: '25%'
        },
        {
            field: 'paperCount',
            headerName: 'Paper Count',width: '25%'
        }
    ];

    const topPaperColumns = [
        {
            field: 'title',
            headerName: 'Title',width: '25%',
            renderCell: (row) => <Link to={`/paper/${row.paperId}`}>{row.title}</Link> // A Link component is used just for formatting purposes
        },
        {
            field: 'citation',
            headerName: 'Citation Count',width: '25%'// Add width to the columns, made sure each column header is aligned with the data
        },
        {
            field: 'year',
            headerName: 'Year',width: '25%'
        },
        {
            field: 'field',
            headerName: 'Field',width: '25%'
        }
    ];

    return (
        <Stack direction={'column'} spacing = {2} alignItems={'center'} justifyContent={'center'} marginTop={10}>
            <SearchBar/>
            <Divider />
            <Select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
                <MenuItem value="Physics">Physics</MenuItem>
                <MenuItem value="Mathematics">Mathematics</MenuItem>
                <MenuItem value="Biology">Biology</MenuItem>
                <MenuItem value="Chemistry">Chemistry</MenuItem>
            </Select>
            <Divider />
            <RowTable columnNames={topAuthorColumns} data={topAuthor}/>
            <Divider />

            <RowTable columnNames={topPaperColumns} data={topPaper}/>
        </Stack>
    );
}

export default Homepage;