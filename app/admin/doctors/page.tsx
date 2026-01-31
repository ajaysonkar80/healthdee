import Link from 'next/link'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { StatsCards } from '@/components/admin/doctor/StatsCard'
import { DoctorTable } from '@/components/admin/doctor/DoctorTable'
import { BulkHelpCards } from '@/components/admin/doctor/BulkHelpCards'

export default function DoctorDirectoryPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Page Toolbar */}
      <div className="flex flex-col gap-3">
        {/* Title + Action */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-semibold text-foreground">
            Doctor Directory
          </h1>

          <Button asChild size="sm" className="gap-2">
            <Link href="/admin/doctor/create">
              <Plus className="h-4 w-4" />
              Add Doctor
            </Link>
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground max-w-2xl">
          Manage and monitor medical professionals across your healthcare
          network.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Doctor Table */}
      <DoctorTable />

      {/* Bottom Info Cards */}
      <BulkHelpCards />
    </div>
  )
}
