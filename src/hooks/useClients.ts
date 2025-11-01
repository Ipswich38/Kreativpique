import { useState, useEffect } from 'react'
import { clientsAPI, type Client, type ClientInsert, type ClientUpdate, type ClientWithStats } from '../lib/api/clients'
import { useAuthContext } from '../contexts/AuthContext'

export function useClients(filters?: {
  industry?: string
  is_active?: boolean
  sort?: 'name' | 'industry' | 'created_at'
  order?: 'asc' | 'desc'
  page?: number
  limit?: number
}) {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    count: 0,
    page: 1,
    limit: 25,
    total_pages: 0
  })

  const { user } = useAuthContext()

  const fetchClients = async () => {
    if (!user?.agency) return

    try {
      setLoading(true)
      setError(null)
      const result = await clientsAPI.getClients(filters)
      setClients(result.data)
      setPagination({
        count: result.count,
        page: result.page,
        limit: result.limit,
        total_pages: result.total_pages
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch clients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [user?.agency, filters])

  const createClient = async (clientData: Omit<ClientInsert, 'agency_id'>) => {
    if (!user?.agency) throw new Error('No agency found')

    try {
      const newClient = await clientsAPI.createClient({
        ...clientData,
        agency_id: user.agency.id
      })

      // Refresh the list
      await fetchClients()
      return newClient
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create client')
    }
  }

  const updateClient = async (id: string, updates: ClientUpdate) => {
    try {
      const updatedClient = await clientsAPI.updateClient(id, updates)

      // Update local state
      setClients(prev => prev.map(client =>
        client.id === id ? updatedClient : client
      ))

      return updatedClient
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update client')
    }
  }

  const deleteClient = async (id: string) => {
    try {
      await clientsAPI.deleteClient(id)

      // Remove from local state
      setClients(prev => prev.filter(client => client.id !== id))
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete client')
    }
  }

  const searchClients = async (query: string) => {
    try {
      return await clientsAPI.searchClients(query)
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to search clients')
    }
  }

  return {
    clients,
    loading,
    error,
    pagination,
    createClient,
    updateClient,
    deleteClient,
    searchClients,
    refetch: fetchClients
  }
}

export function useClient(id: string | null) {
  const [client, setClient] = useState<ClientWithStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchClient = async () => {
    if (!id) {
      setClient(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const clientData = await clientsAPI.getClientById(id)
      setClient(clientData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch client')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClient()
  }, [id])

  const updateClient = async (updates: ClientUpdate) => {
    if (!id) throw new Error('No client ID provided')

    try {
      const updatedClient = await clientsAPI.updateClient(id, updates)

      // Refetch to get updated stats
      await fetchClient()

      return updatedClient
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update client')
    }
  }

  return {
    client,
    loading,
    error,
    updateClient,
    refetch: fetchClient
  }
}

export function useClientStats(clientId: string | null) {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!clientId) {
      setStats(null)
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        setLoading(true)
        setError(null)
        const client = await clientsAPI.getClientById(clientId)
        setStats(client?.stats || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch client stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [clientId])

  return { stats, loading, error }
}