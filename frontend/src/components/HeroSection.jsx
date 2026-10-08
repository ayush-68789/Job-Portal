import React, { useState } from 'react'
import { ArrowRight, BriefcaseBusiness, Building2, Search, Sparkles } from 'lucide-react'
import { Button } from './ui/button'
import { useApp } from '@/context/AppContext'
import { Link, useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const { setSearchedQuery, allJobs } = useApp();
    const navigate = useNavigate();
    const companies = [...new Map((allJobs || []).filter((job) => job.company?.name).map((job) => [job.company.name, job.company])).values()];

    const searchJobHandler = () => {
        setSearchedQuery(query);
        navigate("/browse");
    }

    return (
        <>
            <section className="home-hero">
                <div className="home-hero-inner">
                    <div className="hero-copy">
                        <span className="eyebrow"><Sparkles size={15} /> FIND YOUR NEXT OPPORTUNITY</span>
                        <h1>Good work starts<br />with the <span>right job.</span></h1>
                        <p>Discover open roles from companies looking for people like you. Search, explore, and take your next step.</p>
                        <div className="hero-actions">
                            <Button onClick={() => navigate('/signup')} className="button-teal"><BriefcaseBusiness size={17} /> Create an account</Button>
                            <Link to="/login" className="hero-login-link">Already have an account? <strong>Log in</strong> <ArrowRight size={14}/></Link>
                        </div>
                        <Link to="/admin/companies" className="employer-entry">Hiring for your company? <strong>For employers</strong> <ArrowRight size={14}/></Link>
                    </div>
                    <div className="hero-visual">
                        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="Colleagues working together" />
                        <div className="hero-image-wash" />
                        <div className="hero-stats-card">
                            <div className="mini-stat"><span className="stat-icon teal"><BriefcaseBusiness size={19} /></span><span><strong>{allJobs?.length || 0}</strong><small>Open opportunities</small></span></div>
                            <div className="mini-stat"><span className="stat-icon blue"><Building2 size={19} /></span><span><strong>{companies.length}</strong><small>Companies hiring</small></span></div>
                            <Button onClick={() => navigate('/jobs')} className="button-amber">Explore jobs <ArrowRight size={15} /></Button>
                        </div>
                    </div>
                </div>
                <div className="search-panel">
                    <div className="search-input-wrap"><Search size={18} /><input type="text" placeholder="Search by job title, keyword or company" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()} /></div>
                    <Button onClick={searchJobHandler} className="search-submit">Search jobs <ArrowRight size={16} /></Button>
                </div>
                {companies.length > 0 && <div className="company-trust-row"><span>Explore roles at</span>{companies.slice(0, 6).map((company) => <div className="trust-company" key={company._id || company.name}>{company.logo && <img src={company.logo} alt="" />}<strong>{company.name}</strong></div>)}</div>}
            </section>
        </>
    )
}

export default HeroSection
