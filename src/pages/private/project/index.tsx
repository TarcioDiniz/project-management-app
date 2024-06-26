import ProjectTable from "../../../shared/tables/project-table";
import styles from "./project.module.scss"
import Title from "../../../shared/components/title";
import DialogProject from "../../../shared/dialogs/dialog-project";
import {useContext, useEffect, useState} from "react";
import {IProject} from "../../../model/IProject.ts";
import useProjects from "../../../hooks/useProjects";
import {toast} from "react-toastify";
import AuthContext from "../../../shared/context/Auth";
import {ProfileType} from "../../../shared/enums/ProfileType.ts";
import {Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Project = () => {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const _projects = useProjects();
  const [editProject, setEditProject] = useState<IProject | null>(null);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    setProjects(_projects.projects);
  }, []);

  const handleCreateProject = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setEditProject(null);
  }

  const handleRemoveProject = (projectToRemove: IProject) => {
    const updatedProjects = projects.filter(project => project !== projectToRemove);
    _projects.deleteProject(projectToRemove.id);
    setProjects(updatedProjects);
    toast.success("Project deleted successfully.");
  };

  const handleEditProject = (project: IProject) => {
    setEditProject(project);
    setOpen(true);
  }

  const handleCreteOrEditProject = (project: IProject) => {
    if (editProject) {
      _projects.updateProject(project);
      const updatedProjects = projects.map(p => (p === editProject ? project : p));
      setProjects(updatedProjects);
      toast.success("Project updated successfully");
    } else {
      _projects.addProject(project);
      setProjects([...projects, project]);
      toast.success("Project created successfully");
    }
  }

  return (
    <div className={styles.container}>
      <Title title={"Project"}/>
      {authContext?.user?.profile === ProfileType.TEACHER ? (
        <div className={styles.containerButton}>
          <Button onClick={handleCreateProject} variant={"outlined"}>
            <AddIcon/>
            Create
          </Button>
        </div>
      ) : null}
      <ProjectTable projects={projects} onDelete={handleRemoveProject} onEdit={handleEditProject}/>
      <DialogProject project={editProject} open={open} onClose={handleClose} setProject={handleCreteOrEditProject}/>
    </div>
  );
}

export default Project;