import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const { setSearchedQuery } = useApp();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        setSearchedQuery(query);
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-gray-500 max-w-xl mx-auto'>Explore thousands of job opportunities with top companies and take your career to the next level.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full bg-transparent text-sm py-2'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
