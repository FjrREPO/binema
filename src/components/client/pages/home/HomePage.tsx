'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Thumbs } from 'swiper/modules';
import CarouselItem from '@/components/client/element/Carousel';
import SliderCard from '../../element/SliderCard';
import { SafeMovie, SafeUser } from '@/utils/types/safeData';
import { motion } from 'framer-motion';
import SwiperCore from 'swiper';
import debounce from 'lodash.debounce';

interface MoviesProps {
    movies: SafeMovie[];
    currentUser?: SafeUser | null;
}

const HomePage: React.FC<MoviesProps> = ({ movies, currentUser }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [visibleThumbnails, setVisibleThumbnails] = useState(9);

    const filteredMovies = movies.filter(movie => movie.category.includes('Popular Movies'));

    const mainSwiperRef = useRef<SwiperCore | null>(null);

    const setMainSwiperRef = (swiper: SwiperCore) => {
        if (swiper) {
            mainSwiperRef.current = swiper;
        }
    };

    const updateThumbnails = debounce(() => {
        const containerWidth = window.innerWidth;
        const thumbnailWidth = 120;
        const maxVisibleThumbnails = Math.min(9, Math.floor(containerWidth / thumbnailWidth));
        setVisibleThumbnails(maxVisibleThumbnails - 1);
    }, 300);

    useEffect(() => {
        updateThumbnails();

        window.addEventListener('resize', updateThumbnails);

        return () => {
            window.removeEventListener('resize', updateThumbnails);
        };
    }, []);

    const handleSlideChange = (swiper: SwiperCore) => {
        setCurrentImageIndex(swiper.realIndex);
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
        if (mainSwiperRef.current) {
            mainSwiperRef.current.slideToLoop(index);
        }
    };

    const getVisibleThumbnails = () => {
        const startIndex = Math.max(0, currentImageIndex - Math.floor(visibleThumbnails / 2));
        const endIndex = Math.min(filteredMovies.length, startIndex + visibleThumbnails);
        let visibleThumbnailsArray = [];

        for (let i = startIndex; i < endIndex && visibleThumbnailsArray.length < 9; i++) {
            visibleThumbnailsArray.push(i % filteredMovies.length);
        }

        if (!visibleThumbnailsArray.includes(currentImageIndex)) {
            visibleThumbnailsArray.pop();
        }

        return visibleThumbnailsArray;
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    };

    const getLastSegment = (url: any) => {
        const segments = url.split('/');
        return segments.pop();
    };

    return (
        <div>
            <Swiper
                onSwiper={setMainSwiperRef}
                modules={[Autoplay, EffectFade, Thumbs]}
                slidesPerView={1}
                autoplay={{
                    delay: 10000,
                    disableOnInteraction: false,
                }}
                effect={'fade'}
                loop={true}
                onSlideChange={handleSlideChange}
            >
                {filteredMovies.slice(0, 9).map(movie => (
                    <SwiperSlide key={movie.id}>
                        <CarouselItem movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 w-full">
                <div className="flex overflow-x-auto space-x-4 justify-center">
                    {getVisibleThumbnails().map((index) => {
                        if (index < 9) {
                            const movie = filteredMovies[index];
                            const formattedGenres = movie.genres.length > 1 ? movie.genres.join(', ') : movie.genres[0];
                            const isCurrentImage = currentImageIndex === index;
                            const lastSegmentBack = getLastSegment(movie.backdrop_path);
                            const lastSegmentPoster = getLastSegment(movie.poster_path);
                            return (
                                <motion.div
                                    key={movie.id}
                                    animate={{ x: 0 }}
                                    transition={{
                                        ease: "linear",
                                        duration: 1,
                                        x: { duration: 1 }
                                    }}
                                    className={`cursor-pointer ml-10 ${isCurrentImage ? 'opacity-100' : 'opacity-100'}`}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{
                                            opacity: 1,
                                            transitionEnd: { overflow: 'hidden' }
                                        }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 1 }}
                                        className="flex flex-row h-auto items-center-md rounded-lg gap-5"
                                    >
                                        <motion.img
                                            src={isCurrentImage ? `https://image.tmdb.org/t/p/w300/${lastSegmentBack}` : `https://image.tmdb.org/t/p/w154/${lastSegmentPoster}`}
                                            alt={movie.title}
                                            loading="lazy"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1, width: isCurrentImage ? 320 : 120 }}
                                            transition={{ duration: 0.6 }}
                                            className={`rounded-lg ${isCurrentImage ? 'w-[320px] h-[120px] md:h-[180px]' : 'w-[120px] h-[120px] md:h-[180px]'}`}
                                        />
                                        {isCurrentImage && (
                                            <div className='absolute w-full h-full backdrop-brightness-75'>
                                                <span className='absolute bottom-10 left-5 text-md font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'>
                                                    {truncateText(movie.title, 20)}
                                                </span>
                                                <span className='absolute bottom-5 left-5 text-sm font-normal overflow-hidden whitespace-nowrap overflow-ellipsis'>
                                                    {truncateText(formattedGenres, 25)}
                                                </span>
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            );
                        } else {
                            <></>
                        }
                    })}
                </div>
            </div>
            <SliderCard movies={movies} currentUser={currentUser} />
        </div>
    );
};

export default HomePage;
