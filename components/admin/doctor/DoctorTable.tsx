'use client'

import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DoctorRowActions } from './DoctorRowAction'

interface Doctor {
  id: string
  name: string
  npi: string
  specialty: string
  city: string
  status: 'active' | 'inactive'
}

const INITIAL_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Jenkins',
    npi: '129304122',
    specialty: 'Cardiology',
    city: 'New York',
    status: 'active',
  },
  {
    id: '2',
    name: 'Dr. Mark Sloan',
    npi: '554210982',
    specialty: 'Pediatrics',
    city: 'London',
    status: 'active',
  },
  {
    id: '3',
    name: 'Dr. Gregory House',
    npi: '001928374',
    specialty: 'Diagnostics',
    city: 'Princeton',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Dr. Meredith Grey',
    npi: '887213445',
    specialty: 'Surgery',
    city: 'Seattle',
    status: 'active',
  },
  {
    id: '5',
    name: 'Dr. Shaun Murphy',
    npi: '443211090',
    specialty: 'Surgical Resident',
    city: 'San Jose',
    status: 'active',
  },
]

export function DoctorTable() {
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS)

  const toggleStatus = (doctorId: string) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === doctorId
          ? {
              ...doctor,
              status: doctor.status === 'active' ? 'inactive' : 'active',
            }
          : doctor
      )
    )
  }

  return (
    <div className="rounded-lg border bg-background">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Doctor Name</TableHead>
            <TableHead>Speciality</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {doctors.map((doctor) => (
            <TableRow key={doctor.id}>
              {/* Doctor Name */}
              <TableCell>
                <div className="flex items-center justify-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {doctor.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-left">
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-xs text-muted-foreground">
                      NPI: {doctor.npi}
                    </div>
                  </div>
                </div>
              </TableCell>

              {/* Specialty */}
              <TableCell>{doctor.specialty}</TableCell>

              {/* City */}
              <TableCell>{doctor.city}</TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  className={
                    doctor.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }
                >
                  {doctor.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex justify-center">
                  <DoctorRowActions
                    doctorId={doctor.id}
                    isActive={doctor.status === 'active'}
                    onToggle={() => toggleStatus(doctor.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-3 text-sm text-muted-foreground">
        <span>Showing 1 to 5 of 1,284 results</span>
        <div className="flex gap-2">
          <Badge variant="default">1</Badge>
          <Badge variant="outline">2</Badge>
          <Badge variant="outline">3</Badge>
          <Badge variant="outline">…</Badge>
          <Badge variant="outline">128</Badge>
        </div>
      </div>
    </div>
  )
}
