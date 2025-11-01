import { useState, useEffect } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Tables } from '../lib/database.types'

export interface AuthUser extends User {
  agency?: Tables<'agencies'>
  profile?: Tables<'users'>
}

export interface AuthState {
  user: AuthUser | null
  session: Session | null
  loading: boolean
  initialized: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    initialized: false
  })

  useEffect(() => {
    let mounted = true

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (mounted) {
        if (session?.user) {
          const enrichedUser = await enrichUser(session.user)
          setAuthState({
            user: enrichedUser,
            session,
            loading: false,
            initialized: true
          })
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            initialized: true
          })
        }
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        if (session?.user) {
          const enrichedUser = await enrichUser(session.user)
          setAuthState({
            user: enrichedUser,
            session,
            loading: false,
            initialized: true
          })
        } else {
          setAuthState({
            user: null,
            session: null,
            loading: false,
            initialized: true
          })
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const enrichUser = async (user: User): Promise<AuthUser> => {
    try {
      // Get user profile and agency data
      const { data: profile } = await supabase
        .from('users')
        .select(`
          *,
          agencies (*)
        `)
        .eq('id', user.id)
        .single()

      return {
        ...user,
        profile: profile || undefined,
        agency: profile?.agencies || undefined
      }
    } catch (error) {
      console.error('Error enriching user:', error)
      return user
    }
  }

  const signUp = async (email: string, password: string, agencyName: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            agency_name: agencyName
          }
        }
      })

      if (error) throw error

      // Create agency and user profile
      if (data.user) {
        await createAgencyAndProfile(data.user, agencyName, email)
      }

      return { data, error: null }
    } catch (error) {
      const authError = error as AuthError
      setAuthState(prev => ({ ...prev, loading: false }))
      return { data: null, error: authError }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      // Update last login
      if (data.user) {
        await supabase
          .from('users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', data.user.id)
      }

      return { data, error: null }
    } catch (error) {
      const authError = error as AuthError
      setAuthState(prev => ({ ...prev, loading: false }))
      return { data: null, error: authError }
    }
  }

  const signOut = async () => {
    try {
      setAuthState(prev => ({ ...prev, loading: true }))
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      setAuthState(prev => ({ ...prev, loading: false }))
      return { error: authError }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })
      if (error) throw error
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      return { error: authError }
    }
  }

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      return { error: null }
    } catch (error) {
      const authError = error as AuthError
      return { error: authError }
    }
  }

  const createAgencyAndProfile = async (user: User, agencyName: string, email: string) => {
    try {
      // Create agency
      const { data: agency, error: agencyError } = await supabase
        .from('agencies')
        .insert({
          name: agencyName,
          email: email,
          subscription_tier: 'free'
        })
        .select()
        .single()

      if (agencyError) throw agencyError

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          agency_id: agency.id,
          email: email,
          full_name: user.user_metadata?.full_name || null,
          role: 'owner'
        })

      if (profileError) throw profileError

      return agency
    } catch (error) {
      console.error('Error creating agency and profile:', error)
      throw error
    }
  }

  const inviteTeamMember = async (email: string, role: 'admin' | 'member' = 'member') => {
    if (!authState.user?.agency) {
      throw new Error('No agency found')
    }

    try {
      // Check if user has permission to invite (owner or admin)
      if (!['owner', 'admin'].includes(authState.user.profile?.role || '')) {
        throw new Error('Insufficient permissions to invite team members')
      }

      // Create invitation record (you might want to implement a proper invitation system)
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
        data: {
          agency_id: authState.user.agency.id,
          role: role,
          invited_by: authState.user.id
        },
        redirectTo: `${window.location.origin}/accept-invitation`
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error: error as AuthError }
    }
  }

  const updateProfile = async (updates: Partial<Tables<'users'>>) => {
    if (!authState.user) {
      throw new Error('No user logged in')
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', authState.user.id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      const enrichedUser = await enrichUser(authState.user)
      setAuthState(prev => ({
        ...prev,
        user: enrichedUser
      }))

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }

  const hasPermission = (requiredRole: 'owner' | 'admin' | 'member' | 'client_viewer') => {
    const userRole = authState.user?.profile?.role
    if (!userRole) return false

    const roleHierarchy = {
      'owner': 4,
      'admin': 3,
      'member': 2,
      'client_viewer': 1
    }

    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
  }

  const canManageClients = () => hasPermission('member')
  const canInviteUsers = () => hasPermission('admin')
  const canManageBilling = () => hasPermission('owner')
  const canDeleteClients = () => hasPermission('admin')

  return {
    ...authState,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    inviteTeamMember,
    updateProfile,
    hasPermission,
    canManageClients,
    canInviteUsers,
    canManageBilling,
    canDeleteClients
  }
}