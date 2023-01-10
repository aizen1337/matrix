import { createContext, useState, useEffect} from "react";
import netlifyIdentity from 'netlify-identity-widget'
interface AuthContext {
    isAuth: boolean,
    currentUser: null | {},
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
    useEffect(() => {
        netlifyIdentity.on("login", (user) => {
            setCurrentUser(user)
            netlifyIdentity.close()
        })
        netlifyIdentity.init({locale: 'pl'})
    }, [])
    const login = () => {
        netlifyIdentity.open()
    }
    const contextValue = {
        currentUser, login
    }
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
} 