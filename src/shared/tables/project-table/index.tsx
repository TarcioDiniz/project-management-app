import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#081b2f",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#fff",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  description: string,
) {
  return {name, description};
}

const rows = [
  createData('Projeto Mock 1', "Foi gerado automaticamente como teste.",)
];
const ProjectTable = () => {

  return (
    <TableContainer style={{boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"}}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align={"center"}>Name</StyledTableCell>
            <StyledTableCell align={"center"}>Description</StyledTableCell>
            <StyledTableCell align={"center"}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align={"center"}>{row.name}</StyledTableCell>
              <StyledTableCell align={"center"}>{row.description}</StyledTableCell>
              <StyledTableCell align={"center"}>
                <Button><EditIcon/></Button>
                <Button><DeleteIcon/></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ProjectTable