import React from 'react'
import FilterProperties from './FilterProperties'
import AddingApplicationsButtons from '../AddingApplicationsButtons'

const Filter = () => {
    return (
        <div className='flex items-center w-full justify-between font-bold text-[16px]'>
            <FilterProperties />
            <AddingApplicationsButtons />
        </div>
    )
}

export default Filter