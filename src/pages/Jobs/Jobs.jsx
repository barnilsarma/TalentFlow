import styles from "./Jobs.module.scss";
import { createServer } from "miragejs"
import {useState,useEffect} from "react";
import * as components from "../../components";
import axios from "axios";
let server = createServer();
server.get("/api/jobs", { jobs: [
    { 
        id: 1, 
        name: "Software Engineer I",
        mode:"Onsite",
        type:"Full-Time",
        experience:"0-2 years"
    },
    { 
        id: 2, 
        name: "Software Engineer II",
        mode:"Onsite",
        type:"Full-Time",
        experience:"2-3 years" 
    },
    { 
        id: 3, 
        name: "Software Engineer III",
        mode:"Onsite",
        type:"Full-Time",
        experience:"3+ years" 
    }
] 
});
const Jobs=()=>{
    const {Jobs}=components;
    const [jobs,setJobs]=useState([]);
    useEffect(()=>{
        async function fetchJobs(){
            const res=await axios.get("/api/jobs");
            if(res.status===200) setJobs(res.data.jobs);
        }
        fetchJobs();
    },[]);
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
                {jobs.map((job)=>(
                    <div className={styles.jobCardParent} key={job.id}>
                        <Jobs.Card name={job.name} type={job.type} mode={job.mode} exp={job.experience} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Jobs;