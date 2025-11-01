import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Switch } from '../ui/switch'
import { Loader2 } from 'lucide-react'
import type { AdAccount, CreateCampaignRequest } from '../../lib/ads/types'

interface CreateCampaignFormProps {
  accounts: AdAccount[]
  onCreate: (campaignData: CreateCampaignRequest) => Promise<void>
}

export function CreateCampaignForm({ accounts, onCreate }: CreateCampaignFormProps) {
  const [formData, setFormData] = useState<Partial<CreateCampaignRequest>>({
    name: '',
    objective: '',
    budget_amount: 0,
    budget_type: 'daily',
    targeting_settings: {
      locations: [],
      age_min: 18,
      age_max: 65,
      genders: [],
      interests: [],
      keywords: []
    },
    ad_creative: {
      headline: '',
      description: '',
      call_to_action: '',
      destination_url: ''
    }
  })

  const [selectedAccount, setSelectedAccount] = useState<AdAccount | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAccountChange = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId)
    setSelectedAccount(account || null)
    setFormData(prev => ({ ...prev, account_id: accountId }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.account_id || !formData.name || !formData.objective || !formData.budget_amount) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await onCreate(formData as CreateCampaignRequest)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  const getObjectiveOptions = () => {
    if (!selectedAccount) return []

    switch (selectedAccount.platform) {
      case 'google_ads':
        return [
          { value: 'SEARCH', label: 'Search' },
          { value: 'DISPLAY', label: 'Display' },
          { value: 'SHOPPING', label: 'Shopping' },
          { value: 'VIDEO', label: 'Video' },
          { value: 'APP', label: 'App' }
        ]
      case 'meta':
        return [
          { value: 'BRAND_AWARENESS', label: 'Brand Awareness' },
          { value: 'REACH', label: 'Reach' },
          { value: 'TRAFFIC', label: 'Traffic' },
          { value: 'ENGAGEMENT', label: 'Engagement' },
          { value: 'APP_INSTALLS', label: 'App Installs' },
          { value: 'VIDEO_VIEWS', label: 'Video Views' },
          { value: 'LEAD_GENERATION', label: 'Lead Generation' },
          { value: 'CONVERSIONS', label: 'Conversions' }
        ]
      case 'linkedin':
        return [
          { value: 'BRAND_AWARENESS', label: 'Brand Awareness' },
          { value: 'WEBSITE_VISITS', label: 'Website Visits' },
          { value: 'ENGAGEMENT', label: 'Engagement' },
          { value: 'VIDEO_VIEWS', label: 'Video Views' },
          { value: 'LEAD_GENERATION', label: 'Lead Generation' },
          { value: 'WEBSITE_CONVERSIONS', label: 'Website Conversions' }
        ]
      default:
        return []
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Account Selection */}
      <div className="space-y-2">
        <Label htmlFor="account">Advertising Account</Label>
        <Select value={formData.account_id || ''} onValueChange={handleAccountChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>
          <SelectContent>
            {accounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.account_name} ({account.platform})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedAccount && (
        <>
          {/* Campaign Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objective">Campaign Objective</Label>
                <Select
                  value={formData.objective || ''}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, objective: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select objective" />
                  </SelectTrigger>
                  <SelectContent>
                    {getObjectiveOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_amount">Budget Amount</Label>
                  <Input
                    id="budget_amount"
                    type="number"
                    min="1"
                    value={formData.budget_amount || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      budget_amount: parseFloat(e.target.value) || 0
                    }))}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget_type">Budget Type</Label>
                  <Select
                    value={formData.budget_type || 'daily'}
                    onValueChange={(value: 'daily' | 'lifetime') =>
                      setFormData(prev => ({ ...prev, budget_type: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date (Optional)</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date (Optional)</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ad Creative */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Ad Creative</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  value={formData.ad_creative?.headline || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ad_creative: { ...prev.ad_creative, headline: e.target.value }
                  }))}
                  placeholder="Enter ad headline"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.ad_creative?.description || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ad_creative: { ...prev.ad_creative, description: e.target.value }
                  }))}
                  placeholder="Enter ad description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="call_to_action">Call to Action</Label>
                  <Input
                    id="call_to_action"
                    value={formData.ad_creative?.call_to_action || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ad_creative: { ...prev.ad_creative, call_to_action: e.target.value }
                    }))}
                    placeholder="e.g., Learn More, Shop Now"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destination_url">Destination URL</Label>
                  <Input
                    id="destination_url"
                    type="url"
                    value={formData.ad_creative?.destination_url || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ad_creative: { ...prev.ad_creative, destination_url: e.target.value }
                    }))}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Targeting */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Targeting (Optional)</CardTitle>
              <CardDescription>
                Leave blank to use account-level targeting settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Input
                  id="keywords"
                  value={formData.targeting_settings?.keywords?.join(', ') || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    targeting_settings: {
                      ...prev.targeting_settings,
                      keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                    }
                  }))}
                  placeholder="marketing, advertising, digital"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="locations">Locations (comma-separated)</Label>
                <Input
                  id="locations"
                  value={formData.targeting_settings?.locations?.join(', ') || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    targeting_settings: {
                      ...prev.targeting_settings,
                      locations: e.target.value.split(',').map(l => l.trim()).filter(l => l)
                    }
                  }))}
                  placeholder="United States, Canada, United Kingdom"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age_min">Minimum Age</Label>
                  <Input
                    id="age_min"
                    type="number"
                    min="13"
                    max="65"
                    value={formData.targeting_settings?.age_min || 18}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      targeting_settings: {
                        ...prev.targeting_settings,
                        age_min: parseInt(e.target.value) || 18
                      }
                    }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age_max">Maximum Age</Label>
                  <Input
                    id="age_max"
                    type="number"
                    min="13"
                    max="65"
                    value={formData.targeting_settings?.age_max || 65}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      targeting_settings: {
                        ...prev.targeting_settings,
                        age_max: parseInt(e.target.value) || 65
                      }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Create Campaign
            </Button>
          </div>
        </>
      )}
    </form>
  )
}