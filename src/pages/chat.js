import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navbar from '../../Components/Home/Navbar';
import send from '../../public/send.png';

const API_KEY = 'AIzaSyAFWerh2mAyvxRAavmqlMP8M1wwP-39_Ow'; 
const genAI = new GoogleGenerativeAI(API_KEY);

export default function Gemini({ handleBackPress }) {
    const scrollRef = useRef();
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        try {
            setLoading(true);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const chat = model.startChat();
            const result = await chat.sendMessage(query);
            const response = result.response;
            if (response) {
                const text = await response?.text();
                const newQuestion = { question: query, answer: text };
                setMessages([...messages, newQuestion]);
                scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
            }
            setQuery('');
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setQuery('');
            alert(`Error: ${err}`);
        }
    };

    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="container1">
                    <div className="header">
                        <div className="heading-container">
                            <h2 className="heading text-center mt-5">Connect.Ai</h2>
                        </div>
                    </div>
                </div>
                <div className="container2">
                    <div className="messages" ref={scrollRef}>
                        {messages.length > 0 &&
                            messages.map((msg, index) => (
                                <div key={index} className="list-wrapper">
                                    <div className="list-question-style text-right">
                                        <p className="list-text-style user-message">{msg.question}</p>
                                    </div>
                                    <div className="list-style text-left">
                                        <p className="list-text-style ai-response">{msg.answer}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="bottom-wrapper d-flex justify-content-center align-items-center">
                        <textarea
                            className="bottom-text-input"
                            placeholder="Type message here"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            disabled={loading}
                        />
                        {loading ? (
                            <div className="bottom-wrapper-button">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            <button className="bottom-wrapper-button" onClick={handleSend}>
                                <Image src={send} alt="Send" width={120} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
