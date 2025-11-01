import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Loader2 } from 'lucide-react'

interface ConnectAccountFormProps {
  onConnect: (platform: 'google_ads' | 'meta' | 'linkedin', accessToken: string, accountId?: string) => Promise<void>
}

export function ConnectAccountForm({ onConnect }: ConnectAccountFormProps) {
  const [platform, setPlatform] = useState<'google_ads' | 'meta' | 'linkedin' | ''>('')
  const [accessToken, setAccessToken] = useState('')
  const [accountId, setAccountId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!platform || !accessToken) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      await onConnect(platform, accessToken, accountId || undefined)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect account')
    } finally {
      setLoading(false)
    }
  }

  const getPlatformInstructions = () => {
    switch (platform) {
      case 'google_ads':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Google Ads Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>1. Go to Google Ads API Console</p>
              <p>2. Create or select a project</p>
              <p>3. Enable Google Ads API</p>
              <p>4. Create OAuth 2.0 credentials</p>
              <p>5. Generate access token and paste below</p>
            </CardContent>
          </Card>
        )
      case 'meta':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Meta Ads Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>1. Go to Meta for Developers</p>
              <p>2. Create or select an app</p>
              <p>3. Add Marketing API product</p>
              <p>4. Generate access token with ads_management permission</p>
              <p>5. Paste token and Ad Account ID below</p>
            </CardContent>
          </Card>
        )
      case 'linkedin':
        return (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">LinkedIn Ads Setup</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>1. Go to LinkedIn Developer Portal</p>
              <p>2. Create or select an application</p>
              <p>3. Request Marketing Developer Platform access</p>
              <p>4. Generate access token with advertising permissions</p>
              <p>5. Paste token and Account ID below</p>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="platform">Advertising Platform</Label>
        <Select value={platform} onValueChange={(value: any) => setPlatform(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="google_ads">Google Ads</SelectItem>
            <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
            <SelectItem value="linkedin">LinkedIn Ads</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {platform && (
        <>
          <div className="space-y-2">
            <Label htmlFor="accessToken">Access Token</Label>
            <Input
              id="accessToken"
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="Paste your access token here"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountId">
              Account ID
              <span className="text-sm text-muted-foreground ml-1">
                ({platform === 'google_ads' ? 'Customer ID' : 'Account ID'})
              </span>
            </Label>
            <Input
              id="accountId"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              placeholder={platform === 'google_ads'
                ? 'e.g., 123-456-7890'
                : platform === 'meta'
                ? 'e.g., act_1234567890'
                : 'e.g., 123456789'
              }
            />
          </div>

          {getPlatformInstructions()}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Connect Account
            </Button>
          </div>
        </>
      )}
    </form>
  )
}