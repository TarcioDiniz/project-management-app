import {useState} from "react";
import {IProject} from "../../model/IProject.ts";

const PROJECTS_KEY = "projects";

const useProjects = () => {
  const [projects, setProjects] = useState<IProject[]>(() => {
    const storedProjects = localStorage.getItem(PROJECTS_KEY);
    return storedProjects ? JSON.parse(storedProjects) : [];
  });

  const saveProjects = (projects: IProject[]) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    setProjects(projects);
  };

  const addProject = (project: IProject) => {
    const updatedProjects = [...projects, project];
    saveProjects(updatedProjects);
  };

  const updateProject = (updatedProject: IProject) => {
    const updatedProjects = projects.map(project => project.id === updatedProject.id ? updatedProject : project);
    saveProjects(updatedProjects);
  };

  const deleteProject = (projectId: number) => {
    const updatedProjects = projects.filter(project => project.id !== projectId);
    saveProjects(updatedProjects);
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject
  };
};

export default useProjects;
