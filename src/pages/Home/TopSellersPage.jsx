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

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellersPage = () => {

    // const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    // useEffect(() => {
    //     fetch("/books.json")
    //     .then(res => res.json())
    //     .then((data) => setBooks(data))
    // }, [])

    // console.log(books)

    // Fetch books from API
    const { data, isLoading, isError } = useFetchAllBooksQuery();

    // Ensure books is always an array
    const books = Array.isArray(data?.books) ? data.books : [];
  
    // Handle loading and error states
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading books. Please try again later.</p>;
  
    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())


    // console.log(filteredBooks);
    
  return (
    <div className='py-10'>
        <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
        {/* Category Filtering */}
        <div className='mb-8 flex items-center'>
            <select onChange={(e) => setSelectedCategory(e.target.value)}
            name='category' id='category' className='border bg-[#EAEAEA] 
            border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                {
                    categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>

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
                   filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard  book={book} />
                        </SwiperSlide>
                    ))
                }
        </Swiper>

    </div>
  )
}

export default TopSellersPage;