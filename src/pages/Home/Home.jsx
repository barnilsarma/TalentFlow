import styles from "./Home.module.scss";
import * as components from "../../components";
const Home=()=>{
    const {Home}=components;
    return (
        <div className={styles.HomePage}>
            <div className={styles.hero}>
                <h1>Welcome to TalentFlow</h1>
                <p>Your gateway to a world of opportunities. Explore, connect, and grow with us!</p>
            </div>
            <Home.Explorer/>
        </div>
    );
}

export default Home;