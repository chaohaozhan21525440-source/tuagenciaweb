import { redirect } from "next/navigation";

// Fallback for environments without middleware. The middleware handles
// Accept-Language-based redirection; this is a safety net for static fallbacks.
export default function RootIndex() {
  redirect("/es");
}
