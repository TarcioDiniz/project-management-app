import {
  Button,
  List,
  ListItem,
  ListItemText,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {ITeam} from "../../../model/ITeam.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

interface TeamsTableProps {
  teams: ITeam[]
  onDelete: (team: ITeam) => void;
  onEdit: (team: ITeam) => void;
}

const TeamsTable = ({teams, onDelete, onEdit}: TeamsTableProps) => {
  return (
    <TableContainer style={{boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"}}>
      <Table sx={{minWidth: 700}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align={"center"}>Name</StyledTableCell>
            <StyledTableCell align={"center"}>Project</StyledTableCell>
            <StyledTableCell align={"center"}>Team</StyledTableCell>
            <StyledTableCell align={"center"}>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team: ITeam) => (
            <StyledTableRow key={team.id}>
              <StyledTableCell align={"center"}>{team.name}</StyledTableCell>
              <StyledTableCell align={"center"}>{team.project?.name}</StyledTableCell>
              <StyledTableCell align={"center"}>
                <List>
                  {team.members.map((user, index) => (
                    <ListItem button key={index}>
                      <ListItemText primary={user.name}/>
                    </ListItem>
                  ))}
                </List>
              </StyledTableCell>
              <StyledTableCell align={"center"}>
                <Button onClick={() => onEdit(team)}><EditIcon/></Button>
                <Button onClick={() => onDelete(team)}><DeleteIcon/></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamsTable;