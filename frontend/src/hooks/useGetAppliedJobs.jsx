import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { useEffect } from "react"
import { useApp } from "@/context/AppContext"

const useGetAppliedJobs = ({ enabled = true } = {}) => {
    const { setAllAppliedJobs } = useApp();

    useEffect(()=>{
        if (!enabled) {
            setAllAppliedJobs([]);
            return;
        }
        let active = true;
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                if(active && res.data.success){
                    setAllAppliedJobs(res.data.application);
                }
            } catch (error) {
                if(active) setAllAppliedJobs([]);
            }
        }
        fetchAppliedJobs();
        return () => { active = false; };
    },[enabled, setAllAppliedJobs])
};
export default useGetAppliedJobs;
