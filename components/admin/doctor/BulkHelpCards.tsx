'use client'

import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'
import { Info, HelpCircle } from 'lucide-react'

export function BulkHelpCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Alert className="border-yellow-200 bg-yellow-50">
        <Info className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-800">
          Bulk Verification
        </AlertTitle>
        <AlertDescription className="text-yellow-700">
          You can verify multiple doctors at once using the bulk selection tool
          available in the hospital dashboard view.
        </AlertDescription>
      </Alert>

      <Alert className="border-blue-200 bg-blue-50">
        <HelpCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">
          Need help with manual entry?
        </AlertTitle>
        <AlertDescription className="text-blue-700">
          Check the Operations Guide for internal NPI validation procedures and
          specialty nomenclature.
        </AlertDescription>
      </Alert>
    </div>
  )
}
