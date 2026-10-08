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

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
        file: ""
    });
    const { loading, user, setLoading, setUser } = useApp();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                setUser(res.data.user);
                toast.success(res.data.message);
                if (res.data.user.role === 'recruiter') {
                    navigate("/admin/companies");
                } else {
                    navigate("/");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
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
            <div className='auth-layout signup-layout'>
                <div className="signup-content">
                    <div className="signup-page-heading"><span>JOBPORTAL</span><h1>Create your account</h1><p>Join JobPortal to explore and apply for open roles.</p></div>
                    <form onSubmit={submitHandler} className='auth-card signup-card'>
                        <div className="signup-role-tabs" role="tablist" aria-label="Choose account type">
                            <button type="button" role="tab" aria-selected={input.role === 'student'} className={input.role === 'student' ? 'selected' : ''} onClick={() => setInput({ ...input, role: 'student' })}>Student</button>
                            <button type="button" role="tab" aria-selected={input.role === 'recruiter'} className={input.role === 'recruiter' ? 'selected' : ''} onClick={() => setInput({ ...input, role: 'recruiter' })}>Employer / T&amp;P</button>
                        </div>
                        <div className="signup-card-heading"><strong>{input.role === 'student' ? 'Candidate sign up' : 'Employer sign up'}</strong><span>Complete your details to get started.</span></div>
                        <div className="signup-fields">
                            <div className='my-2 signup-field-wide'><Label>Full Name</Label><Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Your full name" /></div>
                            <div className='my-2 signup-field-wide'><Label>Email</Label><Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="you@example.com" /></div>
                            <div className='my-2 signup-field-wide'><Label>Password</Label><Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Create a password" /></div>
                            <div className='my-2'><Label>Phone Number</Label><Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Your phone number" /></div>
                            <div className='my-2 signup-photo-field'><Label htmlFor="profile-photo">Profile Photo <span>(optional)</span></Label><Input id="profile-photo" accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" /></div>
                        </div>
                        {loading ? <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Create account</Button>}
                        <span className='text-sm'>Already registered? <Link to="/login" className='text-blue-600'>Log in</Link></span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
