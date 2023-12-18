import { firestore } from '../config/firebaseConfig';
import {
    collection, addDoc, query, orderBy, onSnapshot, where, getDocs, doc, updateDoc, arrayUnion, Timestamp
} from 'firebase/firestore';

export interface Room {
    id: string;
    name: string;
    userIds: string[];
    typing?: Record<string, boolean>;
}

export interface Message {
    id: string;
    roomId: string;
    userId: string;
    text: string;
    createdAt: Date;
}

export const roomsCollection = collection(firestore, 'chatRooms');
export const messagesCollection = collection(firestore, 'chatMessages');

export const getChatRooms = async (userId: string): Promise<Room[]> => {
    try {
        const q = query(roomsCollection, where('userIds', 'array-contains', userId));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Room));
    } catch (error) {
        console.error("Error fetching chat rooms:", error);
        return [];
    }
};

export const postMessage = async (roomId: string, userId: string, text: string): Promise<void> => {
    try {
        await addDoc(messagesCollection, {
            roomId,
            userId,
            text,
            createdAt: Timestamp.now()
        });
    } catch (error) {
        console.error("Error posting message:", error);
    }
};

export const subscribeToChat = (roomId: string, callback: (messages: Message[]) => void) => {
    const q = query(messagesCollection, where('roomId', '==', roomId), orderBy('createdAt'));
    return onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        callback(messages);
    });
};

export const createOrJoinRoom = async (name: string, userId: string): Promise<string | null> => {
    try {
        const q = query(roomsCollection, where('userIds', 'not-in', [[userId]]));
        const snapshot = await getDocs(q);
        let availableRoom: any = null;

        snapshot.forEach(doc => {
            if (doc.data().userIds.length < 2) {
                availableRoom = doc;
            }
        });

        if (availableRoom) {
            const roomId = availableRoom.id;
            await updateDoc(doc(firestore, 'chatRooms', roomId), {
                userIds: arrayUnion(userId)
            });
            return roomId;
        } else {
            const roomRef = await addDoc(roomsCollection, {
                name,
                userIds: [userId]
            });
            return roomRef.id;
        }
    } catch (error) {
        console.error("Error creating or joining room:", error);
        return null;
    }
};

export const setTypingStatus = async (roomId: string, userId: string, isTyping: boolean): Promise<void> => {
    const roomRef = doc(firestore, 'chatRooms', roomId);
    await updateDoc(roomRef, {
        [`typing.${userId}`]: isTyping
    });
};

export const subscribeToTyping = (roomId: string, callback: (typing: Record<string, boolean>) => void) => {
    const roomRef = doc(firestore, 'chatRooms', roomId);
    return onSnapshot(roomRef, snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            callback(data.typing as Record<string, boolean>);
        }
    });
};
