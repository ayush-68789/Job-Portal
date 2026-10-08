const currencyFormatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
});

export const getSalaryInRupees = (job) => {
    const amount = Number(job?.salary);
    if (!Number.isFinite(amount)) return null;
    // Before salary units were stored, job salaries were entered in LPA/year.
    return !job?.salaryUnit || job.salaryUnit === 'LPA' ? amount * 100000 : amount;
};

export const getMonthlySalaryInRupees = (job) => {
    const salary = getSalaryInRupees(job);
    if (salary === null) return null;
    return job?.salaryPeriod !== 'month' ? salary / 12 : salary;
};

export const formatSalary = (job) => {
    const salary = getSalaryInRupees(job);
    if (salary === null) return 'Salary not specified';
    const period = job?.salaryPeriod !== 'month' ? 'year' : 'month';
    return `₹${currencyFormatter.format(salary)} / ${period}`;
};
