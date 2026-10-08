import { useMemo } from 'react'
import Navbar from '../components/shared/Navbar'
import FilterCard from '../components/FilterCard'
import JobCard from '../components/JobCard'
import { useApp } from '@/context/AppContext'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'
import { getMonthlySalaryInRupees } from '@/utils/salary'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Jobs = ({ showNavbar = true, fetchJobs = true }) => {
    useGetAllJobs({ enabled: fetchJobs });
    const { allJobs, searchedQuery, jobFilters, user } = useApp();
    useGetAppliedJobs({ enabled: fetchJobs && user?.role === 'student' });
    const filterJobs = useMemo(() => {
        const query = searchedQuery.trim().toLowerCase();
        const salaryRanges = {
            '₹0–40,000 / month': [0, 40000],
            '₹40,000–1,00,000 / month': [40000, 100000],
            '₹1,00,000–5,00,000 / month': [100000, 500000],
            '₹5,00,000+ / month': [500000, Infinity],
        };

        const compact = value => (value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const locationAliases = {
            'delhincr': ['delhi', 'ncr', 'noida', 'gurgaon', 'gurugram'],
            'bangalore': ['bangalore', 'bengaluru'],
        };
        const industryAliases = { 'fullstackdeveloper': ['fullstackdeveloper', 'fullstack', 'fullstackdevelopment'] };

        return allJobs.filter(job => {
            const searchableText = [job.title, job.description, job.location, job.jobType, ...(job.requirements || [])]
                .filter(Boolean).join(' ').toLowerCase();
            if (query && !searchableText.includes(query)) return false;

            if (jobFilters.location) {
                const selectedLocation = jobFilters.location.toLowerCase();
                const locationText = `${job.location || ''} ${job.jobType || ''}`.toLowerCase();
                const locationOptions = locationAliases[compact(selectedLocation)] || [selectedLocation];
                const locationMatches = locationOptions.some(option => locationText.includes(option));
                const remoteMatches = selectedLocation === 'remote' && /remote|work from home|wfh/i.test(locationText);
                if (!locationMatches && !remoteMatches) return false;
            }

            if (jobFilters.industry) {
                const industryOptions = industryAliases[compact(jobFilters.industry)] || [compact(jobFilters.industry)];
                const compactText = compact(searchableText);
                if (!industryOptions.some(option => compactText.includes(option))) return false;
            }

            if (jobFilters.salary) {
                const [min, max] = salaryRanges[jobFilters.salary] || [];
                const salary = getMonthlySalaryInRupees(job);
                if (!Number.isFinite(salary) || min === undefined || salary < min || salary > max) return false;
            }
            return true;
        });
    }, [allJobs, searchedQuery, jobFilters]);

    return (
        <div className="app-page jobs-page">
            {showNavbar && <Navbar />}
            <div className='jobs-layout'>
                    <div className='job-filter-column hidden md:block'>
                        <FilterCard />
                    </div>
                    <div className='job-results-scroll job-feed-main'>
                        <div className="job-feed-heading">
                            <div><span className="section-kicker">STUDENT JOB FEED</span><h1>Recommended jobs</h1></div>
                            <span className="job-result-count">{filterJobs.length} {filterJobs.length === 1 ? 'job' : 'jobs'}</span>
                        </div>
                        {filterJobs.length <= 0 ? (
                            <div className='job-feed-empty'>
                                <h2>No jobs found</h2>
                                <p>Try another keyword or clear the filters to see more opportunities.</p>
                            </div>
                        ) : (
                            <div className='job-results-grid'>
                                {filterJobs.map((job) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -16 }}
                                        transition={{ duration: 0.25 }}
                                        key={job?._id}
                                    >
                                        <JobCard job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
            </div>
        </div>
    )
}

export default Jobs
