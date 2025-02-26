import React from 'react'
import Banner from './Banner'
import Recommened from './Recommened'
import News from './News'
import TopSellersPage from './TopSellersPage'

const Home = () => {
  return (
    <>
        <Banner/>
        <TopSellersPage/>
        <Recommened/>
        <News/>
    </>
  )
}

export default Home