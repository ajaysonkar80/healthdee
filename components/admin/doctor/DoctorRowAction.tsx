'use client'

import Link from 'next/link'
import { Eye, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/switch'

export interface DoctorRowActionsProps {
  doctorId: string
  isActive: boolean
  onToggle: () => void
}

export function DoctorRowActions({
  doctorId,
  isActive,
  onToggle,
}: DoctorRowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/doctor/${doctorId}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>

      <Button variant="ghost" size="icon" asChild>
        <Link href={`/admin/doctor/${doctorId}/edit`}>
          <Pencil className="h-4 w-4" />
        </Link>
      </Button>

      <Switch
        checked={isActive}
        onCheckedChange={onToggle}
        aria-label="Toggle doctor status"
      />
    </div>
  )
}
