
/* eslint-disable react/prop-types */
import {  createUserWithEmailAndPassword,signOut, signInWithEmailAndPassword } from "../../../node_modules/firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth/cordova";
import app from "../../../firebase.config";
export const AuthContext = createContext(null)
const Auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user);

    // const registerWithEmail = (email, password) => {
    //     return createUserWithEmailAndPassword(Auth, email, password)
    // }
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(Auth, email, password)
    }
    const logOut = () => {
        return signOut(Auth)
    }

 
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(Auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => {
            return unSubscribe()
        }
    }, [])
    const info = {
        user,
        loading,
        loginWithEmail,
        logOut
    }
    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;