import { SelectRoleForm } from "@/components/auth/SelectRoleForm";

export default function SelectRolePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SelectRoleForm />
      </div>
    </main>
  );
}
