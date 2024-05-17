import ProjectTable from "../../../shared/tables/project-table";
import styles from "./project.module.scss"
import Title from "../../../shared/components/title";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

const Project = () => {
  return (
    <div className={styles.container}>
      <Title title={"Project"}/>
      <div className={styles.containerButton}>
        <Button variant={"outlined"}>
          <AddIcon/>
          Create
        </Button>
      </div>
      <ProjectTable/>
    </div>
  );
}

export default Project;