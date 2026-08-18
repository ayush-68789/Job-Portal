import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return 0;
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300'
        >
            <div>
                <div className='flex items-center justify-between'>
                    <p className='text-sm text-gray-500'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button variant="outline" className="rounded-full" size="icon">
                        <Bookmark className='w-4 h-4' />
                    </Button>
                </div>

                <div className='flex items-center gap-2 my-2'>
                    <Button className="p-6" variant="outline" size="icon">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo || "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg"} alt={job?.company?.name} />
                        </Avatar>
                    </Button>
                    <div>
                        <h1 className='font-medium text-lg'>{job?.company?.name || "Company Name"}</h1>
                        <p className='text-sm text-gray-500'>{job?.location || "India"}</p>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                    <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
                </div>

                <div className='flex items-center gap-2 mt-4 flex-wrap'>
                    <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                    <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                    <Badge className={'text-[#720361] font-bold'} variant="ghost">{job?.salary} LPA</Badge>
                </div>
            </div>

            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button className="bg-[#720361] hover:bg-[#5b024d] text-white">Save For Later</Button>
            </div>
        </motion.div>
    )
}

export default JobCard
