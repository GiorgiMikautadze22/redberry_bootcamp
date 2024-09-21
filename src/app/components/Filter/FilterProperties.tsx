import React, { useContext, useEffect, useRef } from 'react'
import ChooseRegion from './ChooseRegion'
import FilterPrice from './FilterPrice'
import FilterArea from './FilterArea'
import FilterBedrooms from './FilterBedrooms'
import { globalContext } from '@/app/context/globalContext'

const FilterProperties = () => {


    const modalRef = useRef<HTMLDivElement>(null);
    const context = useContext(globalContext);


    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            context?.setIsOpen && context?.setIsOpen('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            context?.setIsOpen && context?.setIsOpen('');
        }
    };

    useEffect(() => {
        if (context?.isOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [context?.isOpen]);


    return (
        <div className='flex items-center justify-center gap-[24px] border rounded-[10px] p-[5px] border-[#DBDBDB]' ref={modalRef}>
            <ChooseRegion />
            <FilterPrice />
            <FilterArea />
            <FilterBedrooms />
        </div>)
}

export default FilterProperties