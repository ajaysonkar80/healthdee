import { getAppointments, cancelBooking } from './actions';

export default async function Home() {
  const data = await getAppointments();

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">HealthDee Admin</h1>
        <p className="text-gray-500 mb-8">Database Connection Test</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">Recent Appointments</h2>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {data.length} Total
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {data.map((apt) => (
              <div key={apt.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${
                      apt.status === 'confirmed' ? 'bg-green-500' :
                      apt.status === 'cancelled' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <p className="font-medium text-gray-900">
                      {apt.patient?.patientProfile?.fullName || 'Unknown Patient'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Dr. {apt.doctor?.doctorProfile?.fullName} • {apt.doctor?.doctorProfile?.specialization}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(apt.startTime).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(apt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {apt.status !== 'cancelled' && (
                    <form action={cancelBooking.bind(null, apt.id)}>
                      <button className="text-xs border border-red-200 text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition">
                        Cancel
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
            
            {data.length === 0 && (
              <div className="p-8 text-center text-gray-400">
                No appointments found. Run <code>npm run db:seed</code>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}