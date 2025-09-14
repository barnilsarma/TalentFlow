import styles from './Candidates.module.scss';
import * as components from '../../components';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Candidates=()=>{
    const [candidates,setCandidates]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        async function fetchCandidates(){
            const res=await axios.get('/api/candidates');
            if(res.status===200){
                setCandidates(res.data.candidates);
                setLoading(false);
            }   
        }
        fetchCandidates();
    },[]);
    const { Card } = components.Candidates;
    return (
        <div className={styles.Candidates}>
            <h1 className={styles.h1}>Candidates</h1>
            {loading && <h1>Loading Candidates...</h1>}
            <div className={styles.container}>
                {
                    candidates.map((candidate)=>(
                        <Link to={`/candidates/${candidate.id}`}><Card key={candidate.id} name={candidate.name} email={candidate.email} /></Link>
                    ))
                }
            </div>
        </div>
    );
}
export default Candidates;