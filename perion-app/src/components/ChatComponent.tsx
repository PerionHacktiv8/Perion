// components/ChatComponent.tsx
"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/authContext';
import { sendMessage, onMessageUpdate } from '../db/config/firestoreService';
import Image from 'next/image';

type Message = {
    id: string;
    text: string;
    uid: string;
    email: string;
    photoURL: string;
    createdAt: Date;
};

const ChatComponent: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = onMessageUpdate((newMessages) => {
            setMessages(newMessages);
        });
        return () => unsubscribe();
    }, []);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                await sendMessage({
                    text: newMessage,
                    uid: currentUser?.uid || 'unknown',
                    email: currentUser?.email || 'unknown',
                    photoURL: currentUser?.photoURL || 'default-photo-url',
                    createdAt: new Date()
                });
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            {/* Chat messages display */}
            <div className='flex flex-col gap-2 p-4 bg-gray-200 rounded-lg h-96 overflow-y-scroll'>
                {messages.map((message) => (
                    <div className='bg-gray-100 p-3 rounded-lg' key={message.id}>
                        <p>{message.email}</p>
                        <Image src={message.photoURL} alt="Profile" width={50} height={50} />
                        <p>{message.text}</p>
                    </div>
                ))}
            </div>

            {/* Message input */}
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
