import React from 'react'
import Logo from "../assets/LOGO-02 3.svg"
import Image from 'next/image'


const Header = () => {
    return (
        <div className="w-full h-[100px] flex items-center justify-start px-[162px] border-b mb-[60px]">
            <Image src={Logo} alt="Logo" />
        </div>)
}

export default Header