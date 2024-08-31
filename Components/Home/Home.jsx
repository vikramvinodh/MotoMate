import React from 'react'
import HomeBanner from './HomeBanner'
import Navbar from './Navbar'
import OurServices from './OurServices'
import OurMotto from './OurMotto'
import Know from './Know'
import Footer from './Footer'

function Home() {
    return (
        <>
            <Navbar />
            <HomeBanner />
            <OurServices />
            <OurMotto />
            <Know />
            <Footer />
        </>
    )
}

export default Home