import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext(null);
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// AuthProvider
export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Track/manage user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);

            if(user){
                const {email, displayName, photoURL} = user;
                const userData = {
                    email, username: displayName, photo : photoURL
                } 
            }
        });
        return () => unsubscribe();
    }, []);

    // register a user
    const registerUser = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
            return userCredential;
        } catch (error) {
            console.error("Registration Error:", error.message);
        }
    }

    // login the user
    const loginUser = async (email,password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sign up with google
    const signInWithGoogle = async() =>{
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the user
    const logOutUser = () => {
        return signOut(auth);
    }

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logOutUser
    }

    if (loading) {
        return <div>Loading...</div>; // Display loader while Firebase initializes
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}