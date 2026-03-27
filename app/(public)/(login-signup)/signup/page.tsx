import  {SignupForm}  from "@/components/auth/SignupForm";

/**
 * SignupPage - The main entry point for the registration route.
 * This is a Server Component that renders the client-side SignupForm.
 */
export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-12">
      <SignupForm />
    </div>
  );
}