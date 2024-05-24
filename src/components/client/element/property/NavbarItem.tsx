'use client'

import SigninButton from '@/components/global/SigninButton'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaBookmark, FaShoppingCart } from 'react-icons/fa'
import NotificationNav from '../NotificationNav'
import { IoMenu } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'

function NavbarItem({ pay, paymentUserId }: { pay: any, paymentUserId: any }) {
    const [openNav, setOpenNav] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            } else {
                setOpenNav(true);
            }
        };
    
        // Initial call to set initial state
        handleResize();
    
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(document.body);
    
        return () => {
            resizeObserver.unobserve(document.body);
        };
    }, [setOpenNav]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleOpenMenu = () => {
        setOpenMenu(true)
    }

    const handleCloseMenu = () => {
        setOpenMenu(false)
    }

    return (
        <div>
            {openNav === false ?
                <>
                    <div className="flex flex-row gap-3 sm:gap-5 items-center">
                        <Link href="/favorites"><FaBookmark className="w-[28px] h-[28px] duration-300 hover:text-[#d4b60f]" /></Link>
                        <Link href="#" className="w-fit h-fit">
                            <NotificationNav pay={pay} paymentUserId={paymentUserId} />
                        </Link>
                        <Link href="/cart"><FaShoppingCart className="w-[30px] h-[30px] duration-300 hover:text-[#d4b60f]" /></Link>
                        <SigninButton />
                    </div>
                </>
                :
                <div className='flex flex-row'>
                    {openMenu === true ?
                        <div className='fixed right-0 top-0 z-50 h-full w-full'>
                            <div className='flex justify-end h-full backdrop-brightness-50'>
                                <div ref={menuRef} className='flex flex-col justify-between max-w-[300px] items-center justify-center gap-3 w-full h-screen bg-white bg-opacity-50'>
                                    <div className='flex text-black'>
                                        <img src="https://res.cloudinary.com/dutlw7bko/image/upload/v1715650495/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6.png" className="w-[60px] mt-5 rounded-lg h-auto" alt="" />
                                    </div>
                                    <div className='flex flex-col gap-3 p-5 text-black items-center'>
                                        <Link href="/favorites" className='flex flex-row gap-4'>
                                            <FaBookmark className="w-[28px] h-[28px] duration-300 hover:text-[#d4b60f]" /> 
                                            <span>Favorite</span>
                                            </Link>
                                        <Link href="#" className="w-fit h-fit flex flex-row gap-4">
                                            <NotificationNav pay={pay} paymentUserId={paymentUserId} />
                                            <span>Notification</span>
                                        </Link>
                                        <Link href="/cart" className='flex flex-row gap-4'>
                                            <FaShoppingCart className="w-[30px] h-[30px] duration-300 hover:text-[#d4b60f]" />
                                            <span>Cart</span>
                                        </Link>
                                    </div>
                                    <div className='flex pb-10'>
                                        <SigninButton />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <IoMenu onClick={() => handleOpenMenu()} className='w-10 h-10 cursor-pointer'/>
                    }
                </div>
            }
        </div>
    )
}

export default NavbarItem