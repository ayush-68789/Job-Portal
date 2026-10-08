import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useApp } from '@/context/AppContext'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Science", "DevOps"]
    },
    {
        filterType: "Salary",
        array: ["₹0–40,000 / month", "₹40,000–1,00,000 / month", "₹1,00,000–5,00,000 / month", "₹5,00,000+ / month"]
    },
]

const FilterCard = () => {
    const { jobFilters, setJobFilters } = useApp();
    const filterKeys = { Location: 'location', Industry: 'industry', Salary: 'salary' };

    return (
        <div className='w-full bg-white p-3 rounded-md shadow-sm border border-gray-100'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => {
                    const filterKey = filterKeys[data.filterType];
                    return <div key={data.filterType}>
                            <div className='flex items-center justify-between mt-3'>
                                <h2 className='font-bold text-base'>{data.filterType}</h2>
                                {jobFilters[filterKey] && <button type='button' className='text-xs text-blue-600' onClick={() => setJobFilters(current => ({ ...current, [filterKey]: '' }))}>Clear</button>}
                            </div>
                            <RadioGroup value={jobFilters[filterKey]} onValueChange={value => setJobFilters(current => ({ ...current, [filterKey]: value }))}>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                            </RadioGroup>
                        </div>
                })
            }
        </div>
    )
}

export default FilterCard
