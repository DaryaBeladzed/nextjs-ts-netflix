import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'next/router'
import nookies from 'nookies'

type asyncF = (email: string, password: string) => Promise<void>

interface IAuth {
  user: User | null
  signIn: asyncF
  signUp: asyncF
  logout: () => Promise<void>
  loading: Boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
  loading: false,
})

export const AuthProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    // return onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     console.log('signing in...')
    //     console.log(user)
    //     setUser(user)
    //   } else {
    //     console.log('signing out...')
    //     setUser(null)
    //     router.push('/login')
    //   }
    // })
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        nookies.set(undefined, 'token', '', { path: '/' })
        router.push('/login')
      } else {
        const token = await user.getIdToken()
        setUser(user)
        nookies.set(undefined, 'token', token, { path: '/' })
      }
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)

    // clean up setInterval
    return () => clearInterval(handle)
  }, [])

  const signUp: asyncF = async (email, password) => {
    setLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => router.push('/'))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const signIn: asyncF = async (email, password) => {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.push('/'))
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const logout = async () => {
    setLoading(true)
    signOut(auth)
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false))
  }

  const authCtx = useMemo(() => {
    return {
      user,
      signIn,
      signUp,
      logout,
      loading,
    }
  }, [user, loading])

  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
