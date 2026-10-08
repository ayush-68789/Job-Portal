import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import Jobs from './Jobs'

const Home = () => {
    useGetAllJobs();
    const { user } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, [user, navigate]);

    if (user?.role === 'student') {
        return <Jobs fetchJobs={false} />;
    }

    return (
        <div className="job-portal-home">
            <Navbar />
            <HeroSection />
            <LatestJobs />
            <CategoryCarousel />
            <Footer />
        </div>
    )
}

export default Home
