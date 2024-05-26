'use client'

import { useState } from "react";
import { MdHome } from "react-icons/md";
import { FaHome, FaPlay } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

import SigninButton from "@/components/global/SigninButton";
import AdminHome from "../pages/AdminHome";
import AdminPayment from "../pages/payment/AdminPayment";
import AdminMovie from "../pages/movie/AdminMovie";

const AdminNavbar = ({ payment, paymentPlan, paymentCard, paymentPromo, movie, formattedMovies }: { payment: any, paymentPlan: any, paymentCard: any, paymentPromo: any, movie: any, formattedMovies: any }) => {
    const [currentMenu, setCurrentMenu] = useState('home');
    return (
        <>
            <nav className={`bg-[#222] flex max-w-full z-40 top-0 shadow px-5 lg:px-10`}>
                <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-5 pb-3 md:pb-0">
                    <div className="w-2/5 pl-2 md:pl-0">
                        <a className={`text-white text-base xl:text-xl no-underline hover:no-underline font-bold`} href="/admin">
                            Admin BC
                        </a>
                    </div>
                    <div className="w-3/5 pr-0">
                        <div className="flex relative inline-block items-center float-right gap-3">
                            <a href="/">
                                <FaHome className="flex w-8 h-8 hover:text-blue-400 duration-300 cursor-pointer" />
                            </a>
                            <SigninButton />
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center block mt-2 bg-${GRAY_COLOR} z-20" id="nav-content">
                        <ul className="list-reset flex items-center px-0">
                            <li className="mr-4 my-2 md:my-0 cursor-pointer">
                                <div
                                    className={`block py-1 md:py-3 pl-1 align-middle no-underline border-b-2 duration-300 cursor-pointer'
                                        ${currentMenu === 'home' ? 'border-blue-400 text-blue-400' : 'text-gray-500 border-gray-500 hover:text-white hover:border-white'}`}
                                    onClick={() => setCurrentMenu('home')}
                                >
                                    <i className="flex mr-3 not-italic gap-2 items-center">
                                        <MdHome className="w-6 h-6" />
                                        <span className="pb-1 md:pb-0 text-sm">Home</span>
                                    </i>
                                </div>
                            </li>
                            <li className="mr-4 my-2 md:my-0 cursor-pointer">
                                <div
                                    className={`block py-1 md:py-3 pl-1 align-middle no-underline border-b-2 duration-300 cursor-pointer'
                                        ${currentMenu === 'movie' ? 'border-pink-400 text-pink-400 ' : 'text-gray-500 border-gray-500 hover:text-white hover:border-white'}`}
                                    onClick={() => setCurrentMenu('movie')}
                                >
                                    <i className="flex mr-3 not-italic gap-2 items-center">
                                        <FaPlay className="w-4 h-4" />
                                        <span className="pb-1 md:pb-0 text-sm">Movie</span>
                                    </i>
                                </div>
                            </li>
                            <li className="my-2 md:my-0 cursor-pointer">
                                <div
                                    className={`block py-1 md:py-3 pl-1 align-middle no-underline border-b-2 duration-300 cursor-pointer'
                                        ${currentMenu === 'payment' ? 'border-green-400 text-green-400' : 'text-gray-500 border-gray-500 hover:text-white hover:border-white'}`}
                                    onClick={() => setCurrentMenu('payment')}
                                >
                                    <i className="flex mr-3 not-italic gap-2 items-center">
                                        <FaDollarSign className="w-5 h-5" />
                                        <span className="pb-1 md:pb-0 text-sm">Payment</span>
                                    </i>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {currentMenu === 'home' && <AdminHome payment={payment} />}
            {currentMenu === 'payment' && <AdminPayment paymentPlan={paymentPlan} paymentCard={paymentCard} paymentPromo={paymentPromo} payment={payment} movie={movie} />}
            {currentMenu === 'movie' && <AdminMovie movies={formattedMovies} />}
        </>
    );
};

export default AdminNavbar;