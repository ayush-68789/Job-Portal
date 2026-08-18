import React, { useEffect, useState } from 'react'
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
        array: ["0-40k", "42k-1lakh", "1lakh to 5lakh", "5lakh+"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const { setSelectedFilter, setSearchedQuery } = useApp();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        if (setSearchedQuery) {
            setSearchedQuery(selectedValue);
        }
    }, [selectedValue]);

    return (
        <div className='w-full bg-white p-3 rounded-md shadow-sm border border-gray-100'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-base mt-3'>{data.filterType}</h1>
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
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
