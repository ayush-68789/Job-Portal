import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApp } from '@/context/AppContext'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const PostJob = () => {
    const { id: jobId } = useParams();
    const isEditing = Boolean(jobId);
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        salaryUnit: "INR",
        salaryPeriod: "month",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const [loadingJob, setLoadingJob] = useState(isEditing);
    const navigate = useNavigate();

    const companiesLoading = useGetAllCompanies();
    const { companies } = useApp();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (companyId) => {
        setInput(current => ({ ...current, companyId }));
    };

    useEffect(() => {
        if (!jobId) return;
        let active = true;
        const fetchJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (!res.data.success) throw new Error('Job not found.');
                const job = res.data.job;
                if (active) setInput({
                    title: job.title || '',
                    description: job.description || '',
                    requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements || '',
                    salary: job.salary ?? '',
                    salaryUnit: job.salaryUnit || 'LPA',
                    salaryPeriod: job.salaryPeriod || 'year',
                    location: job.location || '',
                    jobType: job.jobType || '',
                    experience: String(job.experienceLevel ?? ''),
                    position: job.position ?? 1,
                    companyId: job.company?._id || job.company || ''
                });
            } catch (error) {
                toast.error(error.response?.data?.message || error.message || 'Failed to load job.');
                navigate('/admin/jobs');
            } finally {
                if (active) setLoadingJob(false);
            }
        };
        fetchJob();
        return () => { active = false; };
    }, [jobId, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios({
                method: isEditing ? 'patch' : 'post',
                url: isEditing ? `${JOB_API_END_POINT}/update/${jobId}` : `${JOB_API_END_POINT}/post`,
                data: input,
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="app-page admin-page">
            <Navbar />
            <div className='admin-form-layout'>
                <form onSubmit = {submitHandler} className='admin-form-card'>
                    <div className="admin-form-heading"><span>{isEditing ? 'UPDATE LISTING' : 'NEW OPPORTUNITY'}</span><h1>{isEditing ? 'Edit job' : 'Post a new job'}</h1><p>{isEditing ? 'Update the details candidates see for this role.' : 'Add the role details candidates need to apply.'}</p></div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="salary">Salary amount</Label>
                            <div className="salary-input-row">
                                <Input
                                    id="salary"
                                    type="number"
                                    name="salary"
                                    min="0"
                                    step="any"
                                    inputMode="decimal"
                                    placeholder="e.g. 50000"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    required
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                />
                                <Select value={`${input.salaryUnit}-${input.salaryPeriod}`} onValueChange={value => {
                                    const [salaryUnit, salaryPeriod] = value.split('-');
                                    setInput(current => ({ ...current, salaryUnit, salaryPeriod }));
                                }}>
                                    <SelectTrigger aria-label="Salary currency and period" className="salary-format-select"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="INR-month">₹ per month</SelectItem>
                                        <SelectItem value="INR-year">₹ per year</SelectItem>
                                        <SelectItem value="LPA-year">LPA per year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <p className="salary-input-hint">Enter numbers only, then choose the currency unit and pay period.</p>
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level (years)</Label>
                            <Input
                                type="text"
                                name="experience"
                                placeholder="e.g. 2 - 4 years, or 0 for entry level"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            <div className="company-select-field">
                                <Label htmlFor="job-company">Company</Label>
                                {companiesLoading ? <p className="company-loading">Loading your companies…</p> : companies.length > 0 ? (
                                    <Select value={input.companyId} onValueChange={selectChangeHandler}>
                                        <SelectTrigger id="job-company" className="w-full"><SelectValue placeholder="Select a company" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>{companies.map(company => <SelectItem key={company._id} value={company._id}>{company.name}</SelectItem>)}</SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : <p className="company-loading">No company registered yet.</p>}
                            </div>
                        }
                    </div> 
                    {loadingJob && <div className="company-loading">Loading job details…</div>}
                    {
                        loading ? <Button type="button" disabled className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : (
                            <Button type="submit" disabled={loadingJob || companiesLoading || companies.length === 0 || !input.companyId} className="w-full my-4">{isEditing ? 'Save Changes' : 'Post New Job'}</Button>
                        )
                    }
                    {
                        !companiesLoading && companies.length === 0 && <div className="company-required-message"><p>You need to register a company before posting a job.</p><Button type="button" variant="outline" onClick={() => navigate('/admin/companies/create')}>Register a company</Button></div>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
