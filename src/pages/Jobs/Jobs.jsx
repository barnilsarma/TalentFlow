import styles from "./Jobs.module.scss";
const Jobs=()=>{
    return (
        <div className={styles.Jobs}>
            <h1>Jobs</h1>
            <div className={styles.midBar}>
                <input type="text" placeholder="Search by keywords" className={styles.searchBar} />
                <div className={styles.filterContainer}>
                    <span>Filter by:</span>
                    <select className={styles.filter}>
                        <option value="all" className={styles.option}>All</option>
                        <option value="type" className={styles.option}>Job Type</option>
                        <option value="mode" className={styles.option}>Job Mode</option>
                        <option value="exp" className={styles.option}>Experience</option>
                    </select>
                </div>
            </div>
            <div className={styles.container}>

            </div>
        </div>
    );
}
export default Jobs;