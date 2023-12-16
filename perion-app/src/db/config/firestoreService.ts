import { db } from '../config/firebaseConfig';
import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore';

const messagesCollection = collection(db, 'messages');

type message = {
    id: string;
    text: string;
    uid: string;
    email: string;
    photoURL: string;
    createdAt: Date;
};

export const sendMessage = async (message: { text: string, uid: string, photoURL: string, email: string, createdAt: Date }) => {
    await addDoc(messagesCollection, { ...message, createdAt: new Date() });
};

export const onMessageUpdate = (callback: (messages: message[]) => void) => {
    const q = query(messagesCollection, orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as message));
        callback(messages);
    });
};
