import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import CategoryCarousel from '../components/CategoryCarousel'
import LatestJobs from '../components/LatestJobs'
import Footer from '../components/shared/Footer'
import { useApp } from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user } = useApp();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    }, [user, navigate]);

    return (
        <div>
            <Navbar />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    )
}

export default Home
