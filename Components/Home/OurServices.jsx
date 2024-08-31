import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import img1 from '../../public/Images/pr.svg';
import img2 from '../../public/Images/ai.svg';
import img3 from '../../public/Images/em.svg';
import img4 from '../../public/Images/serv.svg';
import img5 from '../../public/Images/tr.svg';
import img6 from '../../public/Images/ma.svg';
import { Modal, Button } from 'react-bootstrap';

function OurServices() {
    const [showModal, setShowModal] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [location, setLocation] = useState('');

    const services = [
        { id: 1, title: 'Products', img: img1, link: '/products' },
        { id: 2, title: 'Maps', img: img6, link: '/twousersnavigation' },
        { id: 3, title: 'Service Centers', img: img4, link: '/garages' },
        { id: 4, title: 'Coneect.ai', img: img2, link: '/chat' },
        { id: 5, title: 'Translate', img: img5, link: '/translate' },
        { id: 6, title: 'Emergency SOS', img: img3, onClick: () => handleEmergencySOSClick() },
    ];

    const handleEmergencySOSClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
                setShowModal(true);
            });
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };

    const sendEmergencyEmail = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/sendEmergencyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: recipientEmail,
                    message: `This is an emergency SOS message! Location: ${location}`, // Include location in the message
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert('Emergency SOS email sent successfully!');
                setShowModal(false);
            } else {
                alert('Failed to send SOS email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('An error occurred while sending the email.');
        }
    };

    return (
        <section className='ourservices'>
            <div className="container">
                <h2>Our <span className='serv'>Services</span></h2>
                <div className="servicecards">
                    {services.map((service) => (
                        <div key={service.id}>
                            {service.title === 'Emergency SOS' ? (
                                <div className="servicecard" onClick={service.onClick}>
                                    <Image src={service.img} alt={service.title} className='mb-4' />
                                    <p className='m-0'>{service.title}</p>
                                </div>
                            ) : (
                                <Link href={service.link}>
                                    <div className="servicecard">
                                        <Image src={service.img} alt={service.title} className='mb-4' />
                                        <p className='m-0'>{service.title}</p>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Bootstrap Modal for Email Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)} className='modal'>
                <Modal.Header closeButton>
                    <Modal.Title >Send Emergency SOS Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={sendEmergencyEmail}>
                        <div className="mb-3">
                            <label htmlFor="recipientEmail" className="form-label">Recipient Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="recipientEmail"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className="form-label">Location:</label>
                            <textarea
                                className="form-control"
                                id="location"
                                value={location}
                                readOnly
                            />
                        </div>
                        <Button variant="primary" type="submit">
                            Send Email
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default OurServices;
