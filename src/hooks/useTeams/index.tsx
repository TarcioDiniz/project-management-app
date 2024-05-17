import {useState} from "react";
import {ITeam} from "../../model/ITeam.ts";

const TEAMS_KEY = "teams";

const useTeams = () => {
  const [teams, setTeams] = useState<ITeam[]>(() => {
    const storedTeams = localStorage.getItem(TEAMS_KEY);
    return storedTeams ? JSON.parse(storedTeams) : [];
  });

  const saveTeams = (teams: ITeam[]) => {
    localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
    setTeams(teams);
  };

  const addTeam = (team: ITeam) => {
    const updatedTeams = [...teams, team];
    saveTeams(updatedTeams);
  };

  const updateTeam = (updatedTeam: ITeam) => {
    const updatedTeams = teams.map(team => team.id === updatedTeam.id ? updatedTeam : team);
    saveTeams(updatedTeams);
  };

  const deleteTeam = (teamId: number) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    saveTeams(updatedTeams);
  };

  return {
    teams,
    addTeam,
    updateTeam,
    deleteTeam
  };
};

export default useTeams;
