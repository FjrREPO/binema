"use client";
import { useState } from 'react'
import Parallax from './Parallax'
import { AnimatePresence, motion } from 'framer-motion';


const About = () => {
    const [visibleAnswer, setVisibleAnswer] = useState(null);

    const toggleAnswer = (index: any) => {
        setVisibleAnswer(visibleAnswer === index ? null : index);
    };
    const faqs = [
        { question: "Dimanakah Lokasi Bioskopnya", answer: "Lokasi bioskop berada di Jalan Raya Cempaka Utara no 13 Sambilegi Lor Maguwoharjo Sleman." },
        { question: "Apakah Bisa Membayar Dengan Uang Cash", answer: "Tentu bisa dengan uang cash,tetapi anda harus datang langsung ke tempat kami." },
        { question: "Apakah Bisa Memesan Beberapa Ruang Sekaligus", answer: "Iya bisa.Kami menyediakan fitur untuk memesan beberapa ruang bioskop sekaligus." }
    ];
    return (
        <div >
            <Parallax />
            <div className="bg-gray-900 text-gray-300">
                <section className="bg-gray-900 text-gray-300">

                    <section className="text-center py-12 px-4">
                        <h2 className="text-2xl font-bold text-white">Profil kami</h2>
                        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                            Binema adalah website penyedia layanan pemesanan ruang bioskop secara online agar memdudahkan pelanggan untuk memesan ruang bioskop.
                        </p>
                        <div className="flex justify-center space-x-8 mt-8 animate-fadeIn">
                            <div className="transition transform hover:scale-110">
                                <h3 className="text-xl font-bold text-white">18</h3>
                                <p className="text-blue-400">Ruang</p>
                            </div>
                            <div className="transition transform hover:scale-110">
                                <h3 className="text-xl font-bold text-white">3</h3>
                                <p className="text-blue-400">Pilihan Paket</p>
                            </div>
                            <div className="transition transform hover:scale-110">
                                <h3 className="text-xl font-bold text-white">500+</h3>
                                <p className="text-blue-400">Pilihan Film</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-800 text-white py-12 px-4">
                        <h2 className="text-2xl font-bold text-center">Misi kami</h2>

                        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                            <div className="bg-gray-700 rounded-lg shadow-md p-4">
                                <h3 className="text-lg text-blue-400 font-semibold">Memantau Penjualan dan Stok Tiket</h3>
                                <p className="mt-2 text-gray-300">
                                    Bioskop dapat dengan mudah memantau penjualan tiket dan mengelola stok tiket secara efektif.
                                </p>
                            </div>

                            <div className="bg-gray-700 rounded-lg shadow-md p-4">
                                <h3 className="text-lg text-blue-400 font-semibold">Meningkatkan Kepuasan Pelanggan</h3>
                                <p className="mt-2 text-gray-300">
                                    Membantu bioskop dalam meningkatkan kepuasan pelanggan dengan memberikan informasi yang akurat dan up-to-date tentang jadwal tayang film dan penjualan tiket.
                                </p>
                            </div>

                            <div className="bg-gray-700 rounded-lg shadow-md p-4">
                                <h3 className="text-lg text-blue-400 font-semibold">Memudahkan Transaksi Online</h3>
                                <p className="mt-2 text-gray-300">
                                    Memudahkan pelanggan dalam melakukan transaksi online tanpa harus mengantri di loket penjualan tiket.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>



                <section className="text-center flex flex-col w-full items-center py-12 px-4">
                    <h2 className="text-2xl font-bold text-white">Pilihan Paket</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-8 mt-8">
                        <div className="p-4 shadow-lg rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <h3 className="text-xl font-bold text-white">REGULER</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <h3 className="text-xl font-bold text-white">VIP</h3>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                            <h3 className="text-xl font-bold text-white">VVIP</h3>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-800 text-gray-300 py-12 px-4">
                    <h2 className="text-2xl font-bold text-center text-white">Fasilitas Yang Didapat</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto">
                        <div className="p-4 shadow-lg rounded-lg bg-gray-700 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-white">REGULAR</h3>
                            <p className="text-gray-400 mt-2">Tv 50 inch, fasilitas untuk 6 orang</p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-gray-700 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-white">VIP</h3>
                            <p className="text-gray-400 mt-2">Tv 55 inch, fasilitas untuk 8 orang</p>
                        </div>
                        <div className="p-4 shadow-lg rounded-lg bg-gray-700 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-white">VVIP</h3>
                            <p className="text-gray-400 mt-2">Tv 60 inch , fasilitas untuk 10 orang</p>
                        </div>
                    </div>
                </section>

                <section className="text-center py-12 px-4 w-full">
                    <h2 className="text-2xl font-bold text-white">Tanya Jawab Umum</h2>
                    <div className="mt-8">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                onClick={() => toggleAnswer(index)}
                                className="p-4 border border-gray-700 rounded-lg shadow-md transition transform hover:scale-100 scale-90 mt-4 bg-gray-800 cursor-pointer"
                            >
                                <h3 className="text-xl font-bold text-white">{faq.question}</h3>
                                <AnimatePresence>
                                    {visibleAnswer === index && (
                                        <motion.p
                                            className="mt-2 text-gray-400"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {faq.answer}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="bg-gray-800 text-white text-center py-8">
                    <p>&copy; Copyright Binema. All rights reserved</p>
                </footer>
            </div>
        </div>
    )
}

export default About