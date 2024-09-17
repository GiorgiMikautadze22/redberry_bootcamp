import React from 'react'

const ChoosingAgent = () => {
    return (
        <div>
            <p className='text-[16px] font-medium font-helveticaNeue uppercase'>აგენტი</p>
            <div>
                <label htmlFor="region" className="block text-[14px] font-bold text-gray-700">აირჩიე</label>
                <select
                    required
                    id="region"
                    name="region"
                    value={1}
                    // onChange={handleChange}
                    className="mt-1 block w-[350px] px-3 h-[42px] py-2 border border-[#808A93] rounded-md"
                >
                    <option value="1">აირჩიეთ აგენტი</option>
                    {/* {Object.keys(regions).map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))} */}
                </select>
            </div>
        </div>
    )
}

export default ChoosingAgent