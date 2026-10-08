import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import { ArrowRight, BarChart3, BriefcaseBusiness, Code2, Palette, PieChart, Settings2, UsersRound } from 'lucide-react'

const categories = [
    { name: 'IT & Software', query: 'Developer', icon: Code2 },
    { name: 'Marketing', query: 'Marketing', icon: BriefcaseBusiness },
    { name: 'Sales', query: 'Sales', icon: BarChart3 },
    { name: 'Design', query: 'Designer', icon: Palette },
    { name: 'Finance', query: 'Finance', icon: PieChart },
    { name: 'HR & Admin', query: 'HR', icon: UsersRound },
    { name: 'Engineering', query: 'Engineer', icon: Settings2 },
]

const CategoryCarousel = () => {
    const { setSearchedQuery } = useApp();
    const navigate = useNavigate();
    const searchJobHandler = (query) => { setSearchedQuery(query); navigate('/browse'); }

    return <section className="home-category-section">
        <div className="home-category-inner">
            <div className="category-heading"><span className="section-kicker">EXPLORE JOBS</span><h2>What are you looking for today?</h2><p>Choose an area and explore related opportunities.</p></div>
            <div className="category-pill-list">{categories.map(({ name, query, icon: Icon }) => <button className="category-pill" key={name} onClick={() => searchJobHandler(query)}><Icon size={16} />{name}<ArrowRight size={13} /></button>)}</div>
        </div>
    </section>
}

export default CategoryCarousel
