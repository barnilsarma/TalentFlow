import { useParams } from "react-router-dom"
import styles from "./JobDescription.module.scss";
const JobDescription=()=>{
    const {id}=useParams();
    return (
        <div className={styles.JobDescription}>
            {id}
        </div>
    );
}
export default JobDescription;