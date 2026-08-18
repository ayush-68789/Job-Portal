import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allJobs, setAllJobs] = useState([]);
    const [singleJob, setSingleJob] = useState(null);
    const [allAdminJobs, setAllAdminJobs] = useState([]);
    const [searchJobByText, setSearchJobByText] = useState("");
    const [allAppliedJobs, setAllAppliedJobs] = useState([]);
    const [searchedQuery, setSearchedQuery] = useState("");
    const [companies, setCompanies] = useState([]);
    const [singleCompany, setSingleCompany] = useState(null);
    const [searchCompanyByText, setSearchCompanyByText] = useState("");

    return (
        <AppContext.Provider value={{
            user, setUser,
            loading, setLoading,
            allJobs, setAllJobs,
            singleJob, setSingleJob,
            allAdminJobs, setAllAdminJobs,
            searchJobByText, setSearchJobByText,
            allAppliedJobs, setAllAppliedJobs,
            searchedQuery, setSearchedQuery,
            companies, setCompanies,
            singleCompany, setSingleCompany,
            searchCompanyByText, setSearchCompanyByText
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
