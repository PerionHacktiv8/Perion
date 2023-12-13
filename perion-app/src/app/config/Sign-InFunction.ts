// src/app/config/Sign-InFunction.ts
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from './firebaseConfig';

export const signInWithFacebook = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();
        const providers = await user.providerData;

        console.log(providers);

        await fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: user.email,
                uid: user.uid,
            }),
        });

        return {
            status: 'success',
            data: user,
        };
    } catch (error) {
        console.error('Error during Facebook Sign-In:', error);
        throw error;
    }
}

export const signInWithGithub = async () => {
    try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();

        await fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: user.email,
                uid: user.uid,
            }),
        });

        return {
            status: 'success',
            data: user,
        };
    } catch (error) {
        console.error('Error during GitHub Sign-In:', error);
        throw error;
    }
};


export const signInWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();

        await fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email: user.email,
                uid: user.uid,
            }),
        });

        return {
            status: 'success',
            data: user,
        }
    } catch (error) {
        console.error('Error during Google Sign-In:', error);
        throw error;
    }
};
