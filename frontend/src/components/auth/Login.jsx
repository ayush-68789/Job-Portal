import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'react-toastify'
import { useApp } from '@/context/AppContext'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    });
    const { loading, user, setLoading, setUser } = useApp();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                setUser(res.data.user);
                navigate(res.data.user.role === 'recruiter' ? "/admin/companies" : "/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="app-page auth-page">
            <Navbar />
            <div className='auth-layout'>
                <form onSubmit={submitHandler} className='auth-card login-card'>
                    <div className="login-role-tabs" role="tablist" aria-label="Choose account type">
                        <button type="button" role="tab" aria-selected={input.role === 'student'} className={input.role === 'student' ? 'selected' : ''} onClick={() => setInput({ ...input, role: 'student' })}>Student</button>
                        <button type="button" role="tab" aria-selected={input.role === 'recruiter'} className={input.role === 'recruiter' ? 'selected' : ''} onClick={() => setInput({ ...input, role: 'recruiter' })}>Employer / T&amp;P</button>
                    </div>
                    <div className="login-heading"><h1>Welcome back</h1><p>Log in to continue to JobPortal.</p></div>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                        />
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>New to JobPortal? <Link to="/signup" className='text-blue-600'>Register (Student / Company)</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
