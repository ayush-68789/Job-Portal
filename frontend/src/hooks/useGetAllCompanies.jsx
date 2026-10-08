import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useApp } from '@/context/AppContext'

const useGetAllCompanies = () => {
    const { setCompanies } = useApp();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    setCompanies(res.data.companies);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchCompanies();
    },[setCompanies]);
    return loading;
}

export default useGetAllCompanies
