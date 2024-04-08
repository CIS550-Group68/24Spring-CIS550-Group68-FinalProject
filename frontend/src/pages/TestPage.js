import React, { useState } from 'react';
import { Container, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TestPage() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);

    // http://localhost:8080/author?authorName=xu
    const handleSearch = () => {
        fetch(`http://localhost:9999/author?authorName=${search}`)
            .then(response => response.json())
            .then(json => setData(json));
    };

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
    }

    return (
        <Container>
            <TextField
                label="Search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSearch()}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                    )
                }}
            />
            <List>
                {data.map(item => (
                    <ListItem key={item.author_id}>
                        <ListItemText primary={item.name_or_alias} />
                        <ListItemSecondaryAction>
                            <IconButton onClick={() => handleDelete(item.author_id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}