import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useState } from "react";
import { TablePagination } from "@mui/material";

const defaultRenderCell = (col, row) => {
  return <div style={{ padding: "8px" }}>{row[col.field]}</div>;
};

function RowTable({ columnNames, data, rowsPerPageOptions = [25, 10, 5] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing the number of rows per page
  };

  const headerStyle = {
    fontWeight: "bold", // Makes text bold
    textAlign: "center", // Centers text in the header
    backgroundColor: "#f5f5f5", // Light grey background for the header
    padding: "10px 24px", // Adds padding to header cells
  };

  const cellStyle = {
    textAlign: "center", // Aligns text in cells to center, adjust as needed
    padding: "10px 24px", // Adds padding to cells for better readability
  };

  const pagedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnNames.map((col) => (
              <TableCell
                key={col.field}
                style={{ ...headerStyle, width: col.width }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {pagedData.map((row, idx) => (
            <TableRow key={idx}>
              {columnNames.map((col) => (
                <TableCell
                  key={col.field}
                  style={{ ...cellStyle, width: col.width }}
                >
                  {col.renderCell
                    ? col.renderCell(row)
                    : defaultRenderCell(col, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPageOptions={rowsPerPageOptions}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default RowTable;
