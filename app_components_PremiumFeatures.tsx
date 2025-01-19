'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function PremiumFeatures() {
  const [boostedPosts, setBoostedPosts] = useState(false)
  const [advancedAnalytics, setAdvancedAnalytics] = useState(false)

  const handleUpgrade = () => {
    // Here you would typically handle the upgrade process
    console.log('Upgrading to premium:', { boostedPosts, advancedAnalytics })
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Premium Features</CardTitle>
        <CardDescription>Upgrade your Easy Cash experience</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="boosted-posts" checked={boostedPosts} onCheckedChange={setBoostedPosts} />
            <Label htmlFor="boosted-posts">Boosted Job Postings</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="advanced-analytics" checked={advancedAnalytics} onCheckedChange={setAdvancedAnalytics} />
            <Label htmlFor="advanced-analytics">Advanced Analytics</Label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleUpgrade}>Upgrade to Premium</Button>
      </CardFooter>
    </Card>
  )
}

