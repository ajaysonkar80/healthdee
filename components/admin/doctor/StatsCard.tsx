'use client'

import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

interface StatsCard {
  title: string
  value: string | number
  accentClass?: string
}

const STATS: StatsCard[] = [
  { title: 'Total Doctors', value: '1,284' },
  { title: 'Active', value: '1,102', accentClass: 'text-green-600' },
  { title: 'New This Month', value: '+42', accentClass: 'text-pink-600' },
  { title: 'Pending Verification', value: '18', accentClass: 'text-orange-500' },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-semibold ${stat.accentClass ?? ''}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
