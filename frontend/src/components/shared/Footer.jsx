import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react'
import { useApp } from '@/context/AppContext'

const jobCategories = [
    ['Frontend Developer', 'Frontend Developer'],
    ['Backend Developer', 'Backend Developer'],
    ['Full Stack Developer', 'FullStack Developer'],
    ['Data Science', 'Data Science'],
    ['Design', 'Graphic Designer'],
    ['DevOps', 'DevOps Engineer'],
    ['Sales', 'Sales'],
]

const jobLocations = ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Remote']

const Footer = () => {
    const { setSearchedQuery } = useApp()
    const jobLink = (label, query) => <Link key={label} to="/jobs" onClick={() => setSearchedQuery(query)}>{label}</Link>

    return (
        <footer className="site-footer directory-footer">
            <div className="footer-directory">
                <section className="footer-directory-section">
                    <h3><BriefcaseBusiness size={17} /> Browse jobs by category</h3>
                    <div className="footer-directory-links">{jobCategories.map(([label, query]) => jobLink(label, query))}<Link className="footer-view-all" to="/jobs" onClick={() => setSearchedQuery('')}>View all jobs <ArrowRight size={14} /></Link></div>
                </section>
                <section className="footer-directory-section">
                    <h3><MapPin size={17} /> Browse jobs by location</h3>
                    <div className="footer-directory-links">{jobLocations.map((location) => jobLink(location, location))}<Link className="footer-view-all" to="/jobs" onClick={() => setSearchedQuery('')}>View all locations <ArrowRight size={14} /></Link></div>
                </section>
            </div>
            <div className="footer-dark">
                <div className="footer-main">
                    <div className="footer-brand"><Link to="/" className="brand-lockup"><span className="brand-mark"><BriefcaseBusiness size={21}/></span><span>Job<span>Portal</span><small>Find your next chapter</small></span></Link><p>Explore open roles and find the next step in your career.</p></div>
                    <div className="footer-column"><strong>For candidates</strong><Link to="/jobs">Find jobs</Link><Link to="/browse">Browse opportunities</Link><Link to="/profile">My profile</Link></div>
                    <div className="footer-column"><strong>For employers</strong><Link to="/admin/companies">Companies</Link><Link to="/admin/jobs">Manage jobs</Link><Link to="/admin/jobs/create">Post a job</Link></div>
                    <div className="footer-column"><strong>Your account</strong><Link to="/login">Login</Link><Link to="/signup">Create account</Link></div>
                </div>
                <div className="footer-bottom"><span>© {new Date().getFullYear()} JobPortal. All rights reserved.</span><span>Built for what’s next.</span></div>
            </div>
        </footer>
    )
}

export default Footer
