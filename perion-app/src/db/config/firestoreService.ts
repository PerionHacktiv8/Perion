import { db } from '../config/firebaseConfig';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    Timestamp,
    where,
    doc,
    setDoc,
    getDoc,
    getDocs,
} from 'firebase/firestore';

const messagesCollection = collection(db, 'messages');
const roomsCollection = collection(db, 'rooms');
const usersCollection = collection(db, 'users');

export type Room = {
    id: string;
    userIds: string[];
    createdAt: Timestamp;
};

export type Message = {
    id: string;
    roomId: string;
    userId: string;
    email: string;
    photoURL: string;
    text: string;
    createdAt: string;
};

export type UserProfile = {
    uid: string;
    email: string | null;
    photoURL: string | null;
    createdAt: Timestamp;
};

export const createRoom = async (): Promise<string> => {
    const roomQuery = query(roomsCollection, where('userCount', '<', 2));
    const querySnapshot = await getDocs(roomQuery);
    const availableRoom = querySnapshot.docs.find(doc => doc.data().userCount < 2);
    if (availableRoom) {
        await setDoc(doc(roomsCollection, availableRoom.id), { userCount: 2 }, { merge: true });
        return availableRoom.id;
    } else {
        const newRoomRef = await addDoc(roomsCollection, {
            userCount: 1,
            createdAt: Timestamp.now(),
        });
        return newRoomRef.id;
    }
};

export const sendMessage = async (roomId: string, userId: string, text: string, email: string, photoURL: string) => {
    await addDoc(messagesCollection, {
        roomId,
        userId,
        email,
        photoURL,
        text,
        createdAt: Timestamp.now(),
    });
};

export const onRoomUpdate = (userId: string, callback: (rooms: Room[]) => void) => {
    const q = query(roomsCollection, where('userIds', 'array-contains', userId));
    return onSnapshot(q, (snapshot) => {
        const rooms = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Room[];
        callback(rooms);
    });
};

export const onMessageUpdate = (roomId: string, callback: (messages: Message[]) => void) => {
    const q = query(messagesCollection, where('roomId', '==', roomId), orderBy('createdAt', 'asc'));
    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate().toISOString(),
        })) as Message[];
        callback(messages);
    });
};

export const getUserProfiles = async (userIds: string[]): Promise<UserProfile[]> => {
    return Promise.all(
        userIds.map(async (userId) => {
            const docRef = doc(usersCollection, userId);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
        })
    );
};
