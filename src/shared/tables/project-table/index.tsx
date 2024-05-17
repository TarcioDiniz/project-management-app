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
import {IProject} from "../../../model/IProject.ts";


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

interface ProjectTableProps {
  projects: IProject[]
  onDelete: (project: IProject) => void;
  onEdit: (project: IProject) => void;
}

const ProjectTable = ({projects, onDelete, onEdit}: ProjectTableProps) => {
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
          {projects.map((project: IProject) => (
            <StyledTableRow key={project.id}>
              <StyledTableCell align={"center"}>{project.name}</StyledTableCell>
              <StyledTableCell align={"center"}>{project.description}</StyledTableCell>
              <StyledTableCell align={"center"}>
                <Button onClick={() => onEdit(project)}><EditIcon/></Button>
                <Button onClick={() => onDelete(project)}><DeleteIcon/></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ProjectTable