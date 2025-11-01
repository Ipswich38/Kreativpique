import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { MoreHorizontal, Play, Pause, Trash2, Edit, ExternalLink, TrendingUp, TrendingDown } from 'lucide-react'
import type { AdCampaign, AdMetrics } from '../../lib/ads/types'

interface CampaignListProps {
  campaigns: AdCampaign[]
  metrics: Record<string, AdMetrics>
  onUpdate: () => void
}

export function CampaignList({ campaigns, metrics, onUpdate }: CampaignListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [editingCampaign, setEditingCampaign] = useState<AdCampaign | null>(null)

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPlatform = selectedPlatform === 'all' || campaign.platform === selectedPlatform
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus
    return matchesSearch && matchesPlatform && matchesStatus
  })

  const handlePauseCampaign = async (campaignId: string) => {
    // This would call the ads management service
    console.log('Pausing campaign:', campaignId)
    onUpdate()
  }

  const handleResumeCampaign = async (campaignId: string) => {
    // This would call the ads management service
    console.log('Resuming campaign:', campaignId)
    onUpdate()
  }

  const handleDeleteCampaign = async (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      // This would call the ads management service
      console.log('Deleting campaign:', campaignId)
      onUpdate()
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'google_ads':
        return 'bg-blue-100 text-blue-800'
      case 'meta':
        return 'bg-blue-100 text-blue-800'
      case 'linkedin':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800'
      case 'removed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (campaigns.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="text-center">
            <h3 className="text-lg font-semibold">No campaigns yet</h3>
            <p className="text-muted-foreground mt-1">
              Create your first advertising campaign to get started
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Campaigns ({campaigns.length})</CardTitle>
          <CardDescription>
            Manage your advertising campaigns across all platforms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md"
            >
              <option value="all">All Platforms</option>
              <option value="google_ads">Google Ads</option>
              <option value="meta">Meta</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="removed">Removed</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Spend (30d)</TableHead>
              <TableHead>Impressions (30d)</TableHead>
              <TableHead>Clicks (30d)</TableHead>
              <TableHead>CTR (30d)</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCampaigns.map((campaign) => {
              const campaignMetrics = metrics[campaign.id]
              return (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{campaign.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {campaign.objective}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getPlatformColor(campaign.platform)}>
                      {campaign.platform === 'google_ads' ? 'Google Ads' :
                       campaign.platform === 'meta' ? 'Meta' : 'LinkedIn'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(campaign.budget_amount)}
                    <span className="text-sm text-muted-foreground ml-1">
                      /{campaign.budget_type}
                    </span>
                  </TableCell>
                  <TableCell>
                    {campaignMetrics ? formatCurrency(campaignMetrics.spend_30_days) : '-'}
                  </TableCell>
                  <TableCell>
                    {campaignMetrics ? formatNumber(campaignMetrics.impressions_30_days) : '-'}
                  </TableCell>
                  <TableCell>
                    {campaignMetrics ? formatNumber(campaignMetrics.clicks_30_days) : '-'}
                  </TableCell>
                  <TableCell>
                    {campaignMetrics ? (
                      <div className="flex items-center">
                        {campaignMetrics.ctr_30_days.toFixed(2)}%
                        {campaignMetrics.ctr_30_days > 2 ? (
                          <TrendingUp className="h-3 w-3 text-green-500 ml-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
                        )}
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingCampaign(campaign)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        {campaign.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handlePauseCampaign(campaign.id)}>
                            <Pause className="mr-2 h-4 w-4" />
                            Pause
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleResumeCampaign(campaign.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            Resume
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View in Platform
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteCampaign(campaign.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Campaign Dialog */}
      <Dialog open={!!editingCampaign} onOpenChange={() => setEditingCampaign(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>
              Make changes to your campaign settings
            </DialogDescription>
          </DialogHeader>
          {/* Edit form would go here */}
          <div className="py-4">
            <p>Campaign editing form would be implemented here</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}