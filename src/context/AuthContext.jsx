import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import {useState, useEffect, useContext, createContext} from 'react'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export default function AuthProvider(props){
    const {children} = props
    const [globalUser, setGlobalUser ] = useState(null)
    const [globalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email){
        return sendPasswordResetEmail(auth, email)
    }

    function logout(){
        setGlobalUser(null)
        setGlobalData(null)
        return signOut(auth)
    }
    
    const value = { globalUser, globalData, isLoading, setGlobalData, signup, logout, login, resetPassword }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            //must remove
            //console.log('CURRENT USER: ', user)

            setGlobalUser(user)
            // if there is no user, empty the user state and return.
            if (!user) {
                //console.log('No active user')
                return
            }

            //if there is a user, check if the user has data and if they do then fetch data and update global state. 
            try {
                setIsLoading(true)

                // first we create a reference for the document (labelled json object), and then we get the doc, and then we snapshot it to see if there is anything there.
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if (docSnap.exists()){
                    firebaseData = docSnap.data()
                    //console.log('Found user data', firebaseData)
    
                }
                setGlobalData(firebaseData)


            } catch(err) {
                console(err.message)
            } finally {
                setIsLoading(false)
            }
        } )
        return unsubscribe
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}