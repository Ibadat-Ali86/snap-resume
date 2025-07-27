import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase, type Profile } from './supabase'
import { toast } from '@/hooks/use-toast'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
}

interface AuthStore {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      isLoading: false,
      isAuthenticated: false,

      signUp: async (email: string, password: string, fullName: string) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          })

          if (error) {
            toast({
              variant: "destructive",
              title: "Sign Up Failed",
              description: error.message,
            })
            return false
          }

          if (data.user) {
            set({ 
              user: data.user as User, 
              isAuthenticated: true 
            })
            toast({
              title: "Welcome!",
              description: "Your account has been created successfully.",
            })
            return true
          }
          return false
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred.",
          })
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      signIn: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (error) {
            toast({
              variant: "destructive",
              title: "Sign In Failed",
              description: error.message,
            })
            return false
          }

          if (data.user) {
            set({ 
              user: data.user as User, 
              isAuthenticated: true 
            })
            toast({
              title: "Welcome back!",
              description: "You have been signed in successfully.",
            })
            return true
          }
          return false
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred.",
          })
          return false
        } finally {
          set({ isLoading: false })
        }
      },

      signOut: async () => {
        set({ isLoading: true })
        try {
          const { error } = await supabase.auth.signOut()
          if (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: error.message,
            })
          } else {
            set({ 
              user: null, 
              profile: null, 
              isAuthenticated: false 
            })
            toast({
              title: "Signed out",
              description: "You have been signed out successfully.",
            })
          }
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "An unexpected error occurred.",
          })
        } finally {
          set({ isLoading: false })
        }
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          const { data: { user } } = await supabase.auth.getUser()
          if (user) {
            set({ 
              user: user as User, 
              isAuthenticated: true 
            })
          } else {
            set({ 
              user: null, 
              profile: null, 
              isAuthenticated: false 
            })
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          set({ 
            user: null, 
            profile: null, 
            isAuthenticated: false 
          })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        profile: state.profile, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)