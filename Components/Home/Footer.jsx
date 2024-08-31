"use client"
import React from 'react';
import Image from 'next/image';
import footerImage from '../../public/Images/footer.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

function Footer() {
    // const footer = useSelector(state => state.footer.footer);
    // if(!footer){
    //     <Loading />
    // }
    const plantoken = [
        { name: 'Team Building Activities' },
        { name: 'Customized Team Offsites' },
        { name: 'Book Resorts' },
        { name: 'Trip Co-ordinator' },
        { name: 'Conferences' },
        { name: 'Food & Beverages' },
        { name: 'Product Launch' },
        { name: 'Theme Parties' },
        { name: 'Game Nights' },
        { name: 'Sports Events' },
    ];

    const socialLinks = [
        { label: 'Facebook', link: 'https://www.facebook.com/teamtrip.co.in' },
        { label: 'X', link: 'https://x.com/teamtriphq' },
        { label: 'Linkedin', link: 'https://www.linkedin.com/company/teamtrips/' },
        { label: 'Instagram', link: 'https://www.instagram.com/teamtrip.co.in/' }
    ];

    const swiperRef = React.useRef(null);
    return (
        <section className='footer'>
            <div className="container">
                <div className='image-sec'>
                    <div className="d-flex justify-content-center align-content-center ">
                        <Image src={footerImage} alt='-' width={1000} />
                    </div>
                    <div className="d-flex justify-content-center align-content-center">
                        <div className="plan">
                            <h1>Get To Us</h1>
                            <p>Take charge of your next Offsite.</p>
                            <Swiper
                                ref={swiperRef}
                                slidesPerView={4}
                                navigation={false} // Disable default navigation// Ensure pagination is clickable
                                autoplay={{ delay: 1000, disableOnInteraction: false }} // Add autoplay with delay
                                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                                loop={true}// Register the modules
                                breakpoints={{
                                    // when window width is >= 320px
                                    320: {
                                        slidesPerView: 1,
                                        spaceBetween: 10,
                                    },
                                    // when window width is >= 480px
                                    480: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 3,
                                        spaceBetween: 30,
                                    },
                                    // when window width is >= 768px
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 10,
                                    },
                                }}
                            >
                                {plantoken.map((token, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="tokens">
                                            <span className='token'>{token.name}</span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="d-flex justify-content-center align-items-center" key="contact-link">
                                <Link href="/contact-us"key="contact-links" >
                                    <button key="contact-linked"  className="orangebtn">Get now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-sec">
                <div className="container">
                    <div className="mt-5 d-flex justify-content-evenly mb-4 footersec ">
                        <div className="logo ">
                            <p className='mt-3 text-justify'>We provide a one stop solution for all corporate offsite, events and team-outings - International & domestic. We curate experiences personalised to every company&apos;s need.</p>
                            <div className="d-flex justify-content-between align-items-center">
                                {socialLinks.map((ele) => (
                                    <a key={ele.id} href={ele.link} target="__blank" rel="nofollow" className="footer-icon">
                                        {(() => {
                                            switch (ele.label) {
                                                case 'Facebook':
                                                    return <FaFacebook size={30} />;
                                                case 'X':
                                                    return <FaTwitter size={30} />;
                                                case 'Linkedin':
                                                    return <FaLinkedinIn size={30} />;
                                                case 'Instagram':
                                                    return <FaInstagram size={30} />;
                                                default:
                                                    return null;
                                            }
                                        })()}
                                    </a>
                                ))}
                            </div>

                        </div>
                        <div className="col-lg-2 col-sm-12 col-6">
                            <div className="footer">
                                <h4>Resources</h4>
                                <Link href={"/outing"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Outings</p>
                                </Link>
                                <Link href={"/explore"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Stays</p>
                                </Link>
                                <Link href={"/"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Event & Programs</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-12 col-6">
                            <div className="footer">
                                <h4>Company</h4>
                                <Link href={"/about-us"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">About Us</p>
                                </Link>
                                <Link href={"/contact-us"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Contact Us</p>
                                </Link>
                                <Link href={"/explore"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Explore</p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-2 col-sm-12 col-6">
                            <div className="footer">
                                <h4>Refferal Links</h4>
                                <Link href={"/terms-and-conditions"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Terms & Conditions</p>
                                </Link>
                                <Link href={"/privacy-policy"} key={"/"} rel="nofollow" className="p-0 m-0 footer-link">
                                    <p className=" my-2">Privacy Policy</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center ">
                        <div>
                            <hr width={1100} className='hr' />
                            <center className='copy'>Copyright © MotoMate | Designed and Developed by Lahari R</center>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
