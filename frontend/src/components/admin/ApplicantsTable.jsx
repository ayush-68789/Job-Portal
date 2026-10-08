import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { toast } from 'react-toastify';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useState } from 'react';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants, setAllApplicants } = useApp();
    const [updatingId, setUpdatingId] = useState(null);

    const statusHandler = async (status, id) => {
        try {
            setUpdatingId(id);
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                // Update local state so the UI reflects the change immediately
                const updatedApplicants = {
                    ...applicants,
                    applications: applicants.applications.map((app) =>
                        app._id === id ? { ...app, status: status.toLowerCase() } : app
                    )
                };
                setAllApplicants(updatedApplicants);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setUpdatingId(null);
        }
    }

    const getRowStyle = (status) => {
        if (status === 'accepted') {
            return 'bg-green-50 hover:bg-green-100';
        } else if (status === 'rejected') {
            return 'bg-red-50 hover:bg-red-100';
        }
        return '';
    }

    const getStatusBadge = (status) => {
        if (status === 'accepted') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Accepted</span>;
        } else if (status === 'rejected') {
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Rejected</span>;
        }
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pending</span>;
    }

    return (
        <div>
            <div className="applicants-table-wrap">
            <Table className="applicants-table">
                <TableCaption>{applicants?.applications?.length ? 'Applicant details and review status' : 'No applicants have applied for this job yet.'}</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Applied</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className={getRowStyle(item?.status)}>
                                <TableCell><div className="applicant-candidate"><span className="applicant-initial">{item?.applicant?.fullname?.charAt(0)?.toUpperCase() || '?'}</span><strong>{item?.applicant?.fullname || 'Candidate'}</strong></div></TableCell>
                                <TableCell>{item?.applicant?.email || '-'}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber || '-'}</TableCell>
                                <TableCell>{item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</TableCell>
                                <TableCell>{getStatusBadge(item?.status)}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button type="button" className="applicant-actions-trigger" aria-label={`Review ${item?.applicant?.fullname || 'candidate'}`}><MoreHorizontal size={18} /></button>
                                        </PopoverTrigger>
                                        <PopoverContent align="end" className="w-40 applicant-actions-menu">
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <button type="button" disabled={updatingId === item?._id} onClick={() => statusHandler(status, item?._id)} key={index} className={`applicant-status-action ${status.toLowerCase()}`}>
                                                            <span className="applicant-status-dot" />{status}
                                                        </button>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>

                            </TableRow>
                        ))
                    }

                </TableBody>

            </Table>
            </div>
        </div>
    )
}

export default ApplicantsTable
