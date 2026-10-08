import { useEffect, useState } from 'react'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { useApp } from '@/context/AppContext'
import { toast } from 'react-toastify'
import Navbar from '../components/shared/Navbar'
import { motion } from 'framer-motion'
import { formatSalary } from '@/utils/salary'

const JobDescription = () => {
    const { singleJob, setSingleJob, user } = useApp();
    const params = useParams();
    const jobId = params.id;

    const isInitiallyApplied = singleJob?.applications?.some(application =>
        String(application?.applicant?._id || application?.applicant || application) === String(user?._id)
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const isJobClosed = singleJob?.isOpen === false;

    const applyJobHandler = async () => {
        if (isJobClosed) return;
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                setSingleJob(updatedSingleJob);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to apply.");
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    setSingleJob(res.data.job);
                    setIsApplied(res.data.job.applications.some(application =>
                        String(application?.applicant?._id || application?.applicant || application) === String(user?._id)
                    ));
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Failed to load job details.");
            }
        }
        fetchSingleJob();
    }, [jobId, setSingleJob, user?._id]);

    return (
        <div className="app-page description-page">
            <Navbar />
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='description-layout'
            >
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-2xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4 flex-wrap'>
                            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className={'text-[#720361] font-bold'} variant="ghost">{formatSalary(singleJob)}</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied || isJobClosed}
                        className={`rounded-lg ${(isApplied || isJobClosed) ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-[#720361] hover:bg-[#5f32ad] text-white'}`}>
                        {isApplied ? 'Already Applied' : isJobClosed ? 'Applications Closed' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium py-4 text-lg'>Job Description</h1>
                <div className='my-4 space-y-3'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{formatSalary(singleJob)}</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>
            </motion.div>
        </div>
    )
}

export default JobDescription
