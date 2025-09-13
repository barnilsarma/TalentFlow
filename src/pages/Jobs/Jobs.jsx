import styles from "./Jobs.module.scss";
import {useState,useEffect} from "react";
import * as components from "../../components";
import axios from "axios";
const Jobs=()=>{
    const {Jobs}=components;
    const [loading,setLoading]=useState(true);
    const [jobs,setJobs]=useState([]);
    useEffect(()=>{
        async function fetchJobs(){
            const res=await axios.get("/api/jobs");
            if(res.status===200){
                setJobs(res.data.jobs);
                setLoading(false);
            }
        }
        fetchJobs();
    },[jobs]);
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
            {loading && <h1>Loading Jobs....</h1>}
            <div className={styles.container}>
                {jobs.map((job)=>(
                    <div className={styles.jobCardParent} key={job.id}>
                        <Jobs.Card id={job.id} name={job.name} type={job.type} mode={job.mode} exp={job.experience} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Jobs;