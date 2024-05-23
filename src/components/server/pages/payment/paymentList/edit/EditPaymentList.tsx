'use client'

import { SafePayment } from '@/utils/types/safeData'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

function EditPaymentList({ payment }: { payment: SafePayment }) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, reset, register, setValue, watch, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            userName: payment.userName,
            userEmail: payment.userEmail,
            startTime: payment.startTime,
            endTime: payment.endTime,
            feeAdmin: payment.feeAdmin,
            price: payment.price,
            totalPrice: payment.totalPrice,
            packageName: payment.packageName,
            methodPayment: payment.methodPayment,
            promoCode: payment.promoCode,
            status: payment.status,
            room: payment.room,
            expiredPayment: payment.expiredPayment
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);

        try {
            console.log(data)
            await fetch("/api/email", {
                method: "POST",
                body: JSON.stringify({
                    //to: payment.userEmail,
                    to: 'jossfajar27@gmail.com',
                    subject: 'Binema',
                    //from: process.env.FROM_EMAIL,
                    from: 'onboarding@resend.dev',
                    payment: payment
                }),
            });
            await axios.put(`/api/payment/paymentList/${payment.id}`, data);

            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Movie added successfully!',
            });
            router.push('/admin/payment');
            router.refresh();
            reset();
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something wrong!',
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col p-5 justify-center items-center gap-5 h-fit">
                    <h1 className="flex justify-center text-lg">Pilih Status:</h1>
                    <Select
                        id="select-box"
                        options={[
                            { value: "pending", label: "Pending" },
                            { value: "success", label: "Success" },
                            { value: "canceled", label: "Canceled" },
                        ]}
                        defaultValue={{ value: payment.status, label: payment.status }}
                        onChange={(selectedOption) => setValue("status", selectedOption?.value)}
                        formatOptionLabel={(option) => (
                            <div className="flex flex-row items-center gap-3 text-black duration-300">
                                <div>{option.label}</div>
                            </div>
                        )}
                        classNames={{
                            control: () => "p-3 border-2",
                            input: () => "text-lg w-[200px]",
                            option: () => "text-lg",
                        }}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 6,
                            colors: {
                                ...theme.colors,
                                primary: "#ffe4e6",
                                primary25: "#ffe4e6",
                            },
                        })}
                    />
                    <button
                        type='submit'
                        className='flex text-black bg-white px-5 py-2 rounded hover:text-white hover:bg-[#333] duration-300'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPaymentList