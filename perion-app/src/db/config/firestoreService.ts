import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, addDoc, query, orderBy, Timestamp } from 'firebase/firestore';

const messagesCollection = collection(db, 'messages');

type message = {
    id: string;
    text: string;
    name: string;
    uid: string;
    email: string;
    photoURL: string;
    createdAt: string;
};

export const sendMessage = async (message: { name: string, text: string, uid: string, photoURL: string, email: string }) => {
    await addDoc(messagesCollection, {
        ...message,
        createdAt: Timestamp.fromDate(new Date()) // Use Firestore Timestamp
    });
};

export const onMessageUpdate = (callback: (messages: message[]) => void) => {
    const q = query(messagesCollection, orderBy('createdAt', 'asc')); // Order by ascending
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toLocaleString() // Convert Timestamp to string
        }) as message);
        callback(messages);
    });
};
