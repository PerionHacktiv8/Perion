// Importing necessary libraries and components
import React, { useState, useEffect, useCallback, useRef } from 'react'
import { authN, firestore } from '../config/firebaseConfig'
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  Timestamp,
  getDoc,
} from 'firebase/firestore'

// Interface definitions
export interface Room {
  id: string
  name: string
  userIds: string[]
  typing?: Record<string, boolean>
}

export interface Message {
  id: string
  roomId: string
  userId: string
  text: string
  createdAt: Date
}

interface UserDetails {
  [key: string]: {
    displayName: string
    photoURL: string
  }
}

// Firestore collections
export const usersCollection = collection(firestore, 'users')
export const roomsCollection = collection(firestore, 'chatRooms')
export const messagesCollection = collection(firestore, 'chatMessages')

// Firestore service functions
export const getChatRooms = async (user1: string): Promise<Room[]> => {
  const q = query(roomsCollection, where('userIds', 'array-contains', user1))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Room)
}

export const postMessage = async (
  roomId: string,
  userId: string,
  text: string,
): Promise<void> => {
  await addDoc(messagesCollection, {
    roomId,
    userId,
    text,
    createdAt: Timestamp.now(),
  })
}

export const subscribeToChat = (
  roomId: string,
  callback: (messages: Message[]) => void,
) => {
  const q = query(
    messagesCollection,
    where('roomId', '==', roomId),
    orderBy('createdAt'),
  )
  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Message,
    )
    callback(messages)
  })
}

export const createOrJoinRoom = async (
  name: string,
  userId: string,
): Promise<string | null> => {
  const q = query(roomsCollection, where('userIds', 'not-in', [[userId]]))
  const snapshot = await getDocs(q)
  let availableRoom = snapshot.docs.find((doc) => doc.data().userIds.length < 2)
  if (availableRoom) {
    const roomId = availableRoom.id
    await updateDoc(doc(firestore, 'chatRooms', roomId), {
      userIds: arrayUnion(userId),
    })
    return roomId
  } else {
    const roomRef = await addDoc(roomsCollection, {
      name,
      userIds: [userId],
    })
    return roomRef.id
  }
}

export const setTypingStatus = async (
  roomId: string,
  userId: string,
  isTyping: boolean,
): Promise<void> => {
  const roomRef = doc(firestore, 'chatRooms', roomId)
  await updateDoc(roomRef, {
    [`typing.${userId}`]: isTyping,
  })
}

export const subscribeToTyping = (
  roomId: string,
  callback: (typing: Record<string, boolean>) => void,
) => {
  const roomRef = doc(firestore, 'chatRooms', roomId)
  return onSnapshot(roomRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data()
      callback(data.typing as Record<string, boolean>)
    }
  })
}

export const subscribeToRoomMessages = (
  roomId: string,
  callback: (message: Message, roomId: string) => void,
) => {
  const q = query(
    messagesCollection,
    where('roomId', '==', roomId),
    orderBy('createdAt', 'desc'),
  )
  return onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const message = change.doc.data()
        console.log(message)
        callback({ id: change.doc.id, ...message } as Message, roomId)
      }
    })
  })
}

export const subscribeToRooms = (
  userId: string,
  callback: (rooms: Room[]) => void,
) => {
  const q = query(roomsCollection, where('userIds', 'array-contains', userId))
  return onSnapshot(q, (snapshot) => {
    const rooms = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Room,
    )
    callback(rooms)
  })
}

export const sendPrivateMessage = async (
  recipientId: string,
  senderId: string,
  initialMessage: string,
): Promise<string> => {
  let roomId
  const q = query(roomsCollection, where('userIds', 'array-contains', senderId))
  const snapshot = await getDocs(q)
  snapshot.forEach((doc) => {
    if (doc.data().userIds.includes(recipientId)) {
      roomId = doc.id
    }
  })
  if (!roomId) {
    const roomRef = await addDoc(roomsCollection, {
      userIds: [senderId, recipientId],
      private: true,
    })
    roomId = roomRef.id
  }
  await postMessage(roomId, senderId, initialMessage)
  return roomId
}

export const addUserToRoom = async (
  name: string,
  user2: string,
): Promise<string | null> => {
  const currentUser = authN.currentUser
  if (!currentUser) return null
  const userId = currentUser.uid
  const q = query(roomsCollection, where('userIds', 'in', [[userId, user2]]))
  const snapshot = await getDocs(q)
  let availableRoom = snapshot.docs.find(
    (doc) =>
      doc.data().userIds.filter((el: string) => el === userId) &&
      doc.data().userIds.filter((el: string) => el === user2),
  )

  if (availableRoom) {
    const roomId = availableRoom.id
    await updateDoc(doc(firestore, 'chatRooms', roomId), {
      userIds: arrayUnion(userId),
    })
    return roomId
  } else {
    const roomRef = await addDoc(roomsCollection, {
      name,
      userIds: [userId, user2],
    })
    return roomRef.id
  }
}

export const getUserDetails = async (uid: string): Promise<any> => {
  const userRef = doc(firestore, 'users', uid)
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    return { uid, ...userSnap.data() }
  } else {
    return null
  }
}
