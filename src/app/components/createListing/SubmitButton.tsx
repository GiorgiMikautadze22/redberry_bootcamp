import Link from 'next/link'
import React from 'react'

const SubmitButton = () => {
    return (
        <div className='flex items-center justify-end gap-[16px]'>
            <Link href={"/"}>
                <button className='border font-semibold text-[#F93B1D] h-[47px] border-[#F93B1D] rounded-[10px] flex items-center justify-center gap-2 px-[15px]'>

                    <p>გაუქმება</p>
                </button>
            </Link>
            <button className='bg-[#F93B1D] font-semibold text-white h-[47px] border-[#F93B1D] rounded-[10px] flex items-center justify-center gap-2 px-[15px]'
                type='submit'
            >
                <p>დაამატე ლისტინგი</p>
            </button>

        </div>
    )
}

export default SubmitButton