import React from 'react'
import Image from 'next/image'
import www from '../../public/Images/www.png'
import chat from '../../public/Images/chat.png'
import del from '../../public/Images/del.png'
import loc from '../../public/Images/loc.png'

function Know() {
    return (
        <section className='knowmore'>
            <div className="container">
                <h2>Know <span className="serv">More</span></h2>
                <div className="know1 d-flex justify-content-between align-items-center">
                    <div className="image"><Image src={loc} alt='-' /></div>
                    <div>
                        <h3>Connecting Through Live <span className="serv">Map</span></h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    </div>
                </div>
                <div className="know1 d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Real Time <span className="serv">Chat Bot</span></h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    </div>
                    <div className="image"><Image src={chat} alt='-' /></div>
                </div>
                <div className="know1 d-flex justify-content-between align-items-center">
                    <div className="image"><Image src={del} alt='-' /></div>
                    <div>
                        <h3>Trending <span className="serv">Accessories</span> for your MotorCycle. </h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    </div>
                </div>
                <div className="know1 d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Many <span className="serv">More</span> </h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    </div>
                    <div className="image"><Image src={www} alt='-' /></div>
                </div>
            </div>


        </section>
    )
}

export default Know