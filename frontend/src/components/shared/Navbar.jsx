import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { BriefcaseBusiness, Building2, ChevronDown, FileText, Home, LogOut, Plus, UserRound } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'react-toastify'
import { useApp } from '@/context/AppContext'

const Navbar = () => {
    const { user, setUser } = useApp();
    const navigate = useNavigate();
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                setUser(null);
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        }
    }
    return (
        <header className='site-header'>
            <div className='nav-shell'>
            <div className='nav-inner'>
                <Link to='/' className='brand-lockup'><span className='brand-mark'><BriefcaseBusiness size={21}/></span><span>Job<span>Portal</span><small>Find your next chapter</small></span></Link>
                <div className='nav-content'>
                    <ul className='nav-links'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><NavLink to="/admin/companies" className={({ isActive }) => isActive ? 'nav-active' : ''}>Companies</NavLink></li>
                                    <li><NavLink to="/admin/jobs" className={({ isActive }) => isActive ? 'nav-active' : ''}>Jobs</NavLink></li>
                                </>
                            ) : (
                                <>
                                    <li><NavLink to="/jobs" className={({ isActive }) => isActive ? 'nav-active' : ''}>Find Jobs</NavLink></li>
                                    <li><NavLink to="/browse" className={({ isActive }) => isActive ? 'nav-active' : ''}>Browse</NavLink></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='nav-account-actions'>
                                <Link to="/login" className="login-link">Login</Link>
                                <Link to="/signup"><Button className="button-teal nav-cta">Register</Button></Link>
                            </div>
                        ) : (
            <Popover open={accountMenuOpen} onOpenChange={setAccountMenuOpen}>
                                <PopoverTrigger asChild>
                                    <button type="button" className="account-menu-trigger" aria-label="Open account menu" aria-expanded={accountMenuOpen}>
                                        <Avatar className="account-menu-avatar">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || 'Account'} />
                                            <AvatarFallback className="bg-gray-200 text-gray-600 font-semibold">{user?.fullname?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <ChevronDown size={15} className={accountMenuOpen ? 'account-chevron is-open' : 'account-chevron'} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="end" sideOffset={12} className="w-80 account-menu">
                                    <div className="account-menu-identity">
                                        <div className="account-menu-name">{user?.fullname || 'Your account'}</div>
                                        <div className="account-menu-email">{user?.email}</div>
                                        <span className="account-menu-role">{user?.role === 'recruiter' ? 'Recruiter account' : 'Student account'}</span>
                                    </div>
                                    <nav className="account-menu-links" aria-label="Account navigation">
                                        <Link to="/" onClick={() => setAccountMenuOpen(false)}><Home size={17} />Home</Link>
                                        {user?.role === 'recruiter' ? <>
                                            <Link to="/admin/companies" onClick={() => setAccountMenuOpen(false)}><Building2 size={17} />Companies</Link>
                                            <Link to="/admin/jobs" onClick={() => setAccountMenuOpen(false)}><BriefcaseBusiness size={17} />Manage jobs</Link>
                                            <Link to="/admin/jobs/create" onClick={() => setAccountMenuOpen(false)}><Plus size={17} />Post a job</Link>
                                        </> : <>
                                            <Link to="/jobs" onClick={() => setAccountMenuOpen(false)}><BriefcaseBusiness size={17} />Find jobs</Link>
                                            <Link to="/browse" onClick={() => setAccountMenuOpen(false)}><FileText size={17} />Browse jobs</Link>
                                            <Link to="/profile" onClick={() => setAccountMenuOpen(false)}><UserRound size={17} />My profile &amp; applications</Link>
                                        </>}
                                    </nav>
                                    <button type="button" className="account-menu-logout" onClick={logoutHandler}><LogOut size={17} />Logout</button>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div></div>
        </header>
    )
}

export default Navbar
