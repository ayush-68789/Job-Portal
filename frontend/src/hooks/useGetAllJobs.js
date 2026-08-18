import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useApp } from '@/context/AppContext'

const useGetAllJobs = () => {
    const { setAllJobs, searchedQuery } = useApp();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery || ""}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setAllJobs(res.data.jobs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllJobs();
    }, [searchedQuery, setAllJobs]);
};

export default useGetAllJobs;
