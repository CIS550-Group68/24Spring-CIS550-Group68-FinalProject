import React from 'react';
import {TableContainer, Table, TableBody, TableHead, TableRow, TableCell} from '@mui/material';

const defaultRenderCell = (col, row) => {
    return <div>{row[col.field]}</div>;
}

function RowTable( { columnNames, data }) {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                <TableRow>
                    {columnNames.map(col => <TableCell key={col.headerName}>{col.headerName}</TableCell>)}
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row, idx) =>
                    <TableRow key={idx}>
                    {
                        columnNames.map(col =>
                        <TableCell key={col.headerName}>
                            {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                        </TableCell>
                        )
                    }
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default RowTable;