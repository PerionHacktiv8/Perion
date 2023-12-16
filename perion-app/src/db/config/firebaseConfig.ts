import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDOLinbEnWVhL0i3OHEo6oZp7PyLeEWdKk',
  authDomain: 'final-projext-1d9c3.firebaseapp.com',
  projectId: 'final-projext-1d9c3',
  storageBucket: 'final-projext-1d9c3.appspot.com',
  messagingSenderId: '424862914904',
  appId: '1:424862914904:web:d08a0fdfabf5bf277aed2d',
}

const app = initializeApp(firebaseConfig)
const authN = getAuth(app)
const fireStorage = getStorage(app)

export { authN, fireStorage }
