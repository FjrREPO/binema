'use client'

import { SafePaymentPromo } from "@/utils/types/safeData"
import axios from "axios";
import Link from "next/link"
import { useCallback } from "react";
import { FiEdit } from "react-icons/fi"
import { MdDeleteForever, MdPlaylistAdd } from "react-icons/md"
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function PaymentPromo({ paymentPromo }: { paymentPromo: SafePaymentPromo[] }) {
  const router = useRouter()

  const handleClickDelete = (id: string) => {
    onDeleted(id);
  };

  const onDeleted = useCallback(async (id: string) => {
    try {
      await Swal.fire({
        icon: 'warning',
        title: 'Warning',
        showDenyButton: true,
        text: 'Are you sure want to delete?',
      }).then(async (result) => {
        if (result.isConfirmed) {
          Swal.fire('Deleted succesfully!', '', 'success');
          await axios.delete(`/api/payment/paymentPromo/${id}`);
          router.refresh();
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } catch (error) {
      throw error
    }
  }, [router]);

  return (
    <div className="pt-5 items-center justify-center justify-items-center pb-5">
      <div className="mx-auto mt-8 max-w-screen-lg px-2">
        <div className="sm:flex sm:items-center sm:justify-between flex-col sm:flex-row">
          <p className="flex-1 text-base font-bold text-white">List Plan</p>

          <div className="mt-4 sm:mt-0">
            <div className="flex items-center justify-start sm:justify-end">
              <div className="flex items-center">
                <label className="mr-2 flex-shrink-0 text-sm font-medium text-white"> Sort by: </label>
                <select name=""
                  className="sm: mr-4 block w-full whitespace-pre rounded-lg border p-1 pr-10 text-base outline-none focus:shadow sm:text-sm">
                  <option className="whitespace-no-wrap text-sm">Recent</option>
                </select>
              </div>

              <a href="/admin/payment/paymentPromo/add" className="inline-flex cursor-pointer items-center rounded-lg border border-gray-400 bg-white py-2 px-3 text-center text-sm font-medium text-black shadow hover:bg-[#3B8AE5] hover:text-white duration-300 focus:shadow">
                <button type="button" className="flex flex-row gap-1 items-center">
                  <MdPlaylistAdd className="w-6 h-6" />
                  Tambah Data
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border shadow">
          <table className="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Kode Promo</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Harga</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Berlaku</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Kadaluarsa</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-white px-6">Aksi</td>
              </tr>
            </thead>
            <tbody className="lg:border-gray-300">
              {paymentPromo.map((payPromo: any, index: any) => {
                const dateUsable = new Date(payPromo.usable);
                const formattedDateUsable = dateUsable.toISOString().slice(0, 16);
                const dateExp = new Date(payPromo.expired);
                const formattedDateExp = dateExp.toISOString().slice(0, 16);

                return (
                  <tr className="" key={index}>
                    <td className="uppercase whitespace-no-wrap py-4 text-sm font-bold text-white px-6">
                      {payPromo.promoCode}
                    </td>
                    <td className="uppercase whitespace-no-wrap py-4 text-sm text-white px-6">
                      {payPromo.priceDisc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 table-cell">
                      <input
                        type="datetime-local"
                        className="text-white p-2 rounded-lg bg-gray-600"
                        value={formattedDateUsable}
                        disabled
                      />
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 table-cell">
                    <input
                        type="datetime-local"
                        className="text-white p-2 rounded-lg bg-gray-600"
                        value={formattedDateExp}
                        disabled
                      />
                    </td>
                    <td className="whitespace-no-wrap py-4 text-sm font-normal text-white px-6 lg:table-cell flex flex-row gap-5">
                      <Link className='bg-green-600 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center sm:mb-2' href={`/admin/payment/paymentPromo/${payPromo.id}/edit`}>
                        <button className='flex flex-row gap-2 items-center justify-center'>
                          <FiEdit className='w-5 h-5' />Edit
                        </button>
                      </Link>
                      <Link className='bg-red-600 px-5 py-2 rounded-lg flex flex-row gap-2 items-center justify-center' href={'#'}>
                        <button className='flex flex-row gap-2 items-center justify-center' onClick={() => handleClickDelete(payPromo.id)}>
                          <MdDeleteForever className='w-6 h-6' />Delete
                        </button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default PaymentPromo