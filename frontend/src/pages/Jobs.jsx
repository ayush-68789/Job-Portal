import React, { useEffect, useState } from 'react'
import Navbar from '../components/shared/Navbar'
import FilterCard from '../components/FilterCard'
import JobCard from '../components/JobCard'
import { useApp } from '@/context/AppContext'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Jobs = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useApp();
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex gap-5'>
                    <div className='w-20% hidden md:block md:w-[250px]'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <div className='flex-1 text-center py-20 text-gray-500 font-medium'>
                                Job not found
                            </div>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <div key={job?._id}>
                                                <JobCard job={job} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs
