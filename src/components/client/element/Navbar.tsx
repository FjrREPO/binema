import SearchBox from "@/components/client/element/SearchBox";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getAllPayment } from "@/utils/actions/get-all-payment";
import getCurrentUser from "@/utils/actions/get-current-user";
import NavbarItem from "./property/NavbarItem";

const Navbar = async () => {
    const [session, payment, currentUser] = await Promise.all([
        getServerSession(authOptions),
        getAllPayment(),
        getCurrentUser()
    ]);

    const paymentUserId = payment.filter((pay: any) => pay.userId === currentUser?.id);
    const successfulPayments = payment.filter(pay => pay.status === 'success');

    return (
        <div className="absolute inset-0 z-30 h-fit">
            <div className="flex flex-row w-full justify-between py-5 px-7 items-center"
                style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                }}
            >
                <div className="flex">
                    <img 
                        src="https://res.cloudinary.com/dutlw7bko/image/upload/v1716618897/Cinema/Logo/Cuplikan_layar_2024-05-14_083355_jr8lu6_1_wc2vsh.png" 
                        className="w-[60px] rounded-lg h-full" 
                        alt="Cinema Logo" 
                    />
                </div>
                <NavbarItem pay={successfulPayments} paymentUserId={paymentUserId} />
            </div>
            <div className="flex flex-row block w-full justify-between px-5 pb-5 pt-3"
                style={{
                    backgroundColor: 'rgba(128, 128, 128, 0.2)',
                }}
            >
                <div className="flex">
                    <ul className="flex flex-row items-center gap-2">
                        <li
                            className="navbar__li rounded-lg"
                            style={{
                                backdropFilter: 'blur(8px)',
                                backgroundColor: 'rgba(128, 128, 128, 0.4)',
                            }}
                        >
                            <a href="/about" className="p-[10px]">About</a>
                        </li>
                        {session?.user.role === 'admin' && (
                            <li
                                className="navbar__li rounded-lg"
                                style={{
                                    backdropFilter: 'blur(8px)',
                                    backgroundColor: 'rgba(128, 128, 128, 0.4)',
                                }}
                            >
                                <a href="/admin" className="p-[10px]">Admin</a>
                            </li>
                        )}
                    </ul>
                </div>
                <SearchBox />
            </div>
        </div>
    );
};

export default Navbar;
