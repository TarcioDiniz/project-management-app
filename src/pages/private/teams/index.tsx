import {Button} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import DialogTeam from "../../../shared/dialogs/dialog-team";
import styles from "./team.module.scss"
import useTeams from "../../../hooks/useTeams";
import {ITeam} from "../../../model/ITeam.ts";
import TeamsTable from "../../../shared/tables/teams-table";
import Title from "../../../shared/components/title";
import AddIcon from "@mui/icons-material/Add";
import {toast} from "react-toastify";
import {ProfileType} from "../../../shared/enums/ProfileType.ts";
import AuthContext from "../../../shared/context/Auth";

const Teams = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState<ITeam[]>([]);
  const _teams = useTeams();
  const [selectTeam, setSelectTeam] = useState<ITeam | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setTeams(_teams.teams);
  }, []);

  const handleSubmit = (team: ITeam) => {
    if (selectTeam) {
      _teams.updateTeam(team);
      const updatedTeams = teams.map(t => (t === selectTeam ? team : t));
      setTeams(updatedTeams);
      toast.success("Team updated successfully");
    } else {
      _teams.addTeam(team);
      setTeams([...teams, team]);
      toast.success("Team created successfully");
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectTeam(null);
  };

  const handleOnDelete = (team: ITeam) => {
    const updatedProjects = teams.filter(t => t !== team);
    _teams.deleteTeam(team.id);
    setTeams(updatedProjects);
    toast.success("Team deleted successfully.");
  };


  const handleOnEdit = (team: ITeam) => {
    setSelectTeam(team);
    setOpen(true);
  };

  return (
    <div className={styles.container}>
      <Title title={"Teams"}/>
      {authContext?.user?.profile === ProfileType.TEACHER ? (
        <div className={styles.containerButton}>
          <Button onClick={handleOpen} variant={"outlined"}>
            <AddIcon/>
            Create
          </Button>
        </div>
      ) : null}
      <DialogTeam selectTeam={selectTeam} onSubmit={handleSubmit} open={open} handleClose={handleClose}/>
      <TeamsTable teams={teams} onDelete={handleOnDelete} onEdit={handleOnEdit}/>
    </div>

  );
};

export default Teams;