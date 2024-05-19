'use client'

import AdminNavbar from "@/components/server/element/AdminNav";
import AdminHome from "@/components/server/pages/AdminHome";

const AdminPage = () => {

  return (
    <div className="bg-[#333] min-h-screen">
      <AdminNavbar />
      <AdminHome/>
    </div>
  );
};

export default AdminPage;
