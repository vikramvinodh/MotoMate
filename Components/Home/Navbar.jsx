import React from 'react'
import { RiHome2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Image from 'next/image';
import logo from '../../public/logo.png'

function Navbar() {
    return (
        <section className='nav'>
            <div className='container'>
                <div className="nav d-flex justify-content-between">
                    <div className='logo'>
                        <Image src={logo} alt='-' className='logoimg' width={70}/>
                    </div>
                    <div className='ele d-flex'>
                        <div className='navele me-5 d-flex align-items-center'>
                            <RiHome2Line className='me-2 icon' size={25} />
                            <span>Home</span>
                        </div>
                        <div className='navele me-5 d-flex align-items-center'>
                            <IoSettingsOutline className='me-2 icon' size={25} />
                            <span>Services</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Navbar