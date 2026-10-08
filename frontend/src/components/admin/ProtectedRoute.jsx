import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const { user, isAuthChecking } = useApp();

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isAuthChecking && (user === null || user.role !== 'recruiter')){
            navigate("/");
        }
    },[user, isAuthChecking, navigate]);

    if (isAuthChecking || user === null || user.role !== 'recruiter') {
        return null;
    }

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;
