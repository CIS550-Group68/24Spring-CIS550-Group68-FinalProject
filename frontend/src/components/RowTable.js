import React from "react";
import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";

const defaultRenderCell = (col, row) => {
  return (
    <div style={{ padding: "8px"}}>
      {row[col.field]}
    </div>
  );
};

function RowTable({ columnNames, data }) {
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
          {data.map((row, idx) => (
            <TableRow key={idx}>
              {columnNames.map((col) => (
                <TableCell key={col.field} style={{...cellStyle, width: "25%"}} >
                  {col.renderCell
                    ? col.renderCell(row)
                    : defaultRenderCell(col, row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RowTable;
