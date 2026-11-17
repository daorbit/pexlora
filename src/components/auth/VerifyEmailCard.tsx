import { redirect } from "next/navigation";
import { verifyEmail } from "@/actions/verify-email";
import { routes } from "@/config/site";
import { authCopy } from "@/content/auth";
import { maskEmail, readSignupTicket } from "@/lib/auth/signup-ticket";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthForm } from "@/components/auth/AuthForm";import { verifyCodeFields } from "@/components/auth/fields";
import { ResendCodeForm } from "@/components/auth/ResendCodeForm";

export async function VerifyEmailCard() {
  const ticket = await readSignupTicket();
  if (!ticket) redirect(routes.signUp);

  const copy = authCopy.verify;
  return (
    <AuthCard title={copy.title} description={copy.description(maskEmail(ticket.email))} footer={<ResendCodeForm />}>
      <AuthForm action={verifyEmail} fields={verifyCodeFields} submitLabel={copy.submit} />
    </AuthCard>
  );
}
