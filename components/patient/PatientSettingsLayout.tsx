import { ReactNode } from "react"
import PatientSidebar from "./PatientSideBar"
import PatientTopNav from "./PatientTopNav"

interface PatientSettingsLayoutProps {
  children: ReactNode
}

export default function PatientSettingsLayout({
  children,
}: PatientSettingsLayoutProps) {
  return (
    <div className="min-h-screen bg-muted/40">
      <PatientTopNav />

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
          <PatientSidebar />
          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
