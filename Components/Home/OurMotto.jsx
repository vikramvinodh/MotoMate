import React from 'react'
import Image from 'next/image'
import motto from '../../public/Images/motto.png'

function OurMotto() {
    return (
        <section className='motto'>
            <div className="container">

                <div className="d-flex align-items-center">
                    <div className="col-lg-6">
                        <h2>
                            Our <span className='serv'>Motto</span>
                        </h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        <ul>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                            <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                        </ul>
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center align-items-center">
                        <Image src={motto} alt='-' />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurMotto