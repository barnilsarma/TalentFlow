import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
const Card=(props)=>{
    return (
        <div className={styles.Card}>
            <Link className={styles.link} to={`/jobs/${props.id}`}>
                <h1 className={styles.h1}>{props.name}</h1>
                <h3 className={styles.h2}>{props.mode}|{props.type}</h3>
                <h3 className={styles.h3}>{props.exp} Experience Required</h3>
            </Link>
        </div>
    );
}
export default Card;