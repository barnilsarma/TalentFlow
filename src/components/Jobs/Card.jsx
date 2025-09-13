import styles from "./Card.module.scss";

const Card=(props)=>{
    return (
        <div className={styles.Card}>
            <h1 className={styles.h1}>{props.name}</h1>
            <h3 className={styles.h2}>{props.mode}|{props.type}</h3>
            <h3 className={styles.h3}>{props.exp} Experience Required</h3>
        </div>
    );
}
export default Card;