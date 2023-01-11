import { createContext, useState, useEffect} from "react";
import netlifyIdentity from 'netlify-identity-widget'
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
        netlifyIdentity.init({locale: 'pl'})
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