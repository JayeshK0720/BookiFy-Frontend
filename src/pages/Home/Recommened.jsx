import React from 'react'
import { useState, useEffect } from 'react';
import BookCard from '../books/BookCard';

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import required modules
import { Pagination , Navigation } from 'swiper/modules';

// Import swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';



const Recommened = () => {

    // const [books, setBooks] = useState([]);
    // useEffect(() => {
    //     fetch("/books.json")
    //         .then(res => res.json())
    //         .then((data) => setBooks(data))
    // }, [])

// Fetch books from API
    const { data, isLoading, isError } = useFetchAllBooksQuery();

    // Ensure books is always an array
    const books = Array.isArray(data?.books) ? data.books : [];
  
    // Handle loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading books. Please try again later.</p>;

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommened For You</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    books.length > 0 && books.slice(8,18).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}

export default Recommened;