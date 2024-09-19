import React from 'react'
import ChooseRegion from './ChooseRegion'
import FilterPrice from './FilterPrice'
import FilterArea from './FilterArea'
import FilterBedrooms from './FilterBedrooms'

const FilterProperties = () => {
    return (
        <div className='flex items-center justify-center gap-[24px] border rounded-[10px] p-[5px] border-[#DBDBDB] '>
            <ChooseRegion />
            <FilterPrice />
            <FilterArea />
            <FilterBedrooms />
        </div>)
}

export default FilterProperties