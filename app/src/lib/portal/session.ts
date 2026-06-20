import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Portal session (shell implementation).
 *
 * For the UI shell this is a demo cookie. When wiring your backend, replace the
 * read here with verification of your real session/JWT (e.g. validate the token
 * against PORTAL_API_BASE_URL and load the user). The rest of the portal calls
 * `requireSession()` and doesn't care how the session is established.
 */

export const SESSION_COOKIE = "ds_portal_session";

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === "1";
}

/** Guard for portal routes — redirects to login when unauthenticated. */
export async function requireSession(): Promise<void> {
  if (!(await isAuthenticated())) {
    redirect("/auth/login");
  }
}
