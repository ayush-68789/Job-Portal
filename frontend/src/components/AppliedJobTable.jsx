import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useApp } from '@/context/AppContext'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

const AppliedJobTable = () => {
    const { allAppliedJobs, setAllAppliedJobs } = useApp();

    const withdrawHandler = async (applicationId) => {
        if (!confirm("Are you sure you want to withdraw this application?")) return;
        try {
            const res = await axios.delete(`${APPLICATION_API_END_POINT}/delete/${applicationId}`, { withCredentials: true });
            if (res.data.success) {
                setAllAppliedJobs(allAppliedJobs.filter(job => job._id !== applicationId));
                toast.success("Application withdrawn.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to withdraw application.");
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0
                            ? <tr><td colSpan={5} className="text-center py-4">You haven't applied to any job yet.</td></tr>
                            : allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell>
                                        <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {appliedJob.status === 'pending' && (
                                            <button
                                                onClick={() => withdrawHandler(appliedJob._id)}
                                                className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                                title="Withdraw application"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Withdraw
                                            </button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable