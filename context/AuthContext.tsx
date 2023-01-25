'use client'
import { Session } from "next-auth";
import { createContext, useState, useEffect} from "react";
interface AuthContext {
    isAuth: boolean,
    currentUser: null | netlifyIdentity.User,
    login: () => void
    logout: () => void
}
export const AuthContext = createContext<AuthContext>({
    isAuth: false,
    currentUser: null,
    login: () => {},
    logout: () => {},
})
export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    const [currentUser,setCurrentUser] = useState<netlifyIdentity.User | null>(null)
    const [isAuth,setIsAuth] = useState<boolean>(false)
    
    useEffect(() => {
        netlifyIdentity.on("init", (user) => {
            setIsAuth(true)
            setCurrentUser(user)
        })
        netlifyIdentity.on("login", (user) => {
            setCurrentUser(user)
            netlifyIdentity.close()
        })
        netlifyIdentity.on("logout", () => {
            setCurrentUser(null)
        })
        netlifyIdentity.init()
        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }
    }, [])
    const login = () => {
        netlifyIdentity.open()
    }
    const logout = () => {
        netlifyIdentity.logout()
    }
    const contextValue = {
        currentUser, login, logout, isAuth
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
} 