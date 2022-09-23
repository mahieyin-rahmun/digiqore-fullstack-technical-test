import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TTableProps } from "@/types";
import { Typography } from "@mui/material";

const LanguageLevelTable: React.FC<TTableProps> = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" fontWeight={"bold"}>
                Language
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight={"bold"}>
                Level
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight={"bold"}>
                Average Source Statements
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id || row.language}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Typography variant="body1">{row.language}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">{row.level}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1">
                  {row.averageSourceStatements}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LanguageLevelTable;
