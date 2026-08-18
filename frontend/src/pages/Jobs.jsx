import React from 'react'
import Navbar from '../components/shared/Navbar'
import JobCard from '../components/JobCard'
import { useApp } from '@/context/AppContext'

const Jobs = () => {
    const { allJobs } = useApp();

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex gap-5'>
                    <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                        {
                            allJobs && allJobs.length > 0 ? (
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        allJobs.map((job) => (
                                            <div key={job?._id}>
                                                <JobCard job={job} />
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <div className='text-center py-20 text-gray-500 font-medium'>
                                    No jobs found.
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jobs
