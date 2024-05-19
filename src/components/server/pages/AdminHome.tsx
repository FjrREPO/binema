'use client'

import "react-datepicker/dist/react-datepicker.css";
import { SafePayment } from "@/utils/types/safeData";
import { LineChart } from "../element/chart/LineChart";
import AdminNavbar from "../element/AdminNav";

const AdminHome = ({ payment }: { payment: SafePayment[] }) => {
    return (
        <>
            <AdminNavbar />
            <div className="flex w-full h-full mt-5 px-5">
                <div className="flex w-full h-full justify-center">
                    <div className="flex flex-col">
                        <h1>Halo ini Admin</h1>
                        <div className="flex w-full items-center">
                            <LineChart payment={payment}/>
                        </div>
                        {/* <div>
                            <Doughnut data={dataDoughnut} className="bg-white"/>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminHome;
