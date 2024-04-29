import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RowTable from '../components/RowTable';
import { getAuthorByName } from '../api/API';
import { Link } from 'react-router-dom';


function Resultpage() {
    // Create a result page, use the Row table I defined to show the result of a author search result
    // The author search result should be fetched from the backend

    const [authorResult, setAuthorResult] = useState([]);
    const [isLaoding, setIsLoading] = useState(true);
    let { authorSearchWord } = useParams();
    useEffect(() => {
        async function fetchAuthor(){
            const fetchedAuthor = await getAuthorByName(authorSearchWord);
            setAuthorResult(fetchedAuthor.data);
            setIsLoading(false);
        };
        fetchAuthor();
    }, []);

    const authorColumns = [
        {
            field: 'name',
            headerName: 'Author Name',
            renderCell: (row) => <Link to={`/author/${row.author_id}`}>{row.name}</Link> // A Link component is used just for formatting purposes
        },
        {
            field: 'citation_count',
            headerName: 'Citation Count'
        },
        {
            field: 'h_index',
            headerName: 'H-Index'
        },
        {
            field: 'paper_count',
            headerName: 'Paper Count'
        },
        {
            field: 'fields',
            headerName: 'Fields'
        }
    ];

    return (
       
        <div>
            <div>Search Result for {authorSearchWord}</div>
            {isLaoding ? (
                <div>Loading...</div>  // Display loading message
            ) : (
                <RowTable columnNames={authorColumns} data={authorResult}/>
            )}
        </div>
    )
};

export default Resultpage;