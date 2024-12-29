// store/useUserStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware' // Optional: for persistence

interface User {
  id: string
  email: string
  fullName: string
  token: string
}

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
  isAuthenticated: boolean
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage', 
    }
  )
)