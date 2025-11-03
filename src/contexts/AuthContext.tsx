'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import type { AuthUser, AuthState } from '../hooks/useAuth'
import type { Tables } from '../lib/database.types'

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, agencyName: string) => Promise<any>
  signIn: (email: string, password: string) => Promise<any>
  signOut: () => Promise<any>
  resetPassword: (email: string) => Promise<any>
  updatePassword: (password: string) => Promise<any>
  inviteTeamMember: (email: string, role?: 'admin' | 'member') => Promise<any>
  updateProfile: (updates: Partial<Tables<'users'>>) => Promise<any>
  hasPermission: (role: 'owner' | 'admin' | 'member' | 'client_viewer') => boolean
  canManageClients: () => boolean
  canInviteUsers: () => boolean
  canManageBilling: () => boolean
  canDeleteClients: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

// HOC for protecting routes that require authentication
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading, initialized } = useAuthContext()

    if (!initialized || loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
        </div>
      )
    }

    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-400">Please log in to access this page.</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}

// HOC for protecting routes that require specific permissions
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: 'owner' | 'admin' | 'member' | 'client_viewer'
) {
  return function PermissionProtectedComponent(props: P) {
    const { user, loading, initialized, hasPermission } = useAuthContext()

    if (!initialized || loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
        </div>
      )
    }

    if (!user) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-gray-400">Please log in to access this page.</p>
          </div>
        </div>
      )
    }

    if (!hasPermission(requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#0f1419]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Insufficient Permissions</h1>
            <p className="text-gray-400">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}

export { AuthContext }
export type { AuthContextType, AuthUser }