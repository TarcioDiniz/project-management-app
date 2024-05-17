import styles from "./title.module.scss"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface TitleProps {
  title: string
}

const Title = ({title}: TitleProps) => {
  return (

    <h2 className={styles.title}><ArrowBackIosIcon/>{title}</h2>
  );
}

export default Title;